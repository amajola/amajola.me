import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { PageTextComponent } from './components/page-text/page-text.component';
import { JumbotronComponent } from './components/jumbotron/jumbotron.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CdkScrollingModule } from './helpers/scrolling/scrolling.module';
import { HomePageComponent } from './pages/home-page/home-page.component';

@NgModule({
  declarations: [
    AppComponent,
    PageTextComponent,
    JumbotronComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CdkScrollingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
