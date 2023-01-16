import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { DashboardService } from '../services/dashboard.service';


@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {
  refresh: Subscription;
  refresh1: Subscription;

  constructor(
    private router: Router,
    private dashboardService : DashboardService,
  ) {
    this.refresh = this.dashboardService.refreshListBtnBg$.subscribe(() => {
      var element1 = document.getElementById("list");
      element1?.classList.add("bg-color-blue");
    });
    this.refresh1 = this.dashboardService.refreshAddBtnBg$.subscribe(() => {
      var element1 = document.getElementById("list");
      element1?.classList.remove("bg-color-blue");
      var element2 = document.getElementById("add");
      element2?.classList.add("bg-color-blue");
    });
   }

  ngOnInit(): void {
  }

  listView(){
    this.router.navigate(['/core/wpApprove']);
    var element1 = document.getElementById("list");
    element1?.classList.add("bg-color-blue");
    var element2 = document.getElementById("add");
    element2?.classList.remove("bg-color-blue");
  }

  addView(){
    this.router.navigate(['/core/wpImport'], { queryParams: { mode:'add' }}); 
    var element1 = document.getElementById("list");
    element1?.classList.remove("bg-color-blue");
    var element2 = document.getElementById("add");
    element2?.classList.add("bg-color-blue");
  }

  ngOnDestroy(){
    this.refresh.unsubscribe();
    this.refresh1.unsubscribe();
  }

}
