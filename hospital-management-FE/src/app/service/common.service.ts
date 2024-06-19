import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  url='http://localhost:9000/api'
  public logginIn:boolean=false

  constructor(public http:HttpClient,public router:Router) { }

  getSpecialistList(){
    return this.http.get(`${this.url}/specialist/get`)
  }

  saveRegister(registerData:any){
    return this.http.post(`${this.url}/user/register`,registerData)
  }

  login(loginData:any){
    return this.http.post(`${this.url}/user/login`,loginData)
  }

  loginUser() {
    this.logginIn = true;
    return this.logginIn;
  }

  logout() {
    this.logginIn = false;
    sessionStorage.removeItem('token');
    this.router.navigate(['login']);
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  clickReset(resetData:any){
    return this.http.post(`${this.url}/user/reset-password`,resetData)
  }

  getDoctorList(){
    return this.http.get(`${this.url}/doctor/get`)
  }

  getAppointementList(){
    return this.http.get(`${this.url}/appoitment/get`)
  }

  getPatientList(){
    return this.http.get(`${this.url}/patient/get`)
  }

  deletePatient(id:any){
    return this.http.delete(`${this.url}/patient/delete/${id}`)
  }

  deleteAppointment(id:any){
    return this.http.delete(`${this.url}/appoitment/delete/${id}`)
     
  }
  saveAppointmentList(appintment:any){
    if(appintment._id===null){
      return this.http.post(`${this.url}/appoitment/add`,appintment)
    }else{
      return this.http.put(`${this.url}/appoitment/update/${appintment._id}`,appintment)
    }
    
  }

  deleteDoctor(id:any){
    return this.http.delete(`${this.url}/doctor/delete/${id}`)
  }


  savePatientList(patientData:any){
    if(patientData._id===null){
      return this.http.post(`${this.url}/patient/add`,patientData)
    }else{
      return this.http.put(`${this.url}/patient/update/${patientData._id}`,patientData)
    }
   
  }
  saveDoctorList(doctorData:any){
    if(doctorData._id===null){
      return this.http.post(`${this.url}/doctor/add`,doctorData)
    }else{
      return this.http.put(`${this.url}/doctor/update/${doctorData._id}`,doctorData)
    }
    
  }


}
