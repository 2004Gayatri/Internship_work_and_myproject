import { Component } from '@angular/core';
import { SidebarService } from '../services/sidebar-service/sidebar.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  constructor(public sidebarservice: SidebarService ) {}

}
