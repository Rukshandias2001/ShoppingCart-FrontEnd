import {Component, OnInit} from '@angular/core';
import {ProductServiceService} from '../../service/product-service.service';
import {NgForOf} from '@angular/common';
import {Product} from '../../classes/product';
import { ButtonModule } from 'primeng/button';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {SelectedItems} from '../../classes/selected-items';
import {CartServiceService} from '../../service/cart-service.service';
import {MessageService} from 'primeng/api';
import {Toast} from 'primeng/toast';


@Component({
  selector: 'app-view-product',
  imports: [
    NgForOf,
    ButtonModule,
    FormsModule,
    Toast,


  ],
  providers: [MessageService],
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css',
  standalone:true
})
export class ViewProductComponent implements OnInit{
  products: Array<Product>=[];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 8;

  constructor(private productService:ProductServiceService,private router:Router,private cartService:CartServiceService,private messageService:MessageService) {

  }

  showSuccess() {
    this.cartService.calculatePrice();
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Added to cart ' });

  }

  showError(err:object) {
    // @ts-ignore
    this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error });
  }

    ngOnInit(): void {
        this.fetchData()
    }

  onSearch() {
    this.currentPage = 1;
    this.products = this.products.filter((data)=>{
      return data.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    })
    if(this.searchTerm == ""){
      this.fetchData();
    }

  }
  get paginatedProducts(): Product[] {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    ).slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(
      this.products.filter(product =>
        product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      ).length / this.itemsPerPage
    );
  }

    fetchData(){
        this.productService.getProducts().subscribe({
            next: (data) => {
              this.products = data

            },
            error:(err)=>{
              console.log(err)
            },
            complete:()=>{

            }
          }

        )
    }

    viewProduct(id:number){
      this.router.navigate(["viewProductDetails/" + id])
    }


  addItems(product:Product){
    let selectedItems = new SelectedItems(1,product.id,product.name,product.imageUrl,product.categoryId+"",product.price,1,product.description,product.categoryId,"diasrukshan21@gmail.com")
    this.cartService.saveSelectedItems(selectedItems).subscribe({
      next:( data)=>{
        this.showSuccess()
        console.log(data)
      },
      error:(err)=>{
        console.log(err)
        this.showError(err)
      },
      complete:()=>{
        console.log("Process complete !")
      }
    })
  }


}
