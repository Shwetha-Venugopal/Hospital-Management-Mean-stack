import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../service/common.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent {
  doctorLists:any
  patientLists:any
  appotmentList:any
  appointmentForm:FormGroup
  constructor(public fb:FormBuilder,public commonService:CommonService,public messageService:MessageService){
    this.appointmentForm=this.fb.group({
      _id:[null],
      date:['',Validators.required],
      doctor:['',Validators.required],
      patient:['',Validators.required]
    })
  }

  ngOnInit(){
    this.apoitmentList()
    this.patientList()
    this.doctorList()
  }

  submit(){
    this.commonService.saveAppointmentList(this.appointmentForm.value).subscribe((data)=>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Appintment successful' });
      this.appointmentForm.reset()
      this.apoitmentList()
    },(error)=>{
      this.messageService.add({ severity: 'error', summary: 'Failure', detail: error.message });
    })
  }
  onEditAppointment(event:any){
    this.appointmentForm.patchValue(event)
    this.appointmentForm.patchValue({
      date: new Date(event.date) 
  })

  }

  reset(){
    this.appointmentForm.reset()
  }

  onDeleteAppointment(event:any){
 this.commonService.deleteAppointment(event._id).subscribe((data:any)=>{
  this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Appintment successful' });
  this.apoitmentList()

 },(error:any)=>{
  this.messageService.add({ severity: 'error', summary: 'Failure', detail: error.message });
 })
  }

  apoitmentList(){
    this.commonService.getAppointementList().subscribe((data:any)=>{
      this.appotmentList=data
    })
  }

  doctorList(){
    this.commonService.getDoctorList().subscribe((data:any)=>{
      this.doctorLists=data
    })
  }

  patientList(){
    this.commonService.getPatientList().subscribe((data:any)=>{
      this.patientLists=data
    })
  }

}
