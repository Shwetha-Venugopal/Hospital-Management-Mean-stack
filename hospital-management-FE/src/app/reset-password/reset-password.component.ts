import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CommonService } from '../service/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  resetForm: FormGroup
  constructor(public router:Router, public commonService: CommonService, public fb: FormBuilder,public messageService:MessageService) {
    this.resetForm = this.fb.group({
      newPassword: ['', Validators.required],
      email: ['', Validators.required]
    })
  }

  clickReset(){
    this.commonService.clickReset(this.resetForm.value).subscribe((data:any)=>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Reset successful' });
    },(error)=>{
      this.messageService.add({ severity: 'danger', summary: 'denger', detail: error.message });
    })
  }

  cancelReset(){
    this.router.navigate(['login'])
  }

}
