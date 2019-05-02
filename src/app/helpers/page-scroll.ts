import { PageDef } from './../models/page-def';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { UrlService } from '../services/url.service';
import { ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CdkScrolling } from './scrolling/scrolling.service';

export class Fullpage {
  @ViewChildren('section') public sections: QueryList<ElementRef<HTMLElement>>;

  public urlstate: PageDef;
  public isanimating: boolean = false;

  public onMouseWheel: Observable<any> = fromEvent(window, 'mousewheel');

  constructor(
    protected pages: PageDef[],
    protected title: Title,
    protected location: UrlService,
    protected host: ElementRef,
    protected scrolling: CdkScrolling
  ) {
    this.onMouseWheel.pipe(debounceTime(50)).subscribe((event: WheelEvent) => {
      const { deltaY, deltaX } = event;

      const DIRECTION = this._getDeltaDirection(deltaY);
      const CURRENT_INDEX = this.pages.indexOf(this.urlstate);

      if (!this.isanimating) {
        let newIndex: number = CURRENT_INDEX;
        switch (DIRECTION) {
          case 'UP':
            if (CURRENT_INDEX > 0) newIndex--;
            break;
          default:
            if (CURRENT_INDEX < this.pages.length - 1) newIndex++;
            break;
        }

        this.setUrlState(this.pages[newIndex].path);
      }
    });
  }

  public setUrlState(url: string): void {
    const nextState = this.pages.find(page => page.path === url);

    if (!!nextState) {
      this.title.setTitle(`${environment.basePageTitle} - ${nextState.name}`);

      this.urlstate = nextState;

      const section = this.sections
        .map(i => i.nativeElement)
        .find(sect => sect.id === this.urlstate.name);

      this.scrolling.scroll({
        anchor: section,
        speed: 450,
        easing: 'easeInOutQuart',
      });

      this.location.set(nextState.path);
      return;
    }

    throw new Error('Page not found');
  }

  private _getDeltaDirection(delta: number): 'UP' | 'DOWN' {
    if (delta < 0) {
      return 'UP';
    } else if (delta > 0) return 'DOWN';
  }
}
