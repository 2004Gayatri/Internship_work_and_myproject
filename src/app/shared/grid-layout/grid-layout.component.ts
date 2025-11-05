import { DatePipe } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Config } from 'src/app/app-constant';
import { HttpService } from 'src/app/services/http/http.service';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';
import { SidebarService } from 'src/app/services/sidebar-service/sidebar.service';


@Component({
  selector: 'app-grid-layout',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.scss'],
})
export class GridLayoutComponent implements OnInit {
  @Input() gridData: {
    columnInfo: Array<{ label: string, propertyName: string, }>,
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
      columnInfo: [], columnData: [], totalCount: 0,totalSubCount:0,totalTaskCount:0, totalNoOfPages: 0, showCheckBox: false, showExportBtn: false,
      showGraphBtn: false, showSearchBar: false, showAddBtn: false, showDeleteBtn: false, taskTabsData: [], tabsData: [], tabsMainData: [],
      showPermantDeleteBtn: false, showRestoreBtn: false, currentPage: 0, subTabsData: [],
      showTitle: false,  showToggle: false, showBreadCrumbs: false, showAuditLog: false, showImportBtn: false,
      showBackBtn: false, showRefreshFunctinallity: false
    };
  
  @Input() TableName = '';
  @Input() auditLogName = '';
  @Input() paginationUrl: string = '';
  @Input() isChangeDetected: boolean = false;
  @Input() selectedRange: any = 25;
  @Input() searchText: any;
  @Input() observationNumber: any = null;
  @Input() selectedStatusTabIndex: any = 0;
  @Input() selectedTypeTabIndex: any = 0;
  @Input() selectedTaskTabIndex: any = 0;
  
  @Output() deleteDetailEmmiter = new EventEmitter<any>();
  @Output() editDetailEmmiter = new EventEmitter<any>();
  @Output() searchDataEmitter = new EventEmitter<any>();
  @Output() sortAsendingEmmiter = new EventEmitter<any>();
  @Output() sortDesendingEmmiter = new EventEmitter<any>();
  @Output() graphEmmiter = new EventEmitter<any>();
  @Output() exportEmmiter = new EventEmitter<any>();
  @Output() importEmmiter = new EventEmitter<any>();
  @Output() emmitPagination = new EventEmitter<any>();
  @Output() detailsEmmiter = new EventEmitter<any>();
  @Output() detailsWithColumn = new EventEmitter<any>();
  @Output() addRecordEmmiter = new EventEmitter<any>();
  @Output() applyFilterEmmiter = new EventEmitter<any>();
  @Output() deleteMultipleRecordsEmmiter = new EventEmitter<any>();
  @Output() restoreRecordsEmmiter = new EventEmitter<any>();
  @Output() paginationDataEmmiter = new EventEmitter<any>();
  @Output() showNumberOfRecordsEmmiter = new EventEmitter<any>();
  @Output() refreshDataEmmiter = new EventEmitter<any>();
  @Output() typeTabEmmiter = new EventEmitter<any>();
  @Output() typeTaskEmmiter = new EventEmitter<any>();
  @Output() changeEmmiter = new EventEmitter<any>();
  @Output() statusTabEmmiter = new EventEmitter<any>();
  @Output() importFileEmmiter = new EventEmitter<any>();

  selectedDate: any = moment();
  renderData: Array<any> = [];
  selectAllCheckbox: boolean = false;
  mulipleSelect: any = [];
  deltetedDatacount: number = 0;
  currentPage: number = 1;
  page: any = 0;
  loggedInUserRole: any;
  @ViewChild('allSelected') allSelected: any;
  sidebarModule: any = [];
  isAddFlag: boolean = true;
  isEditFlag: boolean = true;
  isPerDeleteFlag: boolean = true;
  showDelete: boolean = false;
  activeTab: any;
  isChecked: boolean = true;
  isCollapsed = false;
  constructor(private httpService: HttpService, private config: Config, private datePipe: DatePipe, public fb: FormBuilder, public router: Router, private location: Location,private navCtrl: NavController , private sidebarservice : SidebarService) { 
    this.sidebarservice.isCollapsed$.subscribe(state => {
      this.isCollapsed = state;
    });
  }
  

  ngOnChanges(changes: SimpleChanges) {
    //console.log(this.gridData.columnData)
    this.selectAllCheckbox = false;
    this.mulipleSelect = [];
    this.renderColumnData();
    this.sidebarModule = JSON.parse(localStorage.getItem('pemissionModules')!);
    for (let i = 0; i < this.sidebarModule?.length; i++) {
      if (this.sidebarModule[i]?.routerName == this.router.url) {
        this.isAddFlag = this.sidebarModule[i]?.isAdd;
        this.isEditFlag = this.sidebarModule[i]?.isEdit;
        this.isPerDeleteFlag = this.sidebarModule[i]?.isPerDeleted;
      }
    }
  }
  ngOnInit() {
    // this.loggedInUserRole = localStorage.getItem('loggedInUserRole');
    // this.loggedInUserRole = this.encyptDecryptData.decryptData(this.loggedInUserRole);
    if (this.loggedInUserRole == 'HOD') {
      this.gridData.showAddBtn == false
    }
  }
  onSelectCount(data: any) {
    this.showNumberOfRecordsEmmiter.emit(data?.value);
  }
  private renderColumnData() {
    this.renderData = [];
    for (let i = 0; i < this.gridData.columnData.length; i++) {
      var output = Object.entries(this.gridData.columnData[i]).map(([key, value]) => ({ key, value }));
      this.renderData.push(output);
      this.renderData[i].checkboxCheck = false;
    }
    this.currentPage = this.gridData.currentPage + 1 | 0;
    //console.log(this.renderData)
  }
  selectALLRecords(event: any) {
    if (event.checked) {
      this.showDelete = true;
      for (let i = 0; i < this.renderData.length; i++) {
        this.renderData[i].checkboxCheck = true;
        this.selectAllCheckbox = true;
        this.mulipleSelect.push(this.renderData[i])
      }
    } else {
      this.showDelete = false;
      for (let i = 0; i < this.renderData.length; i++) {
        this.renderData[i].checkboxCheck = false;
        this.mulipleSelect = [];
        this.selectAllCheckbox = false;
      }
    }
  }
  selectSingleRecord(event: any, data: any, i: number) {
    console.log(data)
    if (event.checked) {
      this.showDelete = true;
      this.renderData[i].checkboxCheck = true;
      this.deltetedDatacount++;
      this.mulipleSelect.push(data);
    } else {
      this.showDelete = false;
      this.renderData[i].checkboxCheck = false;
      this.deltetedDatacount--;
      this.mulipleSelect.forEach((ele: any, ind: any) => {
        if (ele.checkboxCheck == false) {
          this.mulipleSelect.splice(ind, 1);
        }
      })
      if (this.deltetedDatacount == 0) {
        this.mulipleSelect = [];
      }
      this.selectAllCheckbox = false;
    }
  }
  deleteMultipleRecords() {
    this.deleteMultipleRecordsEmmiter.emit(this.mulipleSelect);
  }
  restoreData() {
    this.restoreRecordsEmmiter.emit(this.mulipleSelect);
  }
  public showSpecificButtons(data: any, compareValue: string): boolean {
    return (data.value as string).includes(compareValue);
  }
  onSearch() {
    this.searchDataEmitter.emit(this.searchText);
  }
  exportReport() {
    this.exportEmmiter.emit();
  }
  importReport() {
    this.importFileEmmiter.emit();
    this.navCtrl.navigateForward('/home/import'); //this is a path that helps to navigate to import component
  }
  garaphReport() {
    this.graphEmmiter.emit();
  }
  addRecord() {
    this.addRecordEmmiter.emit();
  }
  editDetail(data: any) {
    this.editDetailEmmiter.emit(data);
  }
  deleteDetail(data: any) {
    this.deleteDetailEmmiter.emit(data);
  }
  onSortAssending(data: any) {
    this.sortAsendingEmmiter.emit(data);
  }
  onSortDesending(data: any) {
    this.sortDesendingEmmiter.emit(data);
  }
  applyFilter() {
    this.applyFilterEmmiter.emit();
  }
  previousPage() {
    if (this.currentPage < 2) {
      return;
    } else {
      this.currentPage--;
      this.page--;
      this.paginationNextOrPrevious();
    }
  }
  nextPage() {
    if (this.currentPage >= this.gridData.totalNoOfPages) {
      return;
    }
    if (this.currentPage == 1) {
      this.page = 1;
    } else {
      this.page++;
    }
    this.currentPage++;
    this.paginationNextOrPrevious();
  }
  paginationNextOrPrevious() {
    localStorage.setItem('currentPageNumber', this.page)
    this.paginationDataEmmiter.emit(this.page);
  }
  showDetailsWithColumn(data: any, colName: any) {
    let details = {
      data: data,
      colName: colName
    }
    this.detailsWithColumn.emit(details)
  }
  showDatails(data: any) {
    this.detailsEmmiter.emit(data);
  }
  onClickConfig() {
    this.router.navigate(['/home/configrations/configuration-dashboard']);
  }
  onClickConfigName() {
  }
  onClickDelete() {
    this.deleteMultipleRecordsEmmiter.emit(this.mulipleSelect);
  }

  refreshData() {
    this.refreshDataEmmiter.emit();
  }
  backBtn() {
    this.location.back()
  }
  tabStatusChanged(event: any) {
    this.statusTabEmmiter.emit(event);
  }
  // tabTypeChanged(event: any) {
  //   this.typeTabEmmiter.emit(event);
  // }

  tabTaskChanged(event: any) {
    this.typeTaskEmmiter.emit(event);
  }

  onChangeToggle(event: any) {
    const data = event.checked;
    this.changeEmmiter.emit(data);
  }

  @ViewChild('tabsWrapper', { static: false }) tabsWrapper: ElementRef | undefined;

 
 scrollTabs(direction: 'left' | 'right') {
    if (!this.tabsWrapper) return;

    const wrapper = this.tabsWrapper.nativeElement;
    const scrollAmount = wrapper.clientWidth * 0.8; 

    if (direction === 'left') {
      wrapper.scrollLeft -= scrollAmount;
    } else {
      wrapper.scrollLeft += scrollAmount;
    }
  } 

 tabTypeChanged(item: any, index: number) {
    this.selectedTypeTabIndex = index; 
    const eventData = { tab: item, index: index };
    this.typeTabEmmiter.emit(eventData);

  }
}
