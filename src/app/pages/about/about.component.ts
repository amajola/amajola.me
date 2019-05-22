import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { ShowdownService } from '../../services/showdown.service';
import { PageBase, PageState } from './../../helpers/page';
import { MarkdownConsumer } from '../../helpers/showdown';
import { canScroll } from 'src/app/helpers/global/state';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['../page.scss', './about.component.scss'],
})
export class AboutComponent extends PageBase implements OnInit, AfterViewInit {
  public displayImage: string = '../../../assets/about/amajola.jpg';

  public jumboTronHeader: string = 'About';

  constructor(@Inject(ShowdownService) showdown: ShowdownService) {
    super('assets/about/Lopem.md', showdown);
  }

  ngOnInit() {}

  public ngAfterViewInit(): void {}

  public viewInfo(): void {
    this.setState(PageState.info);
    canScroll.next(false);
  }

  public goBack(): void {
    this.setState(PageState.idle);
    canScroll.next(true);
  }
}
