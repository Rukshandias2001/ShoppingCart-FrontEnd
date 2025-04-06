import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {AddProductComponent} from './components/add-product/add-product.component';

import {FooterComponent} from './header/footer/footer.component';
import {NavBarComponent} from './header/nav-bar/nav-bar.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NavBarComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'untitled';



}
