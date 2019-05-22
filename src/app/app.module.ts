import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { CdkScrollingModule } from './helpers/scrolling/scrolling.module';

import { AppComponent } from './app.component';

import { HomePageComponent } from '@pages/home-page';
import { AboutComponent } from '@pages/about';
import { ContactComponent } from '@pages/contact';
import { MyWorkComponent } from '@pages/my-work';
import { SkillsComponent } from '@pages/skills';

import { JumbotronComponent } from '@components/jumbotron';
import { DrawingboardComponent } from '@components/drawingboard';
import { NavigationDotsComponent } from '@components/navigation-dots';
import { ButtonComponent } from '@components/button';
import { CloseButtonComponent } from '@components/close-button';

@NgModule({
  declarations: [
    AppComponent,
    JumbotronComponent,
    HomePageComponent,
    AboutComponent,
    ContactComponent,
    MyWorkComponent,
    SkillsComponent,
    DrawingboardComponent,
    NavigationDotsComponent,
    ButtonComponent,
    CloseButtonComponent,
  ],
  imports: [BrowserModule, HttpClientModule, CdkScrollingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
