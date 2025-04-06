import {Component, OnInit} from '@angular/core';
import {ProductServiceService} from '../../service/product-service.service';
import {NgForOf} from '@angular/common';
import {Product} from '../../classes/product';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-view-product',
  imports: [
    NgForOf,

  ],
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.css',
  standalone:true
})
export class ViewProductComponent implements OnInit{
  products: Array<Product>=[];

  constructor(private productService:ProductServiceService) {

  }


    ngOnInit(): void {
        this.fetchData()
    }

    fetchData(){
        this.productService.getProducts().subscribe({
            next: (data) => {
              this.products = data

            },
            error:(err)=>{

            },
            complete:()=>{

            }
          }

        )
    }

}
