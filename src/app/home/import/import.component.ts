
import { Component, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationPopupComponent } from 'src/app/shared/popups/confirmation-popup/confirmation-popup.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';  // <-- Import ActivatedRoute here
import { SidebarService } from 'src/app/services/sidebar-service/sidebar.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.scss'],
})
export class ImportComponent implements OnInit {
  isCollapsed = false;
  @Input() gridData: {
    columnInfo: Array<{ label: string, propertyName: string, sortingName: string }>,
    columnData: Array<any>,
    totalCount: number,
    totalSubCount: number,
    totalTaskCount: number,
    totalNoOfPages: number,
    showCheckBox: boolean,
    showExportBtn: boolean,
    showGraphBtn: boolean,
    showSearchBar: boolean,
    showAddBtn: boolean,
    showDeleteBtn: boolean,
    taskTabsData: Array<any>,
    tabsData: Array<any>,
    tabsMainData: Array<any>,
    showPermantDeleteBtn: boolean,
    showRestoreBtn: boolean,
    currentPage: number,
    showTitle: boolean,
    showToggle: boolean,
    showBreadCrumbs: boolean,
    showAuditLog: boolean,
    showImportBtn: boolean,
    showBackBtn: boolean,
    showRefreshFunctinallity: boolean,
    subTabsData: Array<any>,
  } = {
    columnInfo: [], columnData: [], totalCount: 0, totalSubCount: 0, totalTaskCount: 0, totalNoOfPages: 0, 
    showCheckBox: false, showExportBtn: false, showGraphBtn: false, showSearchBar: false, showAddBtn: false, 
    showDeleteBtn: false, taskTabsData: [], tabsData: [], tabsMainData: [], showPermantDeleteBtn: false, 
    showRestoreBtn: false, currentPage: 0, subTabsData: [], showTitle: false, showToggle: false, 
    showBreadCrumbs: false, showAuditLog: false, showImportBtn: false, showBackBtn: false, 
    showRefreshFunctinallity: false
  };

  isChangeDetected: boolean = false;
  paginationUrl: any = null;
  selectedSizeToShowData: number = 25;
  searchString: any;
  showAddPopup: boolean = false;
  showDetailsPopup: boolean = false;
  isEditModeactive: boolean = false; 
  showListingPage: boolean = false;
  observationForm: FormGroup = new FormGroup({});
 
  getRenderData: any = [
    {
      'srNo': 1,
      'dateTime': '2025-01-30 | 10:30:00',
      'importedBy': 'Abhijeet Mandale',
      'totalImported': 50,
      'updated': 5,
      'added': 45,
      'skipped': 0
    },
    {
      'srNo': 2,
      'dateTime': '2025-01-30 | 11:00:00',
      'importedBy': 'Abhijeet Mandale',
      'totalImported': 40,
      'updated': 2,
      'added': 38,
      'skipped': 0
    }
  ];
  

  @ViewChild('browseImage') browseImage!: ElementRef;
  fileName: string = ''; 
  showHistoryTable: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private activatedroute: ActivatedRoute ,
    private sidebarservice : SidebarService,
  ) {
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
      } else if (params?.operation == 'show') {
        this.showAddPopup = false;
        this.showDetailsPopup = true;
        this.isEditModeactive = false;
        this.showListingPage = false;
      } else if (params?.operation == 'edit') {
        this.showAddPopup = true;
        this.showDetailsPopup = false;
        this.isEditModeactive = true;
        this.showListingPage = false;
      } else {
        this.showAddPopup = false;
        this.showDetailsPopup = false;
        this.isEditModeactive = false;
        this.showListingPage = true;
      }
    });

    this.addUserRecordForm();
    this.initializeColumn();
    this.renderData(this.getRenderData);
  }
  initializeColumn() {
    this.gridData.columnInfo = [];
    
    this.gridData.columnInfo.push({ label: 'Sr. No', propertyName: 'srNo', sortingName: 'srNo' });
    this.gridData.columnInfo.push({ label: 'Date & Time', propertyName: 'dateTime', sortingName: 'dateTime' });
    this.gridData.columnInfo.push({ label: 'Imported By', propertyName: 'importedBy', sortingName: 'importedBy' });
    this.gridData.columnInfo.push({ label: 'Total Imported', propertyName: 'totalImported', sortingName: 'totalImported' });
    this.gridData.columnInfo.push({ label: 'Updated', propertyName: 'updated', sortingName: 'updated' });
    this.gridData.columnInfo.push({ label: 'Added', propertyName: 'added', sortingName: 'added' });
    this.gridData.columnInfo.push({ label: 'Skipped', propertyName: 'skipped', sortingName: 'skipped' });
  }
  

  initializeTaskTabs(data: any) {
    this.gridData.subTabsData = [];
    for (let i = 0; i < data?.length; i++) {
      this.gridData.subTabsData.push({ label: data[i]?.label, totalCount: 0 });
    }
  }

  addRecord() {
    this.router.navigate(['import', { id: 0, operation: 'Add' }]);
  }

  addUserRecordForm() {
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
    });
  }

  backBtnImport() {
    this.modalCtrl.dismiss();
  }

  onClickImportHistory() {
    console.log('Import History Clicked');
    this.showHistoryTable = true; // Hide all and show table
  }

  downloadImportFile() {
    console.log('Downloading Import File Template');
    // Logic to download the file template
  }

  selectFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (this.validateFile(file)) {
        this.fileName = file.name; // Update file name
      } else {
        alert('Invalid file type. Please select an Excel file.');
        input.value = ''; // Reset input if invalid
        this.fileName = ''; // Reset file name
      }
    }
  }
  

  cancelFileUpload() {
    this.fileName = ''; // Reset the file selection
  }

  validateFile(file: File): boolean {
    const allowedExtensions = ['xls', 'xlsx'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    return fileExtension ? allowedExtensions.includes(fileExtension) : false;
  }

  openConfirmationPopup() {
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      disableClose: true,
      height: '30%',
      width: '30%',
      data: {
        
        msg: 'Data imported Successfully!',
        btn2: 'Done',
        showSuccessIcon: true,
        showConfirmationMessage: false,
        showSuccessMessage: false,
        showCloseIcon: true,
      },
    });

    // Listen for the dialog close event
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result === 'done') {
        console.log('Done Successfully');
      }
    });
  }

  renderData(listData: any) {
    this.gridData.columnData = [];
    this.gridData.columnData = listData;
  }
}
