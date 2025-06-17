import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FormData } from '../../../services/form-data';
import { CanComponentDeactivate } from '../../../guards/form-save-guard';

@Component({
  selector: 'app-phone-details',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './phone-details.html',
  styleUrl: './phone-details.scss'
})
export class PhoneDetails implements OnInit, CanComponentDeactivate {
  phoneForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formDataService: FormData,
    private router: Router
  ) {
    this.phoneForm = this.fb.group({
      phone: ['', Validators.required],
      mobile: [''],
      workPhone: [''],
      emergencyContact: ['']
    });
  }

  ngOnInit() {
    const formData = this.formDataService.getFormData();
    this.phoneForm.patchValue({
      phone: formData.contactInfo.phone,
      mobile: formData.contactInfo.mobile || '',
      workPhone: formData.contactInfo.workPhone || '',
      emergencyContact: formData.contactInfo.emergencyContact || ''
    });
  }

  saveData() {
    const currentData = this.formDataService.getFormData();
    const updatedContactInfo = {
      ...currentData.contactInfo,
      phone: this.phoneForm.value.phone,
      mobile: this.phoneForm.value.mobile,
      workPhone: this.phoneForm.value.workPhone,
      emergencyContact: this.phoneForm.value.emergencyContact
    };
    this.formDataService.updateContactInfo(updatedContactInfo);
  }

  canDeactivate(): boolean {
    return true;
  }

  onPrevious() {
    console.log('PhoneDetails - Previous button clicked');
    this.saveData();
    this.router.navigate(['/contact-info/address']);
  }

  onNext() {
    console.log('PhoneDetails - Next button clicked');
    if (this.phoneForm.valid) {
      this.saveData();
      this.router.navigate(['/preferences']);
    } else {
      console.log('PhoneDetails - Form is invalid, cannot proceed');
    }
  }

  onSave() {
    console.log('PhoneDetails - Save button clicked');
    this.saveData();
  }
}
