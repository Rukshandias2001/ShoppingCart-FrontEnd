import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Product} from '../classes/product';
import {SelectedItems} from '../classes/selected-items';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService {
  private baseUrl = environment.apiUrl;
  listOfProducts!:Array<Product>
  listOfSelectedItems: BehaviorSubject<Array<Product>> = new BehaviorSubject<Array<Product>>([]);

  constructor(private httpclient:HttpClient) {

  }

  storeProducts(product:Product){
    this.listOfProducts = this.listOfSelectedItems.getValue();
    let find = this.listOfProducts.find((data)=>{
      if(data.id== product.id){
        return true
      }else{
        return false;
      }
    });
    if(find){
      this.listOfProducts.push(product)
      this.listOfSelectedItems = new BehaviorSubject<Array<Product>>([])
      this.listOfSelectedItems.next(this.listOfProducts)
    }
  }

  saveSelectedItems(selectedItem:SelectedItems):Observable<SelectedItems>{
    return this.httpclient.post<SelectedItems>(`${this.baseUrl}/user/saveItem`,
      selectedItem,
      {
        responseType: 'json'
      })
  }

  getSelectedItems(email:string):Observable<Array<SelectedItems>>{
    let formData = new FormData();
    formData.append("email",email)
    return  this.httpclient.post<Array<SelectedItems>>(`${this.baseUrl}/user/getSelectedItems`,
      formData,
      {
         responseType: 'json'
        }
      )
  }

}
