import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthServiceService} from '../../service/auth-service.service';
import {OrderServiceService} from '../../service/order-service.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Product} from '../../classes/product';
import {Reciept} from '../../classes/reciept';
import {NgForOf} from '@angular/common';


@Component({
  selector: 'app-reciept-component',
  imports: [
    NgForOf

  ],
  templateUrl: './reciept-component.component.html',
  styleUrl: './reciept-component.component.css',
  standalone:true
})
export class RecieptComponentComponent implements OnInit{
  reciept!:Array<Reciept>;
  total!: number;
  constructor(router:Router,
              private authService:AuthServiceService,
              private orderService:OrderServiceService,
              public dialogRef: MatDialogRef<RecieptComponentComponent>,
              @Inject(MAT_DIALOG_DATA) public orderId:number) {

  }



  ngOnInit(): void {
    this.fetchData()
  }

    fetchData(){
      this.orderService.getReceiptList(this.orderId).subscribe({
        next:(data)=>{
          this.reciept = data
          this.total = this.reciept[0].price
        },
        error:(err)=>{
          console.log(err)
        },
        complete:()=>{
          console.log("Process completed !")
        }
      })


    }

  closeDialog() {
    this.dialogRef.close()
  }
}
