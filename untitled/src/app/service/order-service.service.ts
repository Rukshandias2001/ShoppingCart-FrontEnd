import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Product} from '../classes/product';
import {SelectedItems} from '../classes/selected-items';
import {Country} from '../classes/country';
import {Observable} from 'rxjs';
import {State} from '../classes/state';
import {Reciept} from '../classes/reciept';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {
  private baseUrl = environment.apiUrl;
  listOfProducts:Array<Product> = [];

  constructor(private httpclient:HttpClient) { }

  getSelectedProductList(selectedItems:Array<SelectedItems>){
    selectedItems.forEach((data)=>{
      // @ts-ignore
      this.listOfProducts.push(new Product(data.productId,data.productName,data.description,data.price,data.quantity,data.imageUrl,data.categoryId))
    })
    return this.listOfProducts;

  }

  saveOrder(order:any){
   return this.httpclient.post(`${this.baseUrl}/user/addOrder`, order,
      {
        responseType: 'json'
      }
    )
  }

  getCountries():Observable<Array<Country>>{
    return this.httpclient.get<Array<Country>>(`${this.baseUrl}/user/getCountries`, {responseType: 'json'})
  }

  getStates(id:number):Observable<Array<State>>{
    return  this.httpclient.get<Array<State>>(`${this.baseUrl}/user/GetStatesById/${id}`, {responseType: 'json'})

  }

  getOrderReciept(email:string):Observable<object>{
    let formData = new FormData();
    formData.append("email",email)
    return  this.httpclient.post<object>(`${this.baseUrl}/user/GetReciept`,formData,{responseType: 'json'})
  }

  getOrderPerUser(email:string,pageNumber:string):Observable<any>{
    const params = {
      email: email,
      pageNumber: pageNumber
    };
    return  this.httpclient.get(`${this.baseUrl}/user/getOrdersPerUser`,{params});
  }

  getReceiptList(id:number):Observable<Array<Reciept>>{
    return this.httpclient.get<Array<Reciept>>(`${this.baseUrl}/user/getOrderById/${id}`)
  }

}
