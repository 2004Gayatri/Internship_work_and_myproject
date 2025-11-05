import { Component, Directive, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddRolePopupComponent } from 'src/app/shared/popups/add-role-popup/add-role-popup.component';
import { ConfirmationPopupComponent } from 'src/app/shared/popups/confirmation-popup/confirmation-popup.component';
import { SidebarService } from 'src/app/services/sidebar-service/sidebar.service';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  gridData: {
    columnInfo: Array<{ label: string, propertyName: string, sortingName: string }>,
    columnData: Array<any>,
    totalCount: number,
    totalSubCount: number,
    totalTaskCount: number,
    totalNoOfPages: number,
    showCheckBox: boolean
    showExportBtn: boolean,
    showGraphBtn: boolean
    showSearchBar: boolean,
    showAddBtn: boolean,
    currentPage: number,
    showDeleteBtn: boolean,
    taskTabsData: Array<any>,
    tabsData: Array<any>,
    tabsMainData: Array<any>,
    showAccessConfigBtn: boolean,
    showTitle: boolean,
    showBreadCrumbs: boolean,
    showAuditLog: boolean,
    showPermantDeleteBtn: boolean,
    showRestoreBtn: boolean,
    showImportBtn: boolean,
    showBackBtn: boolean,
    showRefreshFunctinallity: boolean,
    showToggle: boolean,
    subTabsData: Array<any>,
  } = {
      columnInfo: [], columnData: [], totalCount: 0, totalSubCount: 0, totalTaskCount: 0, totalNoOfPages: 0, showCheckBox: true, showExportBtn: false,
      showGraphBtn: false, showSearchBar: true, showAddBtn: true, currentPage: 0, showDeleteBtn: true, taskTabsData: [], subTabsData: [],
      tabsData: [], tabsMainData: [], showAccessConfigBtn: false, showTitle: true, showBreadCrumbs: false, showAuditLog: false,
      showPermantDeleteBtn: false, showRestoreBtn: false, showImportBtn: true, showBackBtn: false,
      showRefreshFunctinallity: true, showToggle: true,
    };

    subTabsData:any = [
      { label: 'All', totalCount: 0 },
      { label: 'Employee', totalCount: 0 },
      { label: 'HOD', totalCount: 0 },
      { label: 'Saftey Coordinator', totalCount: 0 },
      { label: 'Area-In-Change', totalCount: 0 },
      { label: 'Operation-Head', totalCount: 0 },
      { label: 'Division-Head', totalCount: 0 },
      { label: 'Plant-Head', totalCount: 0 },
      { label: 'EHS Admin', totalCount: 0 },
    ];

  isChangeDetected: boolean = false;
  paginationUrl: any = null;
  selectedSizeToShowData: number = 25;
  searchString:any
  showAddPopup: boolean = false;
  showDetailsPopup: boolean = false;
  isEditModeactive: boolean = false;
  showListingPage: boolean = true;
  observationForm: FormGroup = new FormGroup({});
  isCollapsed = false;
  getRenderData:any = [
    {
      'id': '001',
      'empCode': 'THZ001',
      'name': "Ajinkay Patil",
      'userType': 'HOD',
      'div': 'Rubber',
      'plant': 'pune',
      'department' :'department 1',
      'email': 'demo@gmail.com',
      'uaExampt': true,
      'status': 'Active'
    }
  ]
 constructor(private router:Router, private activatedroute:ActivatedRoute, private fb:FormBuilder,
   public dialog: MatDialog,private sidebarservice : SidebarService,
 ){
  this.sidebarservice.isCollapsed$.subscribe(state => {
    this.isCollapsed = state;
  });
 }
 ngOnInit() {

  this.activatedroute.params.subscribe((params: any) => {
    if (params?.operation == 'Add') {
      this.showAddPopup = true;
      this.showDetailsPopup = false;
      this.isEditModeactive = false;
      this.showListingPage = false;
    }else if (params?.operation == 'show') {
      this.showAddPopup = false;
      this.showDetailsPopup = true;
      this.isEditModeactive = false;
      this.showListingPage = false;

    }else if (params?.operation == 'edit') {
      this.showAddPopup = true;
      this.showDetailsPopup = false;
      this.isEditModeactive = true;
      this.showListingPage = false;

    }else{
      this.showAddPopup = false
      this.showDetailsPopup = false;
      this.isEditModeactive = false;
      this.showListingPage = true;

    }
  })

  this.addUserRecordForm()
  this.initilaizeColumn();
  this.initilaizeTaskTabs(this.subTabsData);
  
  this.randerData(this.getRenderData)
 }

 navigateToImport(){
  this.router.navigate(['import']);
 }
 
 initilaizeColumn() {
  this.gridData.columnInfo = [];
  this.gridData.columnInfo.push({ label: 'Emp Code', propertyName: 'empCode', sortingName: 'id' });
  this.gridData.columnInfo.push({ label: 'Name', propertyName: 'name', sortingName: 'observationNumber' });
  this.gridData.columnInfo.push({ label: 'User Type', propertyName: 'userType', sortingName: 'createdAt' });
  this.gridData.columnInfo.push({ label: 'Div.', propertyName: 'div', sortingName: 'createdBy' });
  this.gridData.columnInfo.push({ label: 'Plant', propertyName: 'plant', sortingName: 'dateOfObservation' });
  this.gridData.columnInfo.push({ label: 'Dept.', propertyName: 'department', sortingName: 'departments' });
  this.gridData.columnInfo.push({ label: 'Email', propertyName: 'email', sortingName: 'plantName' });
  this.gridData.columnInfo.push({ label: 'UA. Exampt', propertyName: 'uaExampt', sortingName: 'location' });
  this.gridData.columnInfo.push({ label: 'Status', propertyName: 'status', sortingName: 'userStatus' });
}



initilaizeTaskTabs(data: any) {
  this.gridData.subTabsData = [];
  for (let i = 0; i < data?.length; i++) {
    this.gridData.subTabsData.push({ label: data[i]?.label, totalCount: 0 });
  }
}

addRecord() {
      this.router.navigate(['/home/configrations/user-management', { id: 0, operation: 'Add' }]);
}

addUserRecordForm(){
  this.observationForm = this.fb.group({
    employeeCode: [{ value: '', disabled: false }, Validators.required],
    firstName: [{ value: '', disabled: false }, Validators.required],
    lastName: [{ value: '', disabled: false }, Validators.required],
    email: [{ value: '', disabled: false }],
    userRole: [{ value: '', disabled: false }, Validators.required],
    division: [{ value: '', disabled: false }, Validators.required],
    divisionCategoray: [{ value: '', disabled: false }],
    plant: [{ value: '', disabled: false }, Validators.required],
    department: [{ value: '', disabled: false }, Validators.required],
    designation: [{ value: '', disabled: false }],
    employeeExitDate: [{ value: '', disabled: false }],
    employeeJoiningDate: [{ value: '', disabled: false }, Validators.required],
    userCategory: [{ value: '', disabled: false }, Validators.required],
    employeeStatus: [{ value: '', disabled: false }],
  })
}

isSaveUsers(){
  const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
    disableClose: true,
    height: '30%',
    width: '30%',
    data: {
      msg: 'Are you sure you want to delete the selected records?',
      btn1: 'No',
      btn2: 'Yes',
      showSuccessIcon: false,
      showConfirmationMessage: true,
      showSuccessMessage: false,
      showCloseIcon: true,
    },
  });
  dialogRef.afterClosed().subscribe((result: any) => {
  })
}

isCancleAddUser(){
  this.router.navigate(['/home/configrations/user-management']);
}

showDatails(data:any){
  let id = data.find((item: any) => item.key == 'id').value;
  this.router.navigate(['/home/configrations/user-management', { id: id, operation: 'show' }]);
}

onClickEdit(){
  this.router.navigate(['/home/configrations/user-management', { id: 0, operation: 'edit' }]);
}

isUpdateUsers(){

}

isEditUserRole(){
  const successdialogRef = this.dialog.open(AddRolePopupComponent, {
    disableClose: true,
    height: '30%',
    width: '80%',
    data: {},
  });
  successdialogRef.afterClosed().subscribe(result => {
  });
}

randerData(listData:any){
this.gridData.columnData = [];
this.gridData.columnData = listData
}
}

