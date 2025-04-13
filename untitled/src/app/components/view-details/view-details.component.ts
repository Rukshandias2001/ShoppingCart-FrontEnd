import {Component, OnInit} from '@angular/core';
import {ProductServiceService} from '../../service/product-service.service';
import {Product} from '../../classes/product';
import {ActivatedRoute} from '@angular/router';
import {Clothing} from '../../classes/clothing';
import {Electronic} from '../../classes/electronic';
import {NgIf} from '@angular/common';
import {SelectedItems} from '../../classes/selected-items';
import {CartServiceService} from '../../service/cart-service.service';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-view-details',
  imports: [
    NgIf
  ],
  templateUrl: './view-details.component.html',
  styleUrl: './view-details.component.css',
  standalone:true
})
export class ViewDetailsComponent implements OnInit{
    product!:Clothing|Electronic;
    id!:number
    ngOnInit(): void {
      this.fetchProductDetails()
    }

    constructor(private productService:ProductServiceService,private route:ActivatedRoute) {

    }


  fetchProductDetails(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam) {
      this.id = +idParam;

      this.productService.getProductById(this.id).subscribe({
        next: (data: Clothing | Electronic) => {
          if(data.categoryId==2){
            this.product =data as Clothing;
          }else{
            this.product =data as Electronic;
          }

        },
        error: (err) => {
          console.error('Error fetching product:', err);
        },
        complete: () => {
          console.log('Product fetch completed');
        }
      });
    } else {
      console.error('Invalid or missing product ID in route.');
    }
  }


  isClothing(product: Clothing | Electronic): product is Clothing {
    return 'size' in product && 'colour' in product;
  }

  isElectronic(product: Clothing | Electronic): product is Electronic {
    return 'warranty' in product && 'brand' in product;
  }




}
