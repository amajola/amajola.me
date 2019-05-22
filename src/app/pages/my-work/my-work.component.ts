import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { ShowdownService } from '../../services/showdown.service';
import { PageBase, PageState } from './../../helpers/page';
import { MarkdownConsumer } from '../../helpers/showdown';
import { canScroll } from 'src/app/helpers/global/state';

@Component({
  selector: 'app-my-work',
  templateUrl: './my-work.component.html',
  styleUrls: ['../page.scss', './my-work.component.scss'],
})
export class MyWorkComponent extends PageBase implements OnInit, AfterViewInit {
  displayImage: String = '../../../assets/work/amajola.jpg';
  jumboTronHeader: String = 'My Work';

  constructor(@Inject(ShowdownService) showdown: ShowdownService) {
    super('assets/skills/Lopem.md', showdown);
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
