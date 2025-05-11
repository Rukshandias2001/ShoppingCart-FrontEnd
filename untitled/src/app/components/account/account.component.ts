import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf} from '@angular/common';
import {Orders} from '../../classes/orders';
import {OrderServiceService} from '../../service/order-service.service';
import {AuthServiceService} from '../../service/auth-service.service';



@Component({
  selector: 'app-account',
  imports: [
    DatePipe,
    NgForOf
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css',
  standalone:true
})
export class AccountComponent implements  OnInit{

  orders: Orders[] = [];
  paginatedOrders: Orders[]  = [];
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages!: number;
  pageNumbers: number[] = [];
  totalElements!:number;

  constructor(public orderService:OrderServiceService,public authService:AuthServiceService) {
  }

  ngOnInit(): void {
    this.fetchOrders()
    // Mock data - replace with actual API call
    // @ts-ignore

  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.orders.length / this.pageSize);
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    console.log(this.totalPages)
    // @ts-ignore
    this.paginatedOrders = this.orders.slice(
      (this.currentPage - 1) * this.pageSize,
      this.currentPage * this.pageSize
    );
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  viewOrder(orderId: number): void {
    // Implement view order logic (e.g., navigate to order details page)
    console.log(`Viewing order ${orderId}`);

  }

  fetchOrders(){
    let user = this.authService.getUserDetails().email;

    this.orderService.getOrderPerUser(user,"0").subscribe({
      next:(data)=>{
       this.paginatedOrders =  data.content
        this.totalPages = data.totalPages

        this.totalElements = data.totalElements
        this.getTotalElements()
      },
      error:(err)=>{
        console.log(err)
      },
      complete:()=>{
        console.log("Process completed")
      }
    })

  }

  getTotalElements(){
    // @ts-ignore
    this.orders = Array.from({ length: this.totalElements }, this.paginatedOrders);
    this.updatePagination();

  }

}
