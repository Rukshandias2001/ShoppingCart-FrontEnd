import { Component } from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {AddProductComponent} from './components/add-product/add-product.component';

import {FooterComponent} from './header/footer/footer.component';
import {NavBarComponent} from './header/nav-bar/nav-bar.component';
import {NgIf} from '@angular/common';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NavBarComponent, NgIf],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'untitled';

  hideLayout = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Routes where you want to HIDE nav and footer
        this.hideLayout = event.url === '/' || event.url.startsWith('/login');
      }
    });
  }



}
