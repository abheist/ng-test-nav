import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FormData, PersonalInfo as PersonalInfoModel } from '../../services/form-data';
import { CanComponentDeactivate } from '../../guards/form-save-guard';

@Component({
  selector: 'app-personal-info',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './personal-info.html',
  styleUrl: './personal-info.scss'
})
export class PersonalInfo implements OnInit, CanComponentDeactivate {
  personalForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private formDataService: FormData,
    private router: Router
  ) {
    this.personalForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    const formData = this.formDataService.getFormData();
    this.personalForm.patchValue(formData.personalInfo);
  }

  saveData() {
    // Always save data, even if form is invalid (partial save)
    this.formDataService.updatePersonalInfo(this.personalForm.value as PersonalInfoModel);
  }

  getFormData(): PersonalInfoModel {
    return this.personalForm.value as PersonalInfoModel;
  }

  canDeactivate(): boolean {
    return true;
  }

  onNext() {
    console.log('PersonalInfo - Next button clicked');
    if (this.personalForm.valid) {
      this.saveData();
      this.router.navigate(['/contact-info']);
    } else {
      console.log('PersonalInfo - Form is invalid, cannot proceed');
    }
  }

  onSave() {
    console.log('PersonalInfo - Save button clicked');
    this.saveData();
  }
}
