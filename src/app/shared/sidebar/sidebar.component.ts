import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EncyptDecryptDataService } from 'src/app/services/encryptDecrypt/encypt-decrypt-data.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent  implements OnInit {
  loggedInUserRole:any;
  sidebarModule:any=[
    {
      moduleActiveIcon: '././assets/icon/dashboardWhiteIcon.png',
      moduleInactiveIcon: '././assets/icon/dashboardRedIcon.svg',
       ModuleName: 'Dashboard',
      routerName: '/home/dashboard'
    },
    {
      moduleActiveIcon: '././assets/icon/UAUCObservationsWhiteIcon.png',
      moduleInactiveIcon: '././assets/icon/UAUCObservationsRedIcon.svg',
      ModuleName: 'UA-UC-Observations',
      routerName: '/home/ua-uc-observations'
    },
 
   // {
      // moduleActiveIcon: '././assets/icon/IncidentInvestigationWhiteIcon.png',
      // moduleInactiveIcon: '././assets/icon/IncidentInvestigationRedIcon.svg',
      // ModuleName: 'Incident Investigation',
      // routerName: ''
   // },
    // {
    //   moduleActiveIcon: '././assets/icon/SafetyCommitteeMeetingWhiteIcon.png',
    //   moduleInactiveIcon: '././assets/icon/SafetyCommitteeMeetingRedIcon.svg',
    //   ModuleName: 'Safety Committee Meeting',
    //   routerName: ''
    // },
    // {
    //   moduleActiveIcon: '././assets/icon/EquipmentInspectionWhiteIcon.png',
    //   moduleInactiveIcon: '././assets/icon/EquipmentInspectionRedIcon.svg',
    //   ModuleName: 'Equipment Inspection',
    //   routerName: ''
    // },
    // {
    //   moduleActiveIcon: '././assets/icon/EHSTrainingWhiteIcon.png',
    //   moduleInactiveIcon: '././assets/icon/EHSTrainingRedIcon.svg',
    //   ModuleName: 'EHS Training',
    //   routerName: ''
    // },
    // {
    //   moduleActiveIcon: '././assets/icon/HazardIdentificationWhiteIcon.png',
    //   moduleInactiveIcon: '././assets/icon/HazardIdentificationRedIcon.svg',
    //   ModuleName: 'Hazard Identification',
    //   routerName: ''
    // },
    // {
    //   moduleActiveIcon: '././assets/icon/WorkPermitWhiteIcon.png',
    //   moduleInactiveIcon: '././assets/icon/WorkPermitRedIcon.svg',
    //   ModuleName: 'Work Permit',
    //   routerName: ''
    // },
  ]
  configModule = [
    {
      moduleActiveIcon: '././assets/icon/userManagementWhiteIcon.png',
      moduleInactiveIcon: '././assets/icon/userManagementRedIcon.svg',
      ModuleName: 'User Management',
      routerName: '/home/configrations/user-management'
    },
    // {
    //   moduleActiveIcon: '././assets/icon/UAUCConfigWhiteIcon.png',
    //   moduleInactiveIcon: '././assets/icon/UAUCConfigRedIcon.svg',
    //   ModuleName: 'UA/UC Configuration',
    //   routerName: '/home/configrations/UAUCConfiguration-dashboard'
    // },
    // {
    //   moduleActiveIcon: '././assets/icon/passwordPloicyWhite.png',
    //   moduleInactiveIcon: '././assets/icon/password.svg',
    //   ModuleName: 'Password Policy',
    //   routerName: '/home/configrations/password-policy'
    // },
    // {
    //   moduleActiveIcon: '././assets/icon/autoMailWhite.png',
    //   moduleInactiveIcon: '././assets/icon/auto_mail_alert.svg',
    //   ModuleName: 'Auto Mail Alerts',
    //   routerName: '/home/configrations/auto-mail-alert'
    // },
    // {
    //   moduleActiveIcon: '././assets/icon/emailManagementWhite.png',
    //   moduleInactiveIcon: '././assets/icon/emailManagement.svg',
    //   ModuleName: 'Email Management',
    //   routerName: '/home/configrations/email-management'
    // },
  ]
  showConfigMenu: boolean = false;
  constructor(public router: Router, private encyptDecryptData:EncyptDecryptDataService) { 
    this.loggedInUserRole = sessionStorage.getItem('loggedInUserRole');
    if(this.loggedInUserRole){
      this.loggedInUserRole = this.encyptDecryptData.decryptData(this.loggedInUserRole);
    }
  }

  

  ngOnInit() {
    if(this.loggedInUserRole == 'EHS Admin' || this.loggedInUserRole == 'IT Admin'){
      this.sidebarModule.push({
        moduleActiveIcon: '././assets/icon/recycle_white.svg',
        moduleInactiveIcon: '././assets/icon/recyclebin.svg',
        ModuleName: 'Recycle Bin',
        routerName: '/home/recycle-bin'
      })
    }
    if(this.loggedInUserRole == 'IT Admin'){
      this.configModule = [
        {
          moduleActiveIcon: '././assets/icon/userManagementWhiteIcon.png',
          moduleInactiveIcon: '././assets/icon/userManagementRedIcon.svg',
          ModuleName: 'User Management',
          routerName: '/home/configrations/user-management'
        },
        {
          moduleActiveIcon: '././assets/icon/UAUCConfigWhiteIcon.png',
          moduleInactiveIcon: '././assets/icon/UAUCConfigRedIcon.svg',
          ModuleName: 'UA/UC Configuration',
          routerName: '/home/configrations/UAUCConfiguration-dashboard'
        },
        {
          moduleActiveIcon: '././assets/icon/passwordPloicyWhite.png',
          moduleInactiveIcon: '././assets/icon/password.svg',
          ModuleName: 'Password Policy',
          routerName: '/home/configrations/password-policy'
        },
        {
          moduleActiveIcon: '././assets/icon/autoMailWhite.png',
          moduleInactiveIcon: '././assets/icon/auto_mail_alert.svg',
          ModuleName: 'Auto Mail Alerts',
          routerName: '/home/configrations/auto-mail-alert'
        },
        {
          moduleActiveIcon: '././assets/icon/emailManagementWhite.png',
          moduleInactiveIcon: '././assets/icon/emailManagement.svg',
          ModuleName: 'Email Management',
          routerName: '/home/configrations/email-management'
        },
      ]
    }
    if(this.loggedInUserRole == 'EHS Admin'){
      this.configModule = [
        {
          moduleActiveIcon: '././assets/icon/userManagementWhiteIcon.png',
          moduleInactiveIcon: '././assets/icon/userManagementRedIcon.svg',
          ModuleName: 'User Management',
          routerName: '/home/configrations/user-management'
        },
        {
          moduleActiveIcon: '././assets/icon/UAUCConfigWhiteIcon.png',
          moduleInactiveIcon: '././assets/icon/UAUCConfigRedIcon.svg',
          ModuleName: 'UA/UC Configuration',
          routerName: '/home/configrations/UAUCConfiguration-dashboard'
        },
      ]
    }
  }
  ionViewWillEnter() {
    this.loggedInUserRole = sessionStorage.getItem('loggedInUserRole');
    if(this.loggedInUserRole){
      this.loggedInUserRole = this.encyptDecryptData.decryptData(this.loggedInUserRole);
    }
  }
  onModuleClick(item:any){
    // if(item.ModuleName=='UA/UC Observations'){
    //   if(this.loggedInUserRole=='HOD' || this.loggedInUserRole=='Safety Coordinator'){
    //     this.router.navigate(['/home/uauc-home']);
    //   }else{
    //     this.router.navigate(['/home/UAUC-Observations']);
    //   }
    // }else{
      this.router.navigate([item?.routerName]);
    // }
  }
  onClickshowConfigMenu(){
    this.showConfigMenu = !this.showConfigMenu;
  }
}
