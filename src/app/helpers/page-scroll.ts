import { PageDef } from './../models/page-def';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { UrlService } from '../services/url.service';

export class Fullpage {
  public urlstate: PageDef;
  public isanimating: boolean = false;

  public onMouseWheel: Observable<any> = fromEvent(window, 'mousewheel');

  constructor(
    protected pages: PageDef[],
    protected title: Title,
    protected location: UrlService
  ) {
    this.onMouseWheel.pipe(debounceTime(50)).subscribe((event: WheelEvent) => {
      const { deltaY, deltaX } = event;

      const DIRECTION = this._getDeltaDirection(deltaY);
      const CURRENT_INDEX = this.pages.indexOf(this.urlstate);

      if (!this.isanimating) {
        switch (DIRECTION) {
          case 'UP':
            if (CURRENT_INDEX < this.pages.length - 1) {
              this.setUrlState(this.pages[CURRENT_INDEX + 1].path);
            } else this.setUrlState(this.pages[0].path);
            break;
          default:
            if (CURRENT_INDEX > 0) {
              this.setUrlState(this.pages[CURRENT_INDEX - 1].path);
            } else this.setUrlState(this.pages[this.pages.length - 1].path);
            break;
        }
      }
    });
  }

  public setUrlState(url: string): void {
    const nextState = this.pages.find(page => page.path === url);

    if (!!nextState) {
      this.title.setTitle(`${environment.basePageTitle} - ${nextState.name}`);

      this.urlstate = nextState;

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
