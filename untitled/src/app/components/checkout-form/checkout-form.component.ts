import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {NgForOf, NgIf} from '@angular/common';
import {CartServiceService} from '../../service/cart-service.service';
import {OrderServiceService} from '../../service/order-service.service';
import {SelectedItems} from '../../classes/selected-items';
import {Country} from '../../classes/country';
import {State} from '../../classes/state';
import swal from "sweetalert2";
import {Router} from '@angular/router';
import {AuthServiceService} from '../../service/auth-service.service';
import {RecieptComponent} from '../reciept/reciept.component';

@Component({
  selector: 'app-checkout-form',
  imports: [
    ReactiveFormsModule,
    NgForOf,
    NgIf
  ],
  standalone:true,
  templateUrl: './checkout-form.component.html',
  styleUrl: './checkout-form.component.css'
})
export class CheckoutFormComponent implements OnInit{

  checkoutForm!:FormGroup
  listOfCards = ["MasterCard","VisaCard"];
  price!:number;
  listOfCountries!: Array<Country>
  listOfStates!:Array<State>
  email!:string;
  userName!:string;
  lastName!:string;


  ngOnInit(): void {
    this.fetchPrice()
    this.getCountries();

  }

  constructor(private formBuilder:FormBuilder,
              public dialogRef: MatDialogRef<CheckoutFormComponent>,
              private cartService:CartServiceService,
              private orderService:OrderServiceService,
              private router:Router,
              @Inject(MAT_DIALOG_DATA) public selectedItems: SelectedItems[],
              private authService:AuthServiceService,
              private dialog: MatDialog) {

    this.email = this.authService.getUserDetails().email;
    this.userName = this.authService.getUserDetails().sub;
    this.lastName = this.authService.getUserDetails().lastName;

    this.checkoutForm = this.formBuilder.group({
      firstName: [this.userName],
      lastName: [this.lastName],
      email: [this.email],
      date: ["",[Validators.required]],
      country: ["", Validators.required],
      city: ["", Validators.required],
      price:[this.price],
      cardType: ["", Validators.required],
      cardNumber: ["", [Validators.required]],
      expiryDate: ["", [Validators.required]],

    });
  }

  fetchPrice(){
    this.cartService.calculatePrice()
    this.cartService.totalprice.subscribe({
      next:(data)=>{
        this.price=data
        this.checkoutForm.patchValue({ price: this.price });
      },
      error:(err)=>{
        console.log(err)
      },
      complete:()=>{
        console.log("process Completed")
    }
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }


  onSubmit() {
    let selectedProductList = this.orderService.getSelectedProductList(this.selectedItems);
    const orderData = {
      id: 1, // or another identifier if needed
      userName: this.checkoutForm.value.firstName,
      lastName: this.checkoutForm.value.lastName,
      date: this.checkoutForm.value.date,
      expiryDate: this.checkoutForm.value.expiryDate,
      nameOfCard: this.checkoutForm.value.cardType,
      creditCardNumber: this.checkoutForm.value.cardNumber,
      email: this.checkoutForm.value.email,
      cardType: this.checkoutForm.value.cardType,
      price: this.price,
      listOfProducts: this.orderService.getSelectedProductList(this.selectedItems),
      orderList:this.selectedItems,
    };
    this.orderService.saveOrder(orderData).subscribe({
      next:(data)=>{
        this.checkoutForm.reset();
        swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully purchased the items !",
          showConfirmButton: false,
          timer: 3500
        });
        this.recieptForm()



      },
      error:(err)=>{
        swal.fire({
          position: "center",
          icon: "error",
          title: "Internal Server Error !",
          showConfirmButton: false,
          timer: 3500
        });
      },
      complete:()=>{
        this.dialogRef.close();
      }
    })

  }

  getCountries() {
    this.orderService.getCountries().subscribe({
      next:(data)=>{
        this.listOfCountries = data;
      },
      error:(err)=>{
        console.log(err)
      },
      complete:()=>{
        console.log("Process Completed !")
      }
    })
  }

  getStates(event:Event){
    const selectElement = event.target as HTMLSelectElement;
    console.log(selectElement.options.selectedIndex)
    const countryId = Number(selectElement.options.selectedIndex);

    this.orderService.getStates(countryId).subscribe({
      next:(data)=>{

        this.listOfStates = data;

      },
      error:(err)=>{
        console.log(err)
      },
      complete:()=>{
        console.log("Process Completed !")
      }
    })
  }

  recieptForm() {
    const dialogRef = this.dialog.open(RecieptComponent, {
      maxWidth: '1500px',
      panelClass: 'custom-dialog-container',
      autoFocus: false,
      data: {
        price: this.price,
        cardType: this.checkoutForm.value.cardType
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog closed:', result);
    });
  }


}
