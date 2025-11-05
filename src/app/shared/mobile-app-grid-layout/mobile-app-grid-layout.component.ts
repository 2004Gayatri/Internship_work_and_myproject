import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Config } from 'src/app/app-constant';
import { HttpService } from 'src/app/services/http/http.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-mobile-app-grid-layout',
  templateUrl: './mobile-app-grid-layout.component.html',
  styleUrls: ['./mobile-app-grid-layout.component.scss'],
})
export class MobileAppGridLayoutComponent implements OnInit {
  @Input() gridMobileData: {
    columnInfo: Array<{ label: string, propertyName: string, }>,
    columnData: Array<any>,
    totalCount: number,
    totalNoOfPages: number,
    showExportBtn: boolean,
    showSearchBar: boolean,
    showDateRange: boolean,
    showFilterBtn: boolean,
    showAddBtn: boolean,
    showDeleteBtn: boolean,
    currentPage: number,
    showTitle: boolean,
    showBackBtn: boolean,
  } = {
      columnInfo: [], columnData: [], totalCount: 0, totalNoOfPages: 0, showExportBtn: false,
      showSearchBar: false, showDateRange: false, showFilterBtn: false, showAddBtn: false,
      showDeleteBtn: false, currentPage: 0, showTitle: false, showBackBtn: false,
    };
  @Input() TableName = '';
  @Input() searchText: any;
  @Input() isChangeDetected: boolean = false;

  @Input() filterStartDate: any = 0;
  @Input() filterEndDate: any = 0;
  @Output() changeEmmiter = new EventEmitter<any>();

  @Output() addNewRecordEmmiter = new EventEmitter<any>();
  @Output() backBtnClickEmmiter = new EventEmitter<any>();
  @Output() searchDataEmitter = new EventEmitter<any>();
  @Output() paginationDataEmmiter = new EventEmitter<any>();
  @Output() typeTabEmmiter = new EventEmitter<any>();
  @Output() statusTabEmmiter = new EventEmitter<any>();
  @Output() detailsEmmiter = new EventEmitter<any>();
  @Output() startDateEmmiter = new EventEmitter<any>();
  @Output() endDateEmmiter = new EventEmitter<any>();
  @Output() typeTaskEmmiter = new EventEmitter<any>();

  renderData: Array<any> = [];
  currentPage: number = 1;
  page: any = 0;
  selectedValue: any = 'Unsafe Act';
  selectedStatus: any = 'Open';
  selectedIncidentStatus: any = 'Acceptance Review';
  hide: boolean = false;
  selectedTask: any = 'My Task';
  isChecked: boolean = true;
  constructor(private httpService: HttpService, private config: Config, private datePipe: DatePipe, public fb: FormBuilder, public router: Router, private location: Location) { }

  ngOnInit() {
    if (this.router.url == '/home/audit-log') {
      this.gridMobileData.showDateRange == false;
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    this.renderColumnData();
  }
  private renderColumnData() {
    this.renderData = this.gridMobileData.columnData.map(dataItem => {
      return Object.entries(dataItem).map(([key, value]) => {
        // Find the corresponding label for the current key
        const labelObj = this.gridMobileData.columnInfo.find(info => info.propertyName === key);
        const label = labelObj ? labelObj.label : undefined;

        // Return the combined object with key, value, and label
        return { key, value, label };
      });
    });
  }
  onClickAddNewRecord() {
    this.addNewRecordEmmiter.emit();
  }
  onBackBtnClick() {
    this.backBtnClickEmmiter.emit();
  }
  onSearch() {
    this.searchDataEmitter.emit(this.searchText);
  }

  showDetails(data: any) {
    this.detailsEmmiter.emit(data);
  }

  onIonInfiniteScroll(infiniteScroll: any) {
    setTimeout(() => {
      if (this.currentPage >= this.gridMobileData.totalNoOfPages) {
        return;
      }
      if (this.currentPage == 1) {
        this.page = 1;
      } else {
        this.page++;
      }
      this.currentPage++;
      this.paginationNextOrPrevious();
      infiniteScroll.target.complete();
    }, 3000);
  }
  paginationNextOrPrevious() {
    localStorage.setItem('currentPageNumber', this.page)
    this.paginationDataEmmiter.emit(this.page);
  }
  onClickTasks(event: any) {
    this.typeTaskEmmiter.emit(event);
  }

  onClickType(event: any) {
    this.typeTabEmmiter.emit(event);
  }

  onClickStatus(event: any) {
    this.statusTabEmmiter.emit(event);
  }

  onClickIncidentStatus(event: any) {
    this.typeTabEmmiter.emit(event);
  }

  filterByStartDate(event: any) {
    this.startDateEmmiter.emit(event.value);
  }
  filterByEndDate(event: any) {
    this.endDateEmmiter.emit(event.value);
  }

  onChangeToggle(event: any) {
    const data = event.checked;
    this.changeEmmiter.emit(data);
  }
}
