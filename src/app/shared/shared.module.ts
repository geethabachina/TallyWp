import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
// import { ImageUploadModule } from './ng2-image-upload/image-upload.module';
import { ImageUploadModule } from "angular2-image-upload";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 2500,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    HttpClientModule,
    ImageUploadModule.forRoot(),
  ],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    BsDatepickerModule,
    RouterModule,
    ModalModule,
    ImageUploadModule
  ]
})
export class SharedModule { }
