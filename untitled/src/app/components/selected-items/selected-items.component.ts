import {Component, OnInit} from '@angular/core';
import {SelectedItems} from '../../classes/selected-items';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-selected-items',
  imports: [
    FormsModule,
    NgForOf
  ],
  templateUrl: './selected-items.component.html',
  styleUrl: './selected-items.component.css',
  standalone:true
})
export class SelectedItemsComponent implements  OnInit{
    selectedItems:Array<SelectedItems>=[];
    sortOption: any;
    discountCode: any;

  constructor() {

  }

  ngOnInit(): void {
    this.fetchTheLoad()
  }

  fetchTheLoad() {

  }


  confirmDeletingTheProduct(id:number) {

  }

  addItem(product: SelectedItems) {

  }

  remove(product: SelectedItems) {

  }

  sortProducts() {

  }

  applyDiscount() {

  }

  checkoutForm() {

  }
}
