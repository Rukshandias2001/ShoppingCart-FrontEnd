import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Product} from '../classes/product';
import {SelectedItems} from '../classes/selected-items';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartServiceService implements OnInit{
  private baseUrl = environment.apiUrl;
  listOfProducts!:Array<Product>
  listOfSelectedItems: BehaviorSubject<Array<SelectedItems>> = new BehaviorSubject<Array<SelectedItems>>([]);
  listOfQuantities:BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalprice:BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private httpclient:HttpClient) {

  }
  ngOnInit(): void {
       this.calculatePrice()
  }

  calculatePrice() {
    this.getSelectedItems("diasrukshan21@gmail.com").subscribe({
      next: (data) => {
        if (data.length > 0) {
          let quantity = 0;
          let itemPrice = 0;

          this.listOfSelectedItems.next(data);

          data.forEach((item) => {
            quantity += item.quantity ?? 0;
            itemPrice += (item.quantity ?? 0) * (item.price ?? 0);
          });

          this.listOfQuantities.next(quantity);
          this.totalprice.next(itemPrice);
        } else {
          this.listOfQuantities.next(0);
          this.totalprice.next(0); // optional, if you want to reset total price too
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("processComplete!");
      }
    });
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

  deleteSelectedItemService(selectedItemId:number){
    this.calculatePrice()
    return this.httpclient.delete(`${this.baseUrl}/user/deleteSelectedItem/${selectedItemId}`)
  }

}
