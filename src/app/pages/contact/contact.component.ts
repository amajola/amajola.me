import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { PageBase, PageState } from 'src/app/helpers/page';
import { ShowdownService } from 'src/app/services/showdown.service';
import { canScroll } from 'src/app/helpers/global/state';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['../page.scss', './contact.component.scss'],
})
export class ContactComponent extends PageBase
  implements OnInit, AfterViewInit {
  displayImage: String = '../../../assets/contact_me/FullSizeRender.JPG';
  jumboTronHeader: String = 'Contact';

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
