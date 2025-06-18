import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { Sidebar } from './sidebar';

@NgModule({
  declarations: [
    Sidebar
  ],
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule
  ],
  exports: [
    Sidebar
  ]
})
export class SidebarModule { }