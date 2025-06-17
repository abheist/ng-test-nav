import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, ActivatedRoute, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FormData, ContactInfo as ContactInfoModel } from '../../services/form-data';
import { CanComponentDeactivate } from '../../guards/form-save-guard';

@Component({
  selector: 'app-contact-info',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, RouterOutlet],
  templateUrl: './contact-info.html',
  styleUrl: './contact-info.scss'
})
export class ContactInfo implements OnInit, CanComponentDeactivate {
  emailForm: FormGroup;
  currentRoute: string = '';
  showEmailForm: boolean = true;

  constructor(
    private fb: FormBuilder,
    private formDataService: FormData,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    const formData = this.formDataService.getFormData();
    this.emailForm.patchValue({
      email: formData.contactInfo.email
    });

    // Track route changes to show/hide email form
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute = event.url;
        this.showEmailForm = event.url === '/contact-info';
      });
    
    this.currentRoute = this.router.url;
    this.showEmailForm = this.currentRoute === '/contact-info';
  }

  saveData() {
    const currentData = this.formDataService.getFormData();
    const updatedContactInfo = {
      ...currentData.contactInfo,
      email: this.emailForm.value.email
    };
    this.formDataService.updateContactInfo(updatedContactInfo);
  }

  canDeactivate(): boolean {
    return true;
  }

  onNext() {
    console.log('ContactInfo - Next button clicked');
    if (this.emailForm.valid) {
      this.saveData();
      this.router.navigate(['/contact-info/address']);
    } else {
      console.log('ContactInfo - Form is invalid, cannot proceed');
    }
  }

  onPrevious() {
    console.log('ContactInfo - Previous button clicked');
    this.saveData();
    this.router.navigate(['/personal-info']);
  }

  onSave() {
    console.log('ContactInfo - Save button clicked');
    this.saveData();
  }
}
