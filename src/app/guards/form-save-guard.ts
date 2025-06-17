import { CanDeactivateFn } from '@angular/router';
import { FormData } from '../services/form-data';
import { inject } from '@angular/core';

export interface CanComponentDeactivate {
  canDeactivate(): boolean;
  saveData(): void;
}

export const formSaveGuard: CanDeactivateFn<CanComponentDeactivate> = (component) => {
  const formDataService = inject(FormData);
  
  // Always save data when leaving a form
  if (component && typeof component.saveData === 'function') {
    component.saveData();
    formDataService.saveCurrentData();
  }
  
  return true;
};
