import { Component } from '@angular/core';
import { CommonService } from '../service/common.service';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent {
  speclistData:any
  doctorList:any
  doctorsForm:any
  constructor(public coreService:CommonService,public fb:FormBuilder,public messageService:MessageService){
    this.doctorsForm=this.fb.group({
      _id:[null],
      doctorName:[''],
      specialityId:['']

    })
  }

  ngOnInit(){
    this.getSpecialistList()
    this.getDoctorlist()
  }

  submit(){
    this.coreService.saveDoctorList(this.doctorsForm.value).subscribe((data)=>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Added successful' });
      this.doctorsForm.reset()
      this.getDoctorlist()
    },(error)=>{
      this.messageService.add({ severity: 'error', summary: 'Failure', detail: error.message });
    })
  }

  getSpecialistList(){
    this.coreService.getSpecialistList().subscribe((res)=>{
      this.speclistData=res
    })
  }

  onEditDoctor(event:any){
    this.doctorsForm.patchValue(event)
  }

  onDeleteDoctor(event:any){
    this.coreService.deleteDoctor(event._id).subscribe((data:any)=>{
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted successful' });
      this.getDoctorlist()
    },(error)=>{
      this.messageService.add({ severity: 'error', summary: 'Failure', detail: error.message });
    })

  }

  getDoctorlist(){
    this.coreService.getDoctorList().subscribe((data)=>{
      this.doctorList=data
    })
  }

  cancel(){
    this.doctorsForm.reset()
  }

  




}
