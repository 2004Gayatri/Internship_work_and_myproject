import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar-service/sidebar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent  implements OnInit {
  isCollapsed = false;
All: any;
Metal: any;
Rubber: any;
  constructor(private sidebarservice : SidebarService) { }
  @Input() selectedRange: string = 'All';
  @Output() showNumberOfRecordsEmmiter = new EventEmitter<any>();

  ngOnInit() {
    this.sidebarservice.isCollapsed$.subscribe(state => {
      this.isCollapsed = state;
    });
    
  }
  
  onSelectCount(data: any) {
    this.showNumberOfRecordsEmmiter.emit(data?.value);
  }
  color="red";

}
