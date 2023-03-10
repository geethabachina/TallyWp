import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { IfStmt } from '@angular/compiler';
import { DashboardService } from 'src/app/services/dashboard.service';
import { ModalServiceService } from 'src/app/shared/services/modal-service/modal-service.service';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { Camera,CameraResultType,CameraSource } from '@capacitor/camera';

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
  cargoName: any = null;
  quantity: any;
  pieces: any;
  hatch: any = null;
  lorryNo: any;
  location: any = null;
  containerNo: any;
  remarks: any;
  document: any = null;
  startTime: any;
  endTime: any;
  weight: any = "0.00";
  createdDate: any = "John created this on 17/02/2023 12:38 PM";
  modifiedDate: any = "Smith modified this on 17/02/2023 02:13 PM";
  totalQuantity: any;
  balanceQuantity: any;
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
  imexList: any = [{scn:'22OCFF',list:[{val:"WPI091437",type:'import',blNo:'KKLUTH0918072',cargoName:'TRUCK(RR)'},{val:"WPI091758",type:'import',blNo:'KKLUPCC044034',cargoName:'MOTOR CAR (RR)'},{val:"WPI091103",type:'import',blNo:'KKLUTH0918037',cargoName:'MOTOR CAR (RR)'},{val:"WPI091757",type:'import',blNo:'KKLUPCC044033',cargoName:'MOTOR CAR (RR)'},{val:"WPE184785",type:'export',blNo:'',cargoName:''},{val:"WPE184613",type:'export',blNo:'',cargoName:''},{val:"WPE185534",type:'export',blNo:'',cargoName:''}]},
  {scn:'22NCEP',list:[{val:"WPI091026",type:'import',blNo:'103417TJ213',cargoName:'PIPES - BUNDLE (BB)'},{val:"WPI091234",type:'import',blNo:'103417LB105',cargoName:'COIL (BB)'},{val:"WPI091478",type:'import',blNo:'BHD22116511',cargoName:'COIL (BB)'},{val:"WPI090953",type:'import',blNo:'103417LB101',cargoName:'COIL (BB)'}]},  
 ]
 blList: any = [];
 btn: any;
 resources: any = null;
 //comeFrom: any = null; 
 modeValue: any = null;  
 exportMode : any = null;
 tallyNo: any;
 DONo: any;
 TNNo: any;  
 //importExportType: any;
 endTimeExist: boolean = false;//edit- have endTime should not edit any fields in TS.
 status: any;
 contractorName: any;
 wpRemarks: any;
 tnNo: any = null;
 uploadUrl: any;
//  http://aberezkin.com/ng2-image-upload/#/demo
customStyle = {
  selectButton: {
    "background-color": "rgba(81,38,236,1)",
    "border-radius": "25px",
    "color": "#f8f9fa",
    "margin": "0px"
  },
  clearButton: {
    "background-color": "#FFF",
    "border-radius": "25px",
    "color": "#000",
    "margin-left": "10px"
  },
  layout: {
    // "background-color": "#6c757d",
    "border": "1px solid #d5d4d4",
    "box-shadow": "rgb(0 0 0 / 4%) 0px 3px 16px",
    "border-radius": "25px",
    "color": "#FFF",
    "font-size": "12px",
    // "margin": "10px",
    // "padding-top": "5px",
    "width": "100%"
  },
  previewPanel: {
    "background-color": "#f8f9fa",
    "border-radius": "0 0 25px 25px",
  },
}
private trigger: Subject<any> = new Subject();
public webcamImage!: WebcamImage;
private nextWebcam: Subject<any> = new Subject();
sysImage = '';
image='';


  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private spinner : NgxSpinnerService,
    private dashboardService : DashboardService,
    private modalService2: ModalServiceService,
    ) {
      this.importForm = this.formBuilder.group({
        scn: ['', Validators.required],
        // blNo: ['', Validators.required],
        blNo: [null],
        quantity: ['', Validators.required],
        location: [null],//show/hide field
        lorryNo: [null],
        resources: [null],
       // scn: [null],
       // blNo: [null]
    });
     }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.mode = params['mode'];
      this.btn = params['btn'];//TS,CR,TN
      this.status = params['status'];//TS,CR,TN
      //this.comeFrom = params['comeFrom'];//TN
      if(this.mode=='edit'){
        this.edit();
        if(this.status=='completed'){
          this.endTimeExist = true;
          this.endTime = "03:09 PM";
          this.importForm.controls['scn'].disable();
          this.importForm.controls['quantity'].disable();
          this.importForm.controls['resources'].disable();
          this.importForm.controls['location'].disable();
          this.importForm.controls['lorryNo'].disable();
        }
      }else{//add
        var date = new Date();
        this.startTime = date.toTimeString().substring(0,5);
      }
    })
  }
 
  edit(){
    this.scn = "22OCFF" ;
    this.blNo = 'NYKS200007092' ;
    this.selectedData.date = '14/12/2023' ;
    this.selectedData.berthNo = 'B04' ;
    this.selectedData.shipName = 'JASA MURNI' ;
    this.tallyNo = 'A589106' ;
    this.DONo = 'VH/0119' ;
    this.TNNo = 'TN016659' ;
    this.cargoName ='BOAT (RR)' ;
    this.quantity = '1' ;
    this.pieces = '10' ;
    this.hatch = '1' ;
    this.location = 'YARD 9 - ZONE 1' ;
    this.lorryNo = 'VCA123' ;
    this.containerNo = '' ;
    this.remarks = '' ;
    this.modeValue = "EXPORT";
    this.exportMode = "Direct";
    this.document = 'import';
    this.scnChanged(this.scn);
    this.startTime = "12:49 PM";
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

  tnNoChange(){
    if(this.tnNo=="null"||!this.tnNo){
      this.cargoName = null;
      this.quantity = "";
      this.pieces = "";
      this.weight = "0.00";
    }
    else{
      this.cargoName = "BOAT (RR)";
      this.quantity = "1";
      this.pieces = "2";
      this.weight = "10.00";
    }
  }


  // importChanged(importNo:any){
  //   var index1 = _.findIndex(this.blList, (row:any) => {
  //     return row.val == importNo;
  //   });
  //   if(index1 > -1) {
  //     this.blNo = this.blList[index1].blNo;
  //     this.cargoName = this.blList[index1].cargoName;
  //     this.importExportType = this.blList[index1].type
  //   }
  //   else{
  //     this.blNo = '';
  //   }
  // }

 

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

  save(type: any){
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
    var overloded;
    if(this.quantity > this.balanceQuantity || (this.quantity && !this.balanceQuantity)){
      overloded = true;
    }else{
      overloded = false;
    }
    var data = {btn:this.btn,overloded:overloded}
    //this.spinner.show();
    this.modalService2.openModal(type, data);
    // if(this.btn=='TS'){
    //   this.toastr.success('', 'Tally No "A589106" Saved successfully');
    // }else if(this.btn=='CR'){
    //   this.toastr.success('', 'DO No "VH/0119" Saved successfully');
    // }else{
    //   this.toastr.success('', 'TN No "TN016659" Saved successfully');
    // }
    // this.dashboardService.setListBtnBg();
    // this.router.navigate(['/core/wpApprove'], { queryParams: { btn:this.btn}});
  }

  end(){
    this.endTimeExist = true;
    var date = new Date();
    this.endTime = date.toTimeString().substring(0,5);
    var data = {btn:this.btn}
    this.modalService2.openModal("end", data);
    // if(this.btn=='TS'){
    //   this.toastr.success('', 'Tally No "A589106" Saved successfully');
    // }else if(this.btn=='CR'){
    //   this.toastr.success('', 'DO No "VH/0119" Saved successfully');
    // }else{
    //   this.toastr.success('', 'TN No "TN016659" Saved successfully');
    // }
    // this.dashboardService.setListBtnBg();
    // this.router.navigate(['/core/wpApprove'], { queryParams: { btn:this.btn}});
  }

  reset(){
    this.scn = null;
    this.blNo = null;
    this.selectedData = {};
  }


  onUploadStateChanged(state: boolean) {
  //   setTimeout(() => {
  //     var objDiv = document.getElementById('div_id');
  //     objDiv.scrollTop = objDiv.scrollHeight
  // }, 1000)

  //   console.log(state,"+++++++++++")
  //   if(state){
  //     this.submitTouched = true
  //   }else{
  //     this.submitTouched = false
  //   }
  }

  imageFinishedUploading(file: any) {
    // if(file.serverResponse.status == 200 || file.serverResponse.status == 201){
    //   var body=JSON.parse(file.serverResponse.response._body);
    //   this.attachments.push({id : body.id});
    // }
  }

  onRemoved(file){
    // _.remove(this.attachments, (o:any) => {
    //   var body = JSON.parse(file.serverResponse.response._body);
    //   return o.id == body.id;
    // });
  }


  // public getSnapshot(): void {
  //   //debugger
  //   this.trigger.next(void 0);
  // }
  // public captureImg(webcamImage: WebcamImage): void {
  //   //debugger
  //   this.webcamImage = webcamImage;
  //   this.sysImage = webcamImage!.imageAsDataUrl;
  //   console.info('got webcam image', this.sysImage);
  // }
  // public get invokeObservable(): Observable<any> {
  //   //debugger
  //   return this.trigger.asObservable();
  // }
  // public get nextWebcamObservable(): Observable<any> {
  //   //debugger
  //   return this.nextWebcam.asObservable();
  // }



async captureImage(){
  const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      source: CameraSource.Prompt,
      resultType: CameraResultType.Base64
  });

  if(image){
  this.image = `data:image/jpeg;base64,${image.base64String}`!;
  }
}



  // https://www.youtube.com/watch?v=V2Wn2JROUEo&t=998s
  // https://capacitorjs.com/docs/apis/camera
  // https://www.positronx.io/angular-capture-images-from-system-webcam-tutorial/
  
 


}

