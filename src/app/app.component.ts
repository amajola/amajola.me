import {
  Component,
  OnInit,
  Inject,
  ElementRef,
  ViewChildren,
  QueryList,
  AfterViewInit,
} from '@angular/core';
import { UrlService } from './services/url.service';
import { Fullpage } from './helpers/page-scroll';
import { pages } from './app.pages';
import { Title } from '@angular/platform-browser';
import { CdkScrolling } from './helpers/scrolling/scrolling.service';
import { Router } from './helpers/global/state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends Fullpage implements OnInit, AfterViewInit {
  public isready: boolean = false;

  constructor(
    @Inject(UrlService) location: UrlService,
    @Inject(Title) title: Title,
    @Inject(ElementRef) host: ElementRef<HTMLElement>,
    @Inject(CdkScrolling) scrolling: CdkScrolling
  ) {
    super(pages, title, location, host, scrolling);
  }

  public ngOnInit(): void {
    Router.onRouterReuest.subscribe(url => this.setUrlState(url));
  }

  public ngAfterViewInit(): void {
    this.setUrlState(this.location.path);

    this.configureintersectoinobserver();

    this.isready = true;
  }
}
