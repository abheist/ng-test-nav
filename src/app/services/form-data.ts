import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode?: string;
  country?: string;
  mobile?: string;
  workPhone?: string;
  emergencyContact?: string;
}

export interface Preferences {
  newsletter: boolean;
  notifications: boolean;
  theme: string;
}

export interface FormDataModel {
  personalInfo: PersonalInfo;
  contactInfo: ContactInfo;
  preferences: Preferences;
}

@Injectable({
  providedIn: 'root'
})
export class FormData {
  private formData: FormDataModel = {
    personalInfo: { firstName: '', lastName: '', email: '' },
    contactInfo: { email: '', phone: '', address: '', city: '' },
    preferences: { newsletter: false, notifications: false, theme: 'light' }
  };

  private currentStepSubject = new BehaviorSubject<number>(0);
  currentStep$ = this.currentStepSubject.asObservable();

  constructor() { }

  getFormData(): FormDataModel {
    return { ...this.formData };
  }

  updatePersonalInfo(data: PersonalInfo) {
    this.formData.personalInfo = { ...data };
  }

  updateContactInfo(data: ContactInfo) {
    this.formData.contactInfo = { ...data };
  }

  updatePreferences(data: Preferences) {
    this.formData.preferences = { ...data };
  }

  setCurrentStep(step: number) {
    this.currentStepSubject.next(step);
  }

  getCurrentStep(): number {
    return this.currentStepSubject.value;
  }

  saveCurrentData() {
    console.log('Saving current form data:', this.formData);
  }
}
