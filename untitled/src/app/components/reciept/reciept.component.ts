import {Component, OnInit} from '@angular/core';
import {OrderList} from 'primeng/orderlist';
import {OrderedList} from '../../classes/ordered-list';
import {Router} from '@angular/router';
import {CurrencyPipe, DatePipe, NgForOf} from '@angular/common';
import {AuthServiceService} from '../../service/auth-service.service';
import {OrderServiceService} from '../../service/order-service.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-reciept',
  imports: [
    DatePipe,
    CurrencyPipe,
    NgForOf
  ],
  standalone:true,
  templateUrl: './reciept.component.html',
  styleUrl: './reciept.component.css'
})
export class RecieptComponent implements OnInit{
    productList!:Array<OrderedList>
    firstName!: string;
    lastName!:string;
    email!: string;
    paidDate!:string;
    price!:number ;
    cardType!:string;

    ngOnInit(): void {
      this.fetchUserDetails()

    }
    constructor(router:Router,
                private authService:AuthServiceService,
                private orderService:OrderServiceService,
                public dialogRef: MatDialogRef<RecieptComponent>) {

    }


  redirectToPage() {

  }

  fetchUserDetails(){
    this.email = this.authService.getUserDetails().email;
    this.firstName = this.authService.getUserDetails().firstName;
    this.lastName = this.authService.getUserDetails().lastName;
    this.fetchData()


  }
  fetchData(){
      this.orderService.getOrderReciept(this.email).subscribe({
        next:(data)=>{
          console.log(data)

          // @ts-ignore
          this.productList = data.orderedList;
        },
        error:(err)=>{
          console.log(err)
        },
        complete:()=>{
          console.log("process completed")
        }
      })
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
