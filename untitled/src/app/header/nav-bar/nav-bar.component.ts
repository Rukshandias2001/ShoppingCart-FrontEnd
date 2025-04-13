import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import "primeicons/primeicons.css";
import {CartServiceService} from '../../service/cart-service.service';

@Component({
  selector: 'app-nav-bar',
  imports: [
    RouterLink
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
  standalone:true
})
export class NavBarComponent implements OnInit{
  profilepic:string="R";
  numberOfQuantities:number=0;

  constructor(private cartService:CartServiceService) {
    this.fetchDataNumberOfQuantities()
  }

  ngOnInit(): void {
    this.fetchDataNumberOfQuantities()
  }

  fetchDataNumberOfQuantities(){
    this.cartService.calculatePrice();
    this.cartService.listOfQuantities.subscribe({
      next:(data)=>{
        this.numberOfQuantities = data;
      },

      error:(err)=>{
        console.log(err)
      },
      complete:()=>{
        console.log("Task completed")
     }

    })
  }


}
