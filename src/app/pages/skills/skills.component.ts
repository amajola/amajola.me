import { ShowdownService } from './../../services/showdown.service';
import { PageBase, PageState } from './../../helpers/page';
import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { canScroll } from 'src/app/helpers/global/state';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['../page.scss', './skills.component.scss'],
})
export class SkillsComponent extends PageBase implements OnInit, AfterViewInit {
  displayImage: String = '../../../assets/skills/IMG_0434.jpg';
  jumboTronHeader: String = 'Skills';

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
