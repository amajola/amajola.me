import { Component, OnInit, Inject, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import {ShowdownService} from '../../services/showdown.service'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  
  constructor(public ShowdownService: ShowdownService, private renderer: Renderer2, private el: ElementRef) {
      this.ShowdownService.Location = "../../../assets/about/Lopem.md";
      this.ShowdownService.ConvertedHtml().then((result: string) => {
        const Markdown = this.renderer.createElement('div');
        const value = Markdown.innerHTML = result;
        // This is not good find a better way
        this.renderer.appendChild(this.el.nativeElement, Markdown);
        this.renderer.setAttribute(Markdown, "MDirective", '');
      }).catch(err => {
          console.log(err)
      })
  }

  ngOnInit() {}
}
