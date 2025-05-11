import {Component, Inject, OnInit} from '@angular/core';
import {NgIf} from '@angular/common';
import {ProgressSpinner} from 'primeng/progressspinner';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Toast} from 'primeng/toast';
import {ProductServiceService} from '../../service/product-service.service';
import {MessageService} from 'primeng/api';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SelectedItems} from '../../classes/selected-items';
import {Product} from '../../classes/product';
import {MatProgressBar} from '@angular/material/progress-bar';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-update-form',
  imports: [
    NgIf,
    ProgressSpinner,
    ReactiveFormsModule,
    Toast,
    MatProgressSpinner,

  ],
  standalone:true,
  templateUrl: './update-form.component.html',
  styleUrl: './update-form.component.css',
  providers: [MessageService]
})
export class UpdateFormComponent implements  OnInit{
  productForm!:FormGroup;
  categoryId!: number;
  warrenty!: string;
  brand!: string;
  size!:string ;
  colour!: string;

  selectedValue:string =""
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<UpdateFormComponent>,
    private formBuilder:FormBuilder,
    private productService:ProductServiceService,
    private messageService:MessageService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public product:Product) {

  }


  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: [this.product.name, Validators.required],
      quantity: [this.product.quantity,  [Validators.required, Validators.min(1)]],
      price: [this.product.price,  [Validators.required, Validators.min(1)]],
      description: [this.product.description, Validators.required],
    });
  }

  showSuccess(data:Product) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product updated successfully ! \n '+data.name });

  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });
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




  createInstanceProduct(type:number){
    this.loading = true

    const productName = this.productForm.value.productName
    const quantity = this.productForm.value.quantity
    const price = this.productForm.value.price
    const description = this.productForm.value.description
    let product = new Product(this.product.id,productName,description,price,quantity,this.product.imageUrl,this.product.categoryId)

    let value1 = ""
    let value2 = ""
    setTimeout(()=>{
      this.productService.updateProductService(product).subscribe({
        next:(data)=>{
          console.log(data)
          this.showSuccess(data)
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

    },5000)



  }

  closeDialog() {
    this.dialogRef.close();
  }





}
