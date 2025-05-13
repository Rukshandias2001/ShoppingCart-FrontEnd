import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {ProductServiceService} from '../../service/product-service.service';
import {Product} from '../../classes/product';
import {MatDialog} from '@angular/material/dialog';
import {CheckoutFormComponent} from '../checkout-form/checkout-form.component';
import {UpdateFormComponent} from '../update-form/update-form.component';

declare var bootstrap: any;

@Component({
  selector: 'app-update-product',
  imports: [
    FormsModule,
    NgForOf,
    NgClass,

  ],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css',
  standalone:true
})


export class UpdateProductComponent implements OnInit{
  products:Array<Product> = []; // Original list from backend
  filteredProducts:Array<Product> = []; // Filtered list for search
  searchText = '';
  selectedProduct!:Product;





  constructor(public productService:ProductServiceService,public dialog: MatDialog) {

  }

  ngOnInit() {
    this.loadProducts();
    this.clearSearch();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
       next:(data)=>{
         this.products = data;
         console.log(this.products)
         this.clearSearch()

       },
      error:(err)=>{
         console.log(err)
      },
      complete:()=>{
         console.log("process completed")
      }

      })
    // Load from API
    // @ts-ignore

  }

  filterProducts() {
    const term = this.searchText.toLowerCase();

    this.filteredProducts = this.products.filter(p =>
      p.name.toLowerCase().includes(term)
    );
  }

  clearSearch() {
    this.searchText = '';
    this.filteredProducts = [...this.products];
  }

  openUpdateForm(product: Product) {
    this.selectedProduct = { ...product };

    const dialogRef= this.dialog.open(UpdateFormComponent, {
      width: 'auto',
      maxWidth: '700px',
      height:'855px',
      panelClass: 'custom-dialog-container',
      autoFocus: false, // <- very important for spacing
      data:this.selectedProduct
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadProducts()
      console.log('Dialog closed:', result);
    });





  }

  updateProduct() {
    // Save logic
    console.log('Updated Product:', this.selectedProduct);

  }


}
