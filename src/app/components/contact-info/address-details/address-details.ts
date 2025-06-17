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
  selector: 'app-address-details',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './address-details.html',
  styleUrl: './address-details.scss'
})
export class AddressDetails implements OnInit, CanComponentDeactivate {
  addressForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formDataService: FormData,
    private router: Router
  ) {
    this.addressForm = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  ngOnInit() {
    const formData = this.formDataService.getFormData();
    this.addressForm.patchValue({
      address: formData.contactInfo.address,
      city: formData.contactInfo.city,
      zipCode: formData.contactInfo.zipCode || '',
      country: formData.contactInfo.country || ''
    });
  }

  saveData() {
    const currentData = this.formDataService.getFormData();
    const updatedContactInfo = {
      ...currentData.contactInfo,
      address: this.addressForm.value.address,
      city: this.addressForm.value.city,
      zipCode: this.addressForm.value.zipCode,
      country: this.addressForm.value.country
    };
    this.formDataService.updateContactInfo(updatedContactInfo);
  }

  canDeactivate(): boolean {
    return true;
  }

  onNext() {
    console.log('AddressDetails - Next button clicked');
    if (this.addressForm.valid) {
      this.saveData();
      this.router.navigate(['/contact-info/phone']);
    } else {
      console.log('AddressDetails - Form is invalid, cannot proceed');
    }
  }

  onPrevious() {
    console.log('AddressDetails - Previous button clicked');
    this.saveData();
    this.router.navigate(['/contact-info']);
  }

  onSave() {
    console.log('AddressDetails - Save button clicked');
    this.saveData();
  }
}
