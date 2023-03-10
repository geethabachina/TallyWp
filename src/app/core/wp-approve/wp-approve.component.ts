import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as _ from 'lodash';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-wp-approve',
  templateUrl: './wp-approve.component.html',
  styleUrls: ['./wp-approve.component.css']
})
export class WpApproveComponent implements OnInit {
  importForm: FormGroup;
  scn: any = null;
  hatchNo: any = null;
  btn: any;
  searchValue: any;
  data: any = [
    {id:'1',tallyNo:'A589106',date:'14/12/23',lorryNo:'VCA123',SCN:'231AFL',WPENo:'WPE185534',DONo:'VH/0119',TNNo:'TN016659',status:'completed',mode:'export'},
    {id:'2',tallyNo:'D589107',date:'14/12/23',lorryNo:'CCA123',SCN:'231AHA',WPENo:'WPE185551',DONo:'20/2023',TNNo:'TN016577',status:'pending',mode:'import'},
    {id:'3',tallyNo:'B589106',date:'14/12/23',lorryNo:'BCA123',SCN:'22DALG',WPENo:'WPE185420',DONo:'3112022-1',TNNo:'TN016569',status:'completed',mode:'export'},
    {id:'4',tallyNo:'B589107',date:'14/12/23',lorryNo:'ABC7321',SCN:'22NBUF',WPENo:'WPE184804',DONo:'A4953823',TNNo:'TN016447',status:'pending',mode:'export'},
    {id:'5',tallyNo:'C591982',date:'14/12/23',lorryNo:'CEF7321',SCN:'22NCFD',WPENo:'WPE184883',DONo:'1025327',TNNo:'TN016421',status:'completed',mode:'import'},
    {id:'6',tallyNo:'B389106',date:'14/12/23',lorryNo:'BCA123',SCN:'231AFL',WPENo:'WPE185466',DONo:'',TNNo:'',status:'pending',mode:'import'},
    {id:'7',tallyNo:'B586107',date:'14/12/23',lorryNo:'ABC7321',SCN:'22DALG',WPENo:'WPE185420',DONo:'',TNNo:'',status:'completed',mode:'export'},
    {id:'8',tallyNo:'C491982',date:'14/12/23',lorryNo:'CHF7321',SCN:'22NBUF',WPENo:'WPE184804',DONo:'',TNNo:'',status:'completed',mode:'import'},
    {id:'9',tallyNo:'B585107',date:'14/12/23',lorryNo:'AGC7321',SCN:'22NCFD',WPENo:'WPE184777',DONo:'',TNNo:'',status:'pending',mode:'export'},
    {id:'10',tallyNo:'C581982',date:'14/12/23',lorryNo:'CJF7321',SCN:'22NBTW',WPENo:'WPE184578',DONo:'',TNNo:'',status:'pending',mode:'import'},
    {id:'6',tallyNo:'B389106',date:'14/12/23',lorryNo:'BCA123',SCN:'231AFL',WPENo:'WPE185466',DONo:'',TNNo:'',status:'completed',mode:'export'},
    {id:'7',tallyNo:'B586107',date:'13/12/23',lorryNo:'ABC7321',SCN:'22DALG',WPENo:'WPE185420',DONo:'',TNNo:'',status:'pending',mode:'import'},
    {id:'8',tallyNo:'C491983',date:'14/12/23',lorryNo:'CHF7321',SCN:'22NBUF',WPENo:'WPE184804',DONo:'',TNNo:'',status:'completed',mode:'import'},
    {id:'9',tallyNo:'B585106',date:'15/12/23',lorryNo:'AGC7321',SCN:'22NCFD',WPENo:'WPE184777',DONo:'',TNNo:'',status:'pending',mode:'import'},
    {id:'10',tallyNo:'C581981',date:'16/12/23',lorryNo:'CJF7321',SCN:'22NBTW',WPENo:'WPE184578',DONo:'',TNNo:'',status:'completed',mode:'import'},
    //{id:'11',tallyNo:'C4919821',date:'14/12/23',lorryNo:'CHF7321',SCN:'22NBUF',WPENo:'WPE184804',DONo:'',TNNo:'',status:'completed',mode:'import'},
    //{id:'12',tallyNo:'B585105',date:'25/12/23',lorryNo:'AGC7321',SCN:'22NCFD',WPENo:'WPE184777',DONo:'',TNNo:'',status:'pending',mode:'import'},
    //{id:'13',tallyNo:'B585104',date:'26/12/23',lorryNo:'CJF7321',SCN:'22NBTW',WPENo:'WPE184578',DONo:'',TNNo:'',status:'completed',mode:'import'},
  ]

  originalData: any = [
    {id:'1',tallyNo:'A589106',date:'14/12/23',lorryNo:'VCA123',SCN:'231AFL',WPENo:'WPE185534',DONo:'VH/0119',TNNo:'TN016659',status:'pending'},
    {id:'2',tallyNo:'D589107',date:'14/12/23',lorryNo:'CCA123',SCN:'231AHA',WPENo:'WPE185551',DONo:'20/2023',TNNo:'TN016577',status:'pending'},
    {id:'3',tallyNo:'B589106',date:'14/12/23',lorryNo:'BCA123',SCN:'22DALG',WPENo:'WPE185420',DONo:'3112022-1',TNNo:'TN016569',status:'completed'},
    {id:'4',tallyNo:'B589107',date:'14/12/23',lorryNo:'ABC7321',SCN:'22NBUF',WPENo:'WPE184804',DONo:'A4953823',TNNo:'TN016447',status:'pending'},
    {id:'5',tallyNo:'C591982',date:'14/12/23',lorryNo:'CEF7321',SCN:'22NCFD',WPENo:'WPE184883',DONo:'1025327',TNNo:'TN016421',status:'completed'},
    {id:'6',tallyNo:'B389106',date:'14/12/23',lorryNo:'BCA123',SCN:'231AFL',WPENo:'WPE185466',DONo:'',TNNo:'',status:'pending'},
    {id:'7',tallyNo:'B586107',date:'14/12/23',lorryNo:'ABC7321',SCN:'22DALG',WPENo:'WPE185420',DONo:'',TNNo:'',status:'completed'},
    {id:'8',tallyNo:'C491982',date:'14/12/23',lorryNo:'CHF7321',SCN:'22NBUF',WPENo:'WPE184804',DONo:'',TNNo:'',status:'completed'},
    {id:'9',tallyNo:'B585107',date:'14/12/23',lorryNo:'AGC7321',SCN:'22NCFD',WPENo:'WPE184777',DONo:'',TNNo:'',status:'pending'},
    {id:'10',tallyNo:'C581982',date:'14/12/23',lorryNo:'CJF7321',SCN:'22NBTW',WPENo:'WPE184578',DONo:'',TNNo:'',status:'pending'},
    {id:'6',tallyNo:'B389106',date:'14/12/23',lorryNo:'BCA123',SCN:'231AFL',WPENo:'WPE185466',DONo:'',TNNo:'',status:'completed'},
    {id:'7',tallyNo:'B586107',date:'14/12/23',lorryNo:'ABC7321',SCN:'22DALG',WPENo:'WPE185420',DONo:'',TNNo:'',status:'pending'},
    {id:'8',tallyNo:'C491983',date:'14/12/23',lorryNo:'CHF7321',SCN:'22NBUF',WPENo:'WPE184804',DONo:'',TNNo:'',status:'completed'},
    {id:'9',tallyNo:'B585106',date:'14/12/23',lorryNo:'AGC7321',SCN:'22NCFD',WPENo:'WPE184777',DONo:'',TNNo:'',status:'pending'},
    {id:'10',tallyNo:'C581981',date:'14/12/23',lorryNo:'CJF7321',SCN:'22NBTW',WPENo:'WPE184578',DONo:'',TNNo:'',status:'completed'},
    //{id:'11',tallyNo:'C4919821',date:'14/12/23',lorryNo:'CHF7321',SCN:'22NBUF',WPENo:'WPE184804',DONo:'',TNNo:'',status:'completed'},
    //{id:'12',tallyNo:'B585105',date:'25/12/23',lorryNo:'AGC7321',SCN:'22NCFD',WPENo:'WPE184777',DONo:'',TNNo:'',status:'pending'},
    //{id:'13',tallyNo:'B585104',date:'26/12/23',lorryNo:'CJF7321',SCN:'22NBTW',WPENo:'WPE184578',DONo:'',TNNo:'',status:'completed'},
  ]
    

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dashboardService : DashboardService,
    ) {
      this.importForm = this.formBuilder.group({
        // scn: ['', Validators.required],
        // hatchNo: ['', Validators.required]
        scn: [null],
        hatchNo: [null]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.btn = params['btn'];
    })
    this.dashboardService.setListBtnBg();
  }

  edit(status:any){
    // this.router.navigate(['wpImport'], { queryParams: { mode:'edit' }});
    this.dashboardService.setAddBtnBg();
    this.router.navigate(['/core/wpImport'], { queryParams: { mode:'edit',btn:this.btn,status:status}});
  }

  add(){
    this.router.navigate(['/core/wpImport'], { queryParams: { mode:'add',btn:this.btn }});
  }

  // goToTS(){
  //   this.dashboardService.setAddBtnBg();
  //   this.router.navigate(['/core/wpImport'], { queryParams: { mode:'edit',btn:'TS',comeFrom:'TN'}});
  // }

  reset(){
    // have to clear all fields data
    this.scn = null;
    this.hatchNo = null;
  }

  // search(){
  //   if(this.searchValue){
  //     var arr = this.originalData.filter((item:any) => (item.tallyNo==this.searchValue || item.lorryNo==this.searchValue));
  //     this.data = arr;
  //   }
  //   else{
  //     this.data = _.cloneDeep(this.originalData);
  //   }
  // }

  search(){
    var searchResult : any[] = [];
    for(var i=0;i<=this.originalData.length-1;i++){
      if(this.originalData[i].tallyNo.toLowerCase().includes(this.searchValue.toLowerCase()) || this.originalData[i].lorryNo.toLowerCase().includes(this.searchValue.toLowerCase()) ){
        searchResult.push(this.originalData[i]);
      }
    }
    this.data = searchResult;
  }

  approve(id:any){
    //debugger
    // var index = _.findIndex(this.data, (user:any) => {
    //   return id == user.id;
    // });
    // if(index > -1) {
    //   this.data.splice(index, 1);
    // }
  }
  

  
 

}

