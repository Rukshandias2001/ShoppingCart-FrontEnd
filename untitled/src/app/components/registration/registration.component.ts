import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthServiceService} from '../../service/auth-service.service';
import Swal from 'sweetalert2';
import {MessageService} from 'primeng/api';
import {Toast} from 'primeng/toast';
import {Router} from '@angular/router';

export interface  User {
  role:string;
  userName:string;
  lastName:string ;
  password:string;
  email:string;
}


@Component({
  selector: 'app-registration',
  imports: [
    ReactiveFormsModule,
    Toast
  ],
  providers: [MessageService],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css',
  standalone:true
})
export class RegistrationComponent implements OnInit{

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder,private authService:AuthServiceService,private messageService:MessageService,private router:Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });

  }

  showSuccess() {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'You have successfully registered !' });
    this.router.navigate(["/login"])
  }

  warning(){
    this.messageService.add({ severity: 'info', summary: 'Warning', detail: 'You have already registered under the relevant email or userName !' });
  }

  showError() {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error occurred during the registration !' });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      // You can now send this to your backend
      let user:User = this.registerForm.value
      user.role = "3"

      this.authService.registerUser(user).subscribe({
        next:(data)=>{

          if(data!=null){
            this.showSuccess()
          }else{
            this.warning()
          }

        },
        error:(err)=>{
          this.showError()

        },
        complete:()=>{

      }
      })

    }
  }

  directToLoginPage(){
    this.router.navigate(['/login'])
  }

}
