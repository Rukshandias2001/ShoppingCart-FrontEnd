import { Routes } from '@angular/router';
import {AddProductComponent} from './components/add-product/add-product.component';
import {ViewProductComponent} from './components/view-product/view-product.component';
import {ViewDetailsComponent} from './components/view-details/view-details.component';
import {SelectedItems} from './classes/selected-items';
import {SelectedItemsComponent} from './components/selected-items/selected-items.component';
import {CheckoutFormComponent} from './components/checkout-form/checkout-form.component';
import {RecieptComponent} from './components/reciept/reciept.component';

export const routes: Routes = [
  {path:"addProduct",  component:AddProductComponent},
  {path:"viewProduct", component:ViewProductComponent},
  {path:"viewProductDetails/:id",component:ViewDetailsComponent},
  {path:"selectedItems",component:SelectedItemsComponent},
  {path:"checkoutForm",component:CheckoutFormComponent},
  {path:"receipt/:id",component:RecieptComponent}
];
