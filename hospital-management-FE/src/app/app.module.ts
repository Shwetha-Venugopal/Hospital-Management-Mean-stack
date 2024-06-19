import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { PatientComponent } from './patient/patient.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { TabMenuComponent } from './tab-menu/tab-menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { AuthGuard } from './guards/auth.guard';
import { CalendarModule } from 'primeng/calendar';
@NgModule({
  declarations: [
    AppComponent,
    AppointmentComponent,
    PatientComponent,
    DoctorsComponent,
    TabMenuComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    CalendarModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastModule
  ],
  providers: [AuthGuard,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
