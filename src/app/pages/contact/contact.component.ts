import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { PageBase, PageState } from 'src/app/helpers/page';
import { ShowdownService } from 'src/app/services/showdown.service';
import { canScroll } from 'src/app/helpers/global/state';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['../page.scss', './contact.component.scss'],
})
export class ContactComponent implements OnInit, AfterViewInit {

  public displayImage: String = '../../../assets/contact_me/FullSizeRender.JPG';
  public jumboTronHeader: String = 'Contact';
  public buttonText: string = 'EMAIL ME';

  constructor() {}

  ngOnInit() {}

  public ngAfterViewInit(): void {}

  sendTo(website) {
    if (website === 'github') {
      window.open(environment.github);
    } else if (website === 'twitter') {
      window.open(environment.twitter);
    } else if (website === 'linkedin') {
      window.open(environment.linkedin);
    }
  }

  public emailMe(): void {
    window.open(`mailto:${environment.emailAddress}`, '_blank');
  }
}
