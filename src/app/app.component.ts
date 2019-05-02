import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UrlService } from './services/url.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(protected location: UrlService) {}

  public ngOnInit(): void {
    console.log(this.location.path);
  }
}
