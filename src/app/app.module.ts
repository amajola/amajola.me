import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { CdkScrollingModule } from './helpers/scrolling/scrolling.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { MyWorkComponent } from './pages/my-work/my-work.component';
import { SkillsComponent } from './pages/skills/skills.component';

import { JumbotronComponent } from '@components/jumbotron';
import { DrawingboardComponent } from '@components/drawingboard';
import { NavigationDotsComponent } from '@components/navigation-dots';
import { ButtonComponent } from '@components/button';

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
  ],
  imports: [BrowserModule, HttpClientModule, CdkScrollingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
