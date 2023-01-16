import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/services/dashboard.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  username: any = '';
  submitted: any = false;
  hide: boolean = true;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dashboardService : DashboardService,
    )
    {
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });
   }

  ngOnInit() {}


  onSubmit() {
    this.submitted = true;
    if(this.loginForm.invalid){
      for (var i in this.loginForm.controls) {
        this.loginForm.controls[i].markAsTouched();
      }
      return;
    }
   // this.router.navigate(['core/selectOption']);
   this.router.navigate(['selectOption']);
    //  this.router.navigate(['wpImport']);

     //this.router.navigate(['wpApprove']);
    //  this.dashboardService.setBtnBg();
    //  this.router.navigate(['/core/wpApprove']);
  }

  showPassword() {
    this.hide = !this.hide;
  }





}
