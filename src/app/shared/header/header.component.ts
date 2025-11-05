import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth/auth.service';
import { ConfirmationPopupComponent } from '../popups/confirmation-popup/confirmation-popup.component';
import { EncyptDecryptDataService } from 'src/app/services/encryptDecrypt/encypt-decrypt-data.service';
import { HttpService } from 'src/app/services/http/http.service';
import { Config } from 'src/app/app-constant';
import { SidebarService } from 'src/app/services/sidebar-service/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userName: any;
  loggedInUserRole: any;
  iconName: any;
  loggedInUserDeptName: any;
  constructor(private authService : AuthService,private router: Router, public dialog: MatDialog,private encyptDecryptData:EncyptDecryptDataService,
    private httpService: HttpService, private config: Config,private sidebarservice: SidebarService) { }

  ngOnInit() {
    this.userName = sessionStorage.getItem('loggedInUser');
    this.loggedInUserDeptName = sessionStorage.getItem('department')
    this.loggedInUserRole = sessionStorage.getItem('loggedInUserRole');
    if(this.loggedInUserRole){
      this.loggedInUserRole = this.encyptDecryptData.decryptData(this.loggedInUserRole);
    }
    this.iconName = this.userName?.split(/\s/).reduce((response: any, word: any) => response += word.slice(0, 1), '');
    this.iconName?.toLocaleUpperCase();
  }
  ionViewWillEnter() {
    this.userName = sessionStorage.getItem('loggedInUser');
    this.loggedInUserDeptName = sessionStorage.getItem('department')
    this.loggedInUserRole = sessionStorage.getItem('loggedInUserRole');
    if(this.loggedInUserRole){
      this.loggedInUserRole = this.encyptDecryptData.decryptData(this.loggedInUserRole);
    }
    this.iconName = this.userName?.split(/\s/).reduce((response: any, word: any) => response += word.slice(0, 1), '');
    this.iconName?.toLocaleUpperCase();  
  }
  signOut() {
    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      disableClose: true,
      height: '25%',
      width: '30%',
      data: {
        msg: 'Do you really want to Log Out?',
        btn1: 'No',
        btn2: 'Yes',
        btn2BgColor: '#CC0000',
        showSuccessIcon: false,
        showSuccessMessage: false,
        showCloseIcon: false
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // const request = {
        //   "deviceId": null,
        //   "refreshToken":  sessionStorage.getItem('refreshToken')
        // }
        // this.httpService.callPostService(this.config.logout, request).subscribe((res: any) => {

        // });
        // sessionStorage.removeItem('currentToken');
        // sessionStorage.removeItem('refreshToken');
        // sessionStorage.removeItem('loggedInUserId');
        // sessionStorage.removeItem('loggedInUser');
        // sessionStorage.removeItem('department')
        // this.router.navigate(['/login']);
        // setTimeout(() =>
        // {
        //   location.reload();
        // },
        // 5);
      }
    })
  }
  goToActivityLog(){
    this.router.navigate(['/home/activity-log']);
  }
  goToDashboard(){
    this.router.navigate(['/home/dashboard']);
  }
  changePassword(){
    this.router.navigate(['/login/update-password',{operation:"Change"}]);
  }

  onClickSidebarIcon(){
    this.sidebarservice.onClickSidebarIcon();
  }
}
