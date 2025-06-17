import { Routes } from '@angular/router';
import { AddressDetails } from './components/contact-info/address-details/address-details';
import { PhoneDetails } from './components/contact-info/phone-details/phone-details';
import { formSaveGuard } from './guards/form-save-guard';

export const contactInfoRoutes: Routes = [
  { path: 'address', component: AddressDetails, canDeactivate: [formSaveGuard] },
  { path: 'phone', component: PhoneDetails, canDeactivate: [formSaveGuard] }
];