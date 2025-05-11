import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import "primeicons/primeicons.css";
import {CartServiceService} from '../../service/cart-service.service';
import {AuthServiceService} from '../../service/auth-service.service';

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
  role!:string;
  isDropdownOpen = false;

  sidebarVisible = false;


  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }



  constructor(private cartService:CartServiceService,private router:Router,private authService:AuthServiceService) {
    this.fetchDataNumberOfQuantities()
  }

  ngOnInit(): void {
    this.fetchUser();
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

  logout(){
    sessionStorage.clear();
    this.router.navigate(["/login"])

  }

  fetchUser(){
    this.role = this.authService.getUserDetails().role
  }

  toggleDropdown(event: MouseEvent): void {
    event.preventDefault(); // Prevent link from refreshing page
    this.isDropdownOpen = !this.isDropdownOpen;
  }

}
