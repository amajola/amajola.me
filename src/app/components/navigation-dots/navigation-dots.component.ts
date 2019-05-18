import { Component, OnInit } from '@angular/core';
import { PageDef } from 'src/app/models/page-def';
import { urlState, Router } from 'src/app/helpers/global/state';
import { pages } from 'src/app/app.pages';

@Component({
  selector: 'app-navigation-dots',
  templateUrl: './navigation-dots.component.html',
  styleUrls: ['./navigation-dots.component.scss'],
})
export class NavigationDotsComponent implements OnInit {
  public currentState: PageDef;

  public pages: PageDef[] = pages;

  constructor() {}

  ngOnInit() {
    urlState.subscribe(state => (this.currentState = state));
  }

  public navigateTo(url: string): void {
    Router.navigate(url);
  }
}
