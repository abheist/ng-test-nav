import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormData, Preferences as PreferencesModel } from '../../services/form-data';
import { CanComponentDeactivate } from '../../guards/form-save-guard';

@Component({
  selector: 'app-preferences',
  standalone: false,
  templateUrl: './preferences.html',
  styleUrl: './preferences.scss'
})
export class Preferences implements OnInit, CanComponentDeactivate {
  preferencesForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formDataService: FormData,
    private router: Router
  ) {
    this.preferencesForm = this.fb.group({
      newsletter: [false],
      notifications: [false],
      theme: ['light']
    });
  }

  ngOnInit() {
    const formData = this.formDataService.getFormData();
    this.preferencesForm.patchValue(formData.preferences);
  }

  saveData() {
    this.formDataService.updatePreferences(this.preferencesForm.value as PreferencesModel);
  }

  getFormData(): PreferencesModel {
    return this.preferencesForm.value as PreferencesModel;
  }

  canDeactivate(): boolean {
    return true;
  }

  onPrevious() {
    console.log('Preferences - Previous button clicked');
    this.saveData();
    this.router.navigate(['/contact-info']);
  }

  onSave() {
    console.log('Preferences - Save button clicked');
    this.saveData();
  }

  onFinish() {
    console.log('Preferences - Finish button clicked');
    this.saveData();
    // Could navigate to a summary page or show completion message
    alert('Form completed successfully!');
  }
}
