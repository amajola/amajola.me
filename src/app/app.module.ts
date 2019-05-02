import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';




import { AppComponent } from './app.component';


import { PageTextComponent } from './page-text/page-text.component';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFullpageModule } from '@fullpage/angular-fullpage';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';

const Routes: Routes = [
  {path: 'marked/:id', component: PageTextComponent},
  {path: 'home', component: HomeComponent},
]



@NgModule({
  declarations: [
    AppComponent,
    PageTextComponent,
    JumbotronComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFullpageModule,
    RouterModule.forRoot(Routes),
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useValue: {
          gfm: true,
          tables: true,
          breaks: false,
          pedantic: false,
          sanitize: true,
          smartLists: true,
          smartypants: false,
        },
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
