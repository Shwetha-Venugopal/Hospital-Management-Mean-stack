import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { CommonService } from '../service/common.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm:FormGroup
  constructor(public router:Router,public fb:FormBuilder,public commonService:CommonService,private messageService:MessageService){
    this.loginForm=this.fb.group({
      userName:['',Validators.required],
      password:['',Validators.required]
    })
  }

  naviagateToRegisterPage(){
    this.router.navigate(['/register'])
  }

  loginButton(){
      this.commonService.login(this.loginForm.value).subscribe(
        (data: any) => {
          sessionStorage.setItem("token", data.token);
          this.commonService.loginUser();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successful' });
          this.router.navigate(['hospital/appoitment']);
        },
        (error: any) => {
          this.messageService.add({ severity: 'error', summary: 'Failure', detail: error.message });
        }
      );
    }

  naviagateToresetPage(){
    this.router.navigate(['reset-password'])
  }

  resetForm(){
    this.loginForm.reset()
  }



}
