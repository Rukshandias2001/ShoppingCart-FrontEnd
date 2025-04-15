import {Component, OnInit} from '@angular/core';
import {SelectedItems} from '../../classes/selected-items';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {CartServiceService} from '../../service/cart-service.service';
import {MessageService} from 'primeng/api';
import {Toast} from 'primeng/toast';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {CheckoutFormComponent} from '../checkout-form/checkout-form.component';

@Component({
  selector: 'app-selected-items',
  imports: [
    FormsModule,
    NgForOf,
    Toast
  ],
  providers: [MessageService],
  templateUrl: './selected-items.component.html',
  styleUrl: './selected-items.component.css',
  standalone:true
})
export class SelectedItemsComponent implements  OnInit{
    selectedItems:Array<SelectedItems>=[];
    sortOption:string = "price";
    discountCode: any;
    email!:string;

  constructor(private cartService:CartServiceService,private messageService:MessageService,private router:Router,private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.email = "diasrukshan21@gmail.com"
    this.fetchTheLoad()
  }
  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Added To Cart ' });
  }

  showDeleteSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Item Removed From Cart ' });
    this.fetchTheLoad()
  }

  reduceQuantity() {
    this.cartService.calculatePrice()
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Reduce quantity ' });
  }

  showError(err:object) {
    // @ts-ignore
    this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error });
  }

  fetchTheLoad() {
    this.cartService.getSelectedItems(this.email).subscribe({
      next:(data)=>{
        this.selectedItems = data
        this.cartService.calculatePrice()
      },
      error:(err)=>{
        console.log(err)
      },
      complete:()=>{
        console.log("completed")
      }
    })
  }


  confirmDeletingTheProduct(id:number) {
    this.cartService.deleteSelectedItemService(id).subscribe({
        next:(data)=>{
          this.showDeleteSuccess();

        },
        error:(err)=>{
          console.log(err)
        },
        complete:()=>{
          console.log("Process complete")
        }
      }

    )
  }

  addItem(product: SelectedItems) {
    let selectedItems = new SelectedItems(1,product.productId,product.productName,product.imageUrl,product.categoryId+"",product.price,1,product.description,product.categoryId,"diasrukshan21@gmail.com")

    this.cartService.saveSelectedItems(selectedItems).subscribe({
      next:( data)=>{
        this.showSuccess()
        this.fetchTheLoad()

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

  remove(product: SelectedItems) {
    let selectedItems = new SelectedItems(1,product.productId,product.productName,product.imageUrl,product.categoryId+"",product.price,-1,product.description,product.categoryId,"diasrukshan21@gmail.com")

    this.cartService.saveSelectedItems(selectedItems).subscribe({
      next:( data)=>{
        this.reduceQuantity()
        this.fetchTheLoad()

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

  sortProducts() {
    if(this.sortOption==="price"){
      console.log(this.sortOption)
      // @ts-ignore
      this.selectedItems = this.selectedItems.sort((a, b) => b.price - a.price);
    }else{
      console.log(this.sortOption)
      // @ts-ignore
      this.selectedItems = this.selectedItems.sort((a, b) =>
        (a.productName ?? '').localeCompare(b.productName ?? '')
      );
    }




  }

  applyDiscount() {

  }

  checkoutForm() {
    const dialogRef= this.dialog.open(CheckoutFormComponent, {
      width: '100%',
      maxWidth: '600px',
      panelClass: 'custom-dialog-container',
      autoFocus: false, // <- very important for spacing
      data: this.selectedItems  // 👈 Passing the array here

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed:', result);
    });
  }
}
