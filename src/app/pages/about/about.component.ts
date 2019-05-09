import { Component, OnInit, Renderer2, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
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


  @ViewChild('Modal') Modal: ElementRef;
  @ViewChild('Jumbotron') Jumbotron: ElementRef;

  constructor(showdown: ShowdownService, private Render: Renderer2) {
    super('assets/about/Lopem.md', showdown);
  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    console.log('Hello World');
  }

  srcollDown() {}

  openModal() {
    this.Render.setStyle(this.Modal.nativeElement,
      'display',
      'block'
    );
    this.Render.setStyle(this.Jumbotron.nativeElement,
      'display',
      'none'
    );
  }

  closeModal() {
    this.Render.setStyle(this.Modal.nativeElement,
      'display',
      'none'
    );
    this.Render.setStyle(this.Jumbotron.nativeElement,
      'display',
      'grid'
    );
  }
}
