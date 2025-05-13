import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf} from '@angular/common';
import {Orders} from '../../classes/orders';
import {OrderServiceService} from '../../service/order-service.service';
import {AuthServiceService} from '../../service/auth-service.service';
import {MatDialog} from '@angular/material/dialog';
import {CheckoutFormComponent} from '../checkout-form/checkout-form.component';
import {RecieptComponentComponent} from '../reciept-component/reciept-component.component';



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


  paginatedOrders: Orders[] = [];
  currentPage: number = 0; // Zero-based for backend
  pageSize: number = 10;
  totalPages!: number;
  totalElements!: number;
  pageNumbers: number[] = [];

  constructor(
    public orderService: OrderServiceService,
    public authService: AuthServiceService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchOrders(this.currentPage.toString());
  }

  fetchOrders(pageNumber: string): void {
    const userEmail = this.authService.getUserDetails().email;

    this.orderService.getOrderPerUser(userEmail, pageNumber).subscribe({
      next: (data) => {
        this.paginatedOrders = data.content;
        this.totalPages = data.totalPages;
        this.totalElements = data.totalElements;
        this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log("Process completed");
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.fetchOrders(page.toString());
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.fetchOrders(this.currentPage.toString());
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.fetchOrders(this.currentPage.toString());
    }
  }

  viewOrder(orderId: number): void {
    const dialogRef= this.dialog.open(RecieptComponentComponent, {
      width: '100%',
      maxWidth: '800px',
      panelClass: 'custom-dialog-container',
      autoFocus: false, // <- very important for spacing
      data:orderId

    });

    console.log(`Viewing order ${orderId}`);
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed:', result);
    });
  }


}
