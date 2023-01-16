import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-wp-import',
  templateUrl: './wp-import.component.html',
  styleUrls: ['./wp-import.component.css']
})
export class WpImportComponent implements OnInit {
  importForm: FormGroup;
  scn: any = null;
  blNo: any = null;
  selectedData: any = {};
  mode: any;
  cargoName: any;
  quantity: any;
  pieces: any;
  hatch: any;
  lorryNo: any;
  location: any = null;
  containerNo: any;
  remarks: any;
  document: any = null;
  startTime: any;
  endTime: any;
  weight: any = "0.00";
  data: any = [
    {id:'1',scn:'22OCFF',date:'14/12/2023',berthNo:'B04',shipName:'JASA MURNI'},
    {id:'2',scn:'22NCEP',date:'14/12/2023',berthNo:'B05',shipName:'JOSCO TAIZHOU'},
    {id:'3',scn:'22NCKQ',date:'14/12/2023',berthNo:'B04',shipName:'UNION LUCK'},
    {id:'4',scn:'22NCAF',date:'14/12/2023',berthNo:'B05',shipName:'BAO XIANG LING'},
    {id:'5',scn:'22OBHG',date:'14/12/2023',berthNo:'B04',shipName:'STRAITS CHALLENGER'}]
  data1: any = [
    {id:'1',cargoName:'BOAT (RR)',blNo:'NYKS200007092'},
    {id:'2',cargoName:'COIL (BB)',blNo:'103417LB105'},
    {id:'3',cargoName:'BEAM (BB)',blNo:'UL22366TJKEL02'},
    {id:'4',cargoName:'BEAM (BB)',blNo:'KLXG41'},
    {id:'5',cargoName:'HELICOPTER (RR)',blNo:'SC2206351I'}]
  imexList: any = [{scn:'22OCFF',list:[{val:"WPI091437",type:'import',blNo:'KKLUTH0918072',cargoName:'TRUCK(RR)'},{val:"WPI091758",type:'import',blNo:'KKLUPCC044034',cargoName:'MOTOR CAR (RR)'},{val:"WPI091103",type:'import',blNo:'KKLUTH0918037',cargoName:'MOTOR CAR (RR)'},{val:"WPI091757",type:'import',blNo:'KKLUPCC044033',cargoName:'MOTOR CAR (RR)'},{val:"WPE184785",type:'export',blNo:'',cargoName:''},{val:"WPE184613",type:'export',blNo:'',cargoName:''}]},
  {scn:'22NCEP',list:[{val:"WPI091026",type:'import',blNo:'103417TJ213',cargoName:'PIPES - BUNDLE (BB)'},{val:"WPI091234",type:'import',blNo:'103417LB105',cargoName:'COIL (BB)'},{val:"WPI091478",type:'import',blNo:'BHD22116511',cargoName:'COIL (BB)'},{val:"WPI090953",type:'import',blNo:'103417LB101',cargoName:'COIL (BB)'}]},  
 ]
 blList: any = [];
 btn: any;
 resources: any = null;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private spinner : NgxSpinnerService,
    ) {
      this.importForm = this.formBuilder.group({
        scn: ['', Validators.required],
        // blNo: ['', Validators.required],
        blNo: [null],
        quantity: ['', Validators.required],
        location: ['', Validators.required],
        lorryNo: ['', Validators.required],
        resources: [null],
       // scn: [null],
       // blNo: [null]
    });
     }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.mode = params['mode'];
      this.btn = params['btn'];//TS,CR,TN
      if(this.mode=='edit'){
        this.edit();
      }
    })
  }
 
  edit(){
    this.scn = "22OCFF" ;
    this.blNo = 'NYKS200007092' ;
    this.selectedData.date = '14/12/2023' ;
    this.selectedData.berthNo = 'B04' ;
    this.selectedData.tallyNo = 'A589106' ;
    this.selectedData.shipName = 'JASA MURNI' ;
    this.cargoName ='BOAT (RR)' ;
    this.quantity = '1' ;
    this.pieces = '10' ;
    this.hatch = '1' ;
    this.location = 'YARD 9 - ZONE 1' ;
    this.lorryNo = 'VCA123' ;
    this.containerNo = '' ;
    this.remarks = '' ;
  }

  scnChanged(scn:any){
    var index = _.findIndex(this.data, (row:any) => {
      return row.scn == scn;
    });
    if(index > -1) {
      this.selectedData = this.data[index];
    }
    else{
      this.selectedData = {};
    }
    this.blListDataFill(scn);
  }

  blListDataFill(scn:any){
    var index1 = _.findIndex(this.imexList, (row:any) => {
      return row.scn == scn;
    });
    if(index1 > -1) {
      this.blList = this.imexList[index1].list;
    }
    else{
      this.blList = {};
    }
  }


  importChanged(importNo:any){
    var index1 = _.findIndex(this.blList, (row:any) => {
      return row.val == importNo;
    });
    if(index1 > -1) {
      this.blNo = this.blList[index1].blNo;
      this.cargoName = this.blList[index1].cargoName;
      //this.blNoChanged(this.blNo);
    }
    else{
      this.blNo = '';
    }
  }

  // blNoChanged(blNo:any){
  //   var index = _.findIndex(this.data1, (row:any) => {
  //     return row.blNo == blNo;
  //   });
  //   if(index > -1) {
  //     this.cargoName = this.data1[index].cargoName;
  //   }
  //   else{
  //     this.cargoName = '';
  //   }
  // }

  save(){
    //this.submitTouched = true;
    // if(this.newGroup.type == 'Job Order'){
    //   this.addGroupForm.controls['user'].setValidators([Validators.required]);
    //   this.addGroupForm.controls['user'].updateValueAndValidity();
    // }
    // else{
    //   this.addGroupForm.controls['user'].clearValidators();
    //   this.addGroupForm.controls['user'].updateValueAndValidity();
    // }
    if(!this.importForm.valid){
      for (var i in this.importForm.controls) {
        this.importForm.controls[i].markAsTouched();
      }
      //this.submitTouched = false;
      return false;
    }
    //this.spinner.show();
    this.toastr.success('', 'Tally No "A589106" Saved successfully');
    // this.router.navigate(['wpApprove']);
    this.router.navigate(['/core/wpApprove']);
  }

  reset(){
    this.scn = null;
    this.blNo = null;
    this.selectedData = {};
  }


}

