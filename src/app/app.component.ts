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

  public ngOnInit(): void {}

  public ngAfterViewInit(): void {
    this.setUrlState(this.location.path);

    this.isready = true;
  }
}
