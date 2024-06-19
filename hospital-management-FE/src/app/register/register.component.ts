import { Component } from '@angular/core';
import { CommonService } from '../service/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm:FormGroup
  constructor(public commonService:CommonService,public fb:FormBuilder,public router:Router,private messageService:MessageService){
    this.registerForm=this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required],
      userName:['',Validators.required]
    })
  }

  saveRegister(){
    this.commonService.saveRegister(this.registerForm.value).subscribe((data)=>{
      console.log(data)
      this.router.navigate(['login'])

      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
    },(error:any)=>{
      this.messageService.add({ severity: 'error', summary: 'Failure', detail: error.message });

    })
  }

  cancelRegister(){
    this.router.navigate(['login'])
  }

}
