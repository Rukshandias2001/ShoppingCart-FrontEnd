import {Component, OnInit} from '@angular/core';
import {OrderList} from 'primeng/orderlist';
import {OrderedList} from '../../classes/ordered-list';
import {Router} from '@angular/router';
import {CurrencyPipe, DatePipe, NgForOf} from '@angular/common';

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
    email!: string;
    paidDate!:string;
    price!:number ;
    cardType!:string;

    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

    constructor(router:Router) {

    }


  redirectToPage() {

  }
}
