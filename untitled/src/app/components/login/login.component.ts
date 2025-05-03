import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {AuthServiceService} from '../../service/auth-service.service';
import {User} from '../registration/registration.component';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {Toast} from 'primeng/toast';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NgIf,
    Toast
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone:true,
  providers: [MessageService],

})
export class LoginComponent implements OnInit{

    registerForm!: FormGroup;
    role!:string;

  constructor(private fb: FormBuilder,private authService:AuthServiceService,private router:Router,private messageService:MessageService) {

  }

    ngOnInit(): void {
      this.registerForm = this.fb.group({
        userName: ['', Validators.required],
        lastName: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],

      });
    }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'You have successfully registered !' });
    this.role =this.authService.getUserDetails().role
    if(this.role === "CUSTOMER"){
      this.router.navigate(["/viewProduct"])
    }else{
      this.router.navigate(["/addProduct"])
    }

  }

  warning(){
    this.messageService.add({ severity: 'info', summary: 'Warning', detail: 'You have already registered under the relevant email or userName !' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error occurred during the registration !' });
  }


  onSubmit(): void {
    if (this.registerForm.valid) {
      let user :User = this.registerForm.value
      this.authService.loginUser(user).subscribe({
        next:(data)=>{
          console.log(data)
          sessionStorage.setItem("access-token", JSON.stringify(data))
          this.authService.decodeToken()
          this.showSuccess()

        },
        error:(err)=>{
          console.log(err)
          this.warning()
        },
        complete:()=>{
          console.log("fetched Data")
        }
        }

      )
      // Add your login logic here
    } else {
      console.log('Form is invalid');
    }
  }

  directToLoginPage(){
    this.router.navigate(['/'])
  }

}
