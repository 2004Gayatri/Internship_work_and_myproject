
import { Component, NgModule, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar-service/sidebar.service';

@Component({
  selector: 'app-ua-uc-observations',
  templateUrl: './ua-uc-observations.component.html',
  styleUrls: ['./ua-uc-observations.component.scss'],
})

export class UAUCObservationsComponent implements OnInit {
  selectedSafeUnsafe: string  = 'unsafe-act'//Default value for active abutton
  selectedStatus: string  = 'pending'; //Optional: Default status if needed
  isCollapsed = false;
  
  constructor(private router: Router,private sidebarService: SidebarService) {
    this.sidebarService.isCollapsed$.subscribe(state => {
      this.isCollapsed = state;
    });
  }
  // Method to refresh the route
  // refreshComponent(operation:any) {
  // console.log(operation);
  
  //   this.router.navigate(['ua-uc-observations', {operation:operation}]);
  //   // alert("Navigated successfully !")
  // }
  refreshComponent(operation: any) {
    console.log(operation);
    
    // Use queryParams for passing parameters
    this.router.navigate(['ua-uc-observations'], { queryParams: { operation: operation } });
    alert("Navigated successfully")
  }
  ngOnInit() { }

  onSafeUnsafeClick(value: string): void {
    this.selectedSafeUnsafe = value;// Update active button
  }
  onStatusClick(value: string): void {
    this.selectedStatus = value ; // Update active status

  }
}
