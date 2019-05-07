import { Component, OnInit, Renderer2, AfterViewInit } from '@angular/core';
import { ShowdownService } from '../../services/showdown.service';
import { MarkdownConsumer } from '../../helpers/showdown';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent extends MarkdownConsumer
  implements OnInit, AfterViewInit {
  public displayImage: string = '../../../assets/about/amajola.jpg';

  public jumboTronHeader: string = 'About';

  public displayMarkdown: boolean = false;

  constructor(showdown: ShowdownService) {
    super('assets/about/Lopem.md', showdown);
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    console.log('Hello World');
  }

  srcollDown() {}
}
