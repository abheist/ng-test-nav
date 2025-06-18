import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { App } from './app';
import { routes } from './app.routes';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { PersonalInfoModule } from './components/personal-info/personal-info.module';
import { ContactInfoModule } from './components/contact-info/contact-info.module';
import { PreferencesModule } from './components/preferences/preferences.module';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatSidenavModule,
    MatToolbarModule,
    SidebarModule,
    PersonalInfoModule,
    ContactInfoModule,
    PreferencesModule
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }