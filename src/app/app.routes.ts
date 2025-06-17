import { Routes } from '@angular/router';
import { PersonalInfo } from './components/personal-info/personal-info';
import { ContactInfo } from './components/contact-info/contact-info';
import { Preferences } from './components/preferences/preferences';
import { formSaveGuard } from './guards/form-save-guard';
import { contactInfoRoutes } from './contact-info.routes';

export const routes: Routes = [
  { path: '', redirectTo: '/personal-info', pathMatch: 'full' },
  { path: 'personal-info', component: PersonalInfo, canDeactivate: [formSaveGuard] },
  { 
    path: 'contact-info', 
    component: ContactInfo,
    canDeactivate: [formSaveGuard],
    children: contactInfoRoutes
  },
  { path: 'preferences', component: Preferences, canDeactivate: [formSaveGuard] },
  { path: '**', redirectTo: '/personal-info' }
];
