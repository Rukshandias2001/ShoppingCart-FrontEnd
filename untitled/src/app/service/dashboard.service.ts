import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {DashBoardRevenueDTO} from '../classes/dash-board-revenue-dto';
import {Observable} from 'rxjs';
import {CustomerDTO} from '../classes/customer-dto';
import {ProductDTO} from '../classes/product-dto';
import {MonthlyIncomeDTO} from '../classes/monthly-income-dto';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = environment.apiUrl

  constructor(private httpclient:HttpClient) { }

  getDashBoardDTO():Observable<DashBoardRevenueDTO>{
    return this.httpclient.get<DashBoardRevenueDTO>(`${this.baseUrl}/dashBoard/totalsForDashBoard`,{
      responseType: 'json'
    })
  }

  getTopCustomersDTO():Observable<Array<CustomerDTO>>{
    return  this.httpclient.get<Array<CustomerDTO>>(`${this.baseUrl}/dashBoard/topCustomers`,{
      responseType:'json'
    })
  }


  getTopProductList():Observable<Array<ProductDTO>>{
    return  this.httpclient.get<Array<ProductDTO>>(`${this.baseUrl}/dashBoard/getSoldProducts`,{
      responseType:'json'
    })
  }

  getTopClothingsList():Observable<Array<ProductDTO>>{
    return  this.httpclient.get<Array<ProductDTO>>(`${this.baseUrl}/dashBoard/getSoldClothings`,{
      responseType:'json'
    })
  }

  getMonthLyIncome():Observable<Array<MonthlyIncomeDTO>>{
    return   this.httpclient.get<Array<MonthlyIncomeDTO>>(`${this.baseUrl}/dashBoard/getMonthlyIncome`,{
      responseType:'json'})
  }


}
