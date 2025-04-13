import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-checkout-form',
  imports: [],
  standalone:true,
  templateUrl: './checkout-form.component.html',
  styleUrl: './checkout-form.component.css'
})
export class CheckoutFormComponent implements OnInit{

  checkoutForm!:FormGroup

  ngOnInit(): void {

  }

  constructor(private formBuilder:FormBuilder) {
    this.checkoutForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      address1: ["", Validators.required],
      city: ["", Validators.required],
      state: ["", Validators.required],
      postalCode: ["", [Validators.required, Validators.pattern("^[0-9]{5}$")]],
      cardType: ["visa", Validators.required],
      cardNumber: ["", [Validators.required, Validators.pattern("^[0-9]{16}$")]],
      expiryDate: ["", [Validators.required, Validators.pattern("^(0[1-9]|1[0-2])\/([0-9]{2})$")]],
      cvv: ["", [Validators.required, Validators.pattern("^[0-9]{3,4}$")]]
    });
  }



}
