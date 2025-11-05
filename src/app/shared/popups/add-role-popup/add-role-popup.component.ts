
import { Component, OnInit, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationPopupComponent } from 'src/app/shared/popups/confirmation-popup/confirmation-popup.component';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-add-role-popup',
  templateUrl: './add-role-popup.component.html',
  styleUrls: ['./add-role-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddRolePopupComponent implements OnInit, AfterViewChecked {
  roles = [
    'Employee',
    'HOD',
    'Safety Co-Ordinator',
    'Area In-Charge',
    'Operational Head',
    'Division Head',
    'Plant Head',
    'EHS Admin',
    'HR Admin',
  ];

  isEditModeactive: boolean = false;
  someCondition: boolean = true; // Condition to show Update button
  selectedRole: string = ''; // Default selected value
  roleForm: FormGroup;

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.roleForm = this.fb.group({
      userRole: [this.selectedRole, Validators.required],
    });
  }

  ngOnInit() {
    console.log('AddRolePopupComponent initialized');
  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();  // Trigger change detection manually
  }

  // Cancel action
  isCancleAddUser() {
    console.log("Cancel button clicked!");
    this.router.navigate(['/home/configrations/user-management']);
  }

  // Save action with confirmation dialog
  isSaveUsers() {
    console.log("Update button clicked!");  // Log to check if function is triggered

    const dialogRef = this.dialog.open(ConfirmationPopupComponent, {
      disableClose: true,
      height: '30%',
      width: '30%',
      data: {
        msg: 'Are you sure you want to update the selected records?',
        btn1: 'No',
        btn2: 'Yes',
        showSuccessIcon: false,
        showConfirmationMessage: true,
        showSuccessMessage: false,
        showCloseIcon: true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('User confirmed the action.');
      } else {
        console.log('User canceled the action.');
      }
    });
  }

  get userRole() {
    return this.roleForm.get('userRole');
  }
}
