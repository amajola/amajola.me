import { Component, OnInit, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { UrlService } from './services/url.service';
import { Fullpage } from './helpers/page-scroll';
import { pages } from './app.pages';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends Fullpage implements OnInit {
  public isready: boolean = false;

  constructor(
    @Inject(UrlService) location: UrlService,
    @Inject(Title) title: Title
  ) {
    super(pages, title, location);
  }

  public ngOnInit(): void {
    this.setUrlState(this.location.path);

    this.isready = true;
  }
}
