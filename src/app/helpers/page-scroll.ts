import { PageDef } from './../models/page-def';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { UrlService } from '../services/url.service';
import {
  ElementRef,
  ViewChildren,
  QueryList,
  HostListener,
} from '@angular/core';
import { CdkScrolling } from './scrolling/scrolling.service';
import { ScrollingConfig } from '../models/scrolling';

const SCROLL_OPTIONS: (
  anchor: HTMLElement,
  animate: boolean
) => ScrollingConfig = (anchor: HTMLElement, animate: boolean) => {
  return {
    anchor,
    speed: animate ? 450 : 0,
    easing: 'easeInOutQuart',
  };
};

export class Fullpage {
  @ViewChildren('section') public sections: QueryList<ElementRef<HTMLElement>>;

  public urlstate: PageDef;
  public isanimating: boolean = false;

  constructor(
    protected pages: PageDef[],
    protected title: Title,
    protected location: UrlService,
    protected host: ElementRef,
    protected scrolling: CdkScrolling
  ) {}

  @HostListener('window:mousewheel', ['$event']) public onmousewheel(
    event: WheelEvent
  ): void {
    const { deltaY } = event;

    const DIRECTION = this._getDeltaDirection(deltaY);
    const CURRENT_INDEX = this.pages.indexOf(this.urlstate);

    if (!this.isanimating) {
      this.isanimating = true;

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
  }

  // TODO: Refactor this spagetti
  public async setUrlState(
    url: string,
    animate: boolean = true
  ): Promise<void> {
    const nextState = this.pages.find(page => page.path === url);

    if (!!nextState) {
      this.title.setTitle(`${environment.basePageTitle} - ${nextState.name}`);

      this.urlstate = nextState;

      const section = this.sections
        .map(i => i.nativeElement)
        .find(sect => sect.id === this.urlstate.name);

      await this.scrolling.scroll(SCROLL_OPTIONS(section, animate));
      this.isanimating = false;
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
