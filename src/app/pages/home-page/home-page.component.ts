import { Component, OnInit, Inject, ElementRef, ViewChild, Renderer2, RendererFactory2 } from '@angular/core';
import {ShowdownService} from '../../services/showdown.service'
import {MarkdownConsumer} from '../../helpers/showdown'
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent extends MarkdownConsumer implements OnInit {

  constructor(private Showdown: ShowdownService) {
    super("../../../assets/about/Lopem.md", Showdown)
  }

  ngOnInit() {}
}
