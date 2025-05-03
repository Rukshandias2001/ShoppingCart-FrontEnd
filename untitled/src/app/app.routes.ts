import { Routes } from '@angular/router';
import {AddProductComponent} from './components/add-product/add-product.component';
import {ViewProductComponent} from './components/view-product/view-product.component';
import {ViewDetailsComponent} from './components/view-details/view-details.component';
import {SelectedItems} from './classes/selected-items';
import {SelectedItemsComponent} from './components/selected-items/selected-items.component';
import {CheckoutFormComponent} from './components/checkout-form/checkout-form.component';
import {RecieptComponent} from './components/reciept/reciept.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {LoginComponent} from './components/login/login.component';
import {authGuard} from './auth.guard';
import {DashboardComponentComponent} from './components/dashboard-component/dashboard-component.component';

export const routes: Routes = [
  {path:"addProduct",  component:AddProductComponent,canActivate: [authGuard] ,data:{role:["ADMIN"]}},
  {path:"viewProduct", component:ViewProductComponent,canActivate:[authGuard],data:{role:["CUSTOMER"]}},
  {path:"viewProductDetails/:id",component:ViewDetailsComponent,canActivate:[authGuard],data:{role:["CUSTOMER"]}},
  {path:"selectedItems",component:SelectedItemsComponent,canActivate:[authGuard],data:{role:["CUSTOMER"]}},
  {path:"checkoutForm",component:CheckoutFormComponent,canActivate:[authGuard],data:{role:["CUSTOMER"]}},
  {path:"receipt",component:RecieptComponent,canActivate:[authGuard],data:{role:["CUSTOMER"]}},
  {path:"dashBoard",component:DashboardComponentComponent,canActivate:[authGuard],data:{role:["ADMIN"]}},
  {path:"login",component:LoginComponent},

  {path:"",component:RegistrationComponent}
];
