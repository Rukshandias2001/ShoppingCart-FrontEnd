import { Routes } from '@angular/router';
import {AddProductComponent} from './components/add-product/add-product.component';
import {ViewProductComponent} from './components/view-producta/view-product.component';

export const routes: Routes = [
  {path:"addProduct",  component:AddProductComponent},
  {path:"viewProduct", component:ViewProductComponent}
];
