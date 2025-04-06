import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import "primeicons/primeicons.css";

@Component({
  selector: 'app-nav-bar',
  imports: [
    RouterLink
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
  standalone:true
})
export class NavBarComponent {

  profilepic:string="R";

}
