import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../classes/product';
import {Electronic} from '../classes/electronic';
import {environment} from '../../environments/environment';
import {Clothing} from '../classes/clothing';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private baseUrl = environment.apiUrl;

  constructor(private httpclient:HttpClient) {

  }

  addElectronics(formData: FormData): Observable<string> {
    return this.httpclient.post(
      `${this.baseUrl}/product/addElectronics`,
      formData,
      {
        responseType: 'text' as 'text'
      }
    );
  }

  addClothing(formData:FormData):Observable<string>{
    return this.httpclient.post(
      `${this.baseUrl}/product/addClothing`,
      formData,
      {
        responseType: 'text' as 'text'
      }
    )
  }

  getProducts():Observable<Array<Product>>{
    return this.httpclient.get<Array<Product>>(
      `${this.baseUrl}/product/GetAllProducts`,{
        responseType: 'json'
      }
    )
  }

  getProductById(id:number):Observable<Clothing | Electronic>{
    return  this.httpclient.get<Clothing | Electronic>(`${this.baseUrl}/product/getProductById/${id}`,{
      responseType:'json'
    })
  }



}
