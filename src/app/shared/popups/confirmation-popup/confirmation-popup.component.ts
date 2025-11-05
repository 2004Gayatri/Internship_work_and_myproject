import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss'],
})
export class ConfirmationPopupComponent {
  msg: string = '';
  msgTitle: string = '';
  button1: any;
  button2: any;
  color: any;
  color2: any;
  showSuccessIcon: boolean = false;
  showConfirmationMessage:boolean = false;
  showSuccessMessage: boolean = false;
  showCloseIcon: boolean = false
  errorMsg:any = [];
  button3: any;
  action: any;
  observationActionStatus: any;
  observationId: any;
  button4: any;
  auditNumberId: any;
  auditActionStatus: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<ConfirmationPopupComponent>,public dialog: MatDialog,) { }

  ngOnInit() {
    console.warn(this.data);
    
    this.msgTitle = this.data?.msgTitle;
    this.msg = this.data?.msg;
    this.button1 = this.data?.btn1;
    this.button2 = this.data?.btn2;
    this.button3 = this.data?.btn3;
    this.color = this.data?.btn2BgColor;
    this.color2 = this.data?.btn3BgColor;
    this.showSuccessIcon = this.data?.showSuccessIcon;
    this.showConfirmationMessage = this.data?.showConfirmationMessage;
    this.showSuccessMessage = this.data?.showSuccessMessage;
    this.showCloseIcon = this.data?.showCloseIcon;
  }
  btn1Action(){
    this.dialogRef.close(false);
  }
  btn2Action(){
    this.dialogRef.close(true);
  }

  btn3Action(){
    this.dialogRef.close(true);
  }

  btnClick(){
    console.warn("clicked");
    
  }
}
