import {Component, OnInit} from '@angular/core';

import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Clothing} from '../../classes/clothing';
import {ProductServiceService} from '../../service/product-service.service';
import {Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {NgIf} from '@angular/common';
import { ProgressSpinner } from 'primeng/progressspinner';



@Component({
  selector: 'app-add-product',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    Toast,
    NgIf,
    ProgressSpinner

  ],
  providers: [MessageService],
  templateUrl: './add-product.component.html',
  standalone: true,
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit{

  productForm!:FormGroup;

  categoryId!: number;
  warrenty!: string;
  brand!: string;
  size!:string ;
  colour!: string;

  selectedValue:string =""
  loading = false;

  constructor(private formBuilder:FormBuilder,private productService:ProductServiceService,private messageService:MessageService) {
  }


  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      quantity: ['',  [Validators.required, Validators.min(1)]],
      price: ['',  [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      image: [null, Validators.required],
      productType: ['', Validators.required],
      warrenty: [''],
      brand: [''],
      size: [''],
      colour: ['']
    });
  }

  showSuccess(data:string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Added data \n '+data });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
  }

  onProductTypeChange(event: any): void {
    this.selectedValue = event.target.value;

    if (this.selectedValue === 'Electronics') {
      this.categoryId = 1;
      this.productForm.get('warrenty')?.setValidators(Validators.required);
      this.productForm.get('brand')?.setValidators(Validators.required);
      this.productForm.get('size')?.clearValidators();
      this.productForm.get('colour')?.clearValidators();

    } else if (this.selectedValue === 'Clothings') {
      this.categoryId = 2;
      this.productForm.get('size')?.setValidators(Validators.required);
      this.productForm.get('colour')?.setValidators(Validators.required);
      this.productForm.get('warrenty')?.clearValidators();
      this.productForm.get('brand')?.clearValidators();
    }

    // Update validation status
    this.productForm.get('warrenty')?.updateValueAndValidity();
    this.productForm.get('brand')?.updateValueAndValidity();
    this.productForm.get('size')?.updateValueAndValidity();
    this.productForm.get('colour')?.updateValueAndValidity();
  }

  addProductData(){
    if (this.productForm.valid) {
      if (this.selectedValue === 'Electronics'){
        this.createInstanceProduct(this.categoryId)
      }else{
        this.createInstanceProduct(this.categoryId)
      }

      // You can now send data to backend
    } else {
      this.productForm.markAllAsTouched();
    }

  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.productForm.get('image')?.setValue(file);
    }
  }


  createInstanceProduct(type:number){
    this.loading = true

    const productName = this.productForm.value.productName
    const quantity = this.productForm.value.quantity
    const price = this.productForm.value.price
    const description = this.productForm.value.description
    const image = this.productForm.value.image
    const productType = this.productForm.value.prod
    let value1 = ""
    let value2 = ""
    const formData = new FormData();
    formData.append("name",productName)
    formData.append("description",description)
    formData.append("price",price)
    formData.append("quantity",quantity)
    formData.append('imageFile', this.productForm.value.image);
    if(type==1){
      value1 = this.productForm.value.warrenty;
      value2 = this.productForm.value.brand;
      formData.append("warranty",value1)
      formData.append("brand",value2)
      formData.append("categoryId","1")
      this.productService.addElectronics(formData).subscribe({
          next:(data)=>{

            console.log(data)
            this.showSuccess(data)
            this.productForm.reset()

          },
          error:(err)=>{
            this.loading = false
            console.log(err)
            this.showError()
          },
          complete:()=>{
            this.loading = false
            console.log("completed")
          }
      });

    }else{
      value1 = this.productForm.value.size;
      value2 = this.productForm.value.colour;

      formData.append("size",value1)
      formData.append("colour",value2)
      formData.append("categoryId","2")
      this.productService.addClothing(formData).subscribe({
        next:(data)=>{
          console.log(data)
          this.showSuccess(data)
          this.productForm.reset()
        },
        error:(err)=>{
          this.loading = false
          console.log(err)
          this.showError()
        },
        complete:()=>{
          this.loading = false
          console.log("completed")
        }

      })

    }

  }


}
