import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import {ShowdownService} from '../../services/showdown.service';
import {MarkdownConsumer} from '../../helpers/showdown';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent extends MarkdownConsumer implements OnInit, AfterViewInit {

  displayImage: String = "../../../assets/about/amajola.jpg"
  jumboTronHeader: String =  "About"
  displayMarkdown: boolean = false;
  
  constructor(private Showdown: ShowdownService, Render2: Renderer2) {
    super(Showdown, Render2)
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.domInput("../../../assets/about/Lopem.md");
  }

  srcollDown() {
    
  }

}
