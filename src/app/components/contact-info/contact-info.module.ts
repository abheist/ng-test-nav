import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ContactInfo } from './contact-info';
import { AddressDetails } from './address-details/address-details';
import { PhoneDetails } from './phone-details/phone-details';

@NgModule({
  declarations: [
    ContactInfo,
    AddressDetails,
    PhoneDetails
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    ContactInfo,
    AddressDetails,
    PhoneDetails
  ]
})
export class ContactInfoModule { }