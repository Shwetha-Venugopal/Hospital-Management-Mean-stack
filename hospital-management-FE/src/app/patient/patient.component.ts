import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../service/common.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent {
  userProfileForm:FormGroup
  patinetLists:any
  constructor(public fb:FormBuilder,public commonService:CommonService,public messageService:MessageService){
    this.userProfileForm=this.fb.group({
      _id:[null,Validators.required],
      gender:['',Validators.required],
      age:['',Validators.required],
      name:['',Validators.required]
    })
  }
  ngOnInit(){
    this.patientList()
  }

  submitUserProfile(){
    this.commonService.savePatientList(this.userProfileForm.value).subscribe((data)=>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successful' });
      this.userProfileForm.reset()
      this.patientList()
    },(error)=>{
      this.messageService.add({ severity: 'error', summary: 'Failure', detail: error.message });
    })
  }

  cancel(){
    this.userProfileForm.reset()
  }

  patientList(){
    this.commonService.getPatientList().subscribe((data)=>{
      this.patinetLists=data
    })
  }

  onEditPatient(event:any){
    this.userProfileForm.patchValue(event)
  }

  onDeletePatient(event:any){
    this.commonService.deletePatient(event._id).subscribe((dt)=>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted successful' });
      this.patientList()
    },(error:any)=>{
      this.messageService.add({ severity: 'error', summary: 'Failure', detail: error.message });
    })
  }

}
