import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { HttpClientModule } from '@angular/common/http';
import { CdkScrollingModule } from './helpers/scrolling/scrolling.module';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { MyWorkComponent } from './pages/my-work/my-work.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { DrawingboardComponent } from './components/drawingboard/drawingboard.component';
import { NavigationDotsComponent } from './components/navigation-dots/navigation-dots.component';
import { ButtonComponent } from './components/button/button.component';

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
