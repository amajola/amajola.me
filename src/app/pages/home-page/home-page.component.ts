import { Router } from './../../helpers/global/state';
import { Component, OnInit, Renderer2 } from '@angular/core';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  public contactMe(): void {
    Router.navigate('/contact-me');
  }
}
