import { PageDef } from './../models/page-def';
import { Title } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { UrlService } from '../services/url.service';
import {
  ElementRef,
  ViewChildren,
  QueryList,
  HostListener,
} from '@angular/core';
import { CdkScrolling } from './scrolling/scrolling.service';
import { ScrollingConfig } from '../models/scrolling';
import { canScroll, urlState } from './global/state';

// Generates the options object
// for the scroll service
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
  private mobileQuery: MediaQueryList = window.matchMedia(
    'screen and (max-width: 850px)'
  );

  // Stores the value of the global state
  public canscroll: boolean = false;

  // Gets a list of all the possible
  // pages in the view
  @ViewChildren('section') public sections: QueryList<ElementRef<HTMLElement>>;

  // The currently active page
  public urlstate: PageDef;

  // tracks if the page is currently scrolling
  public isanimating: boolean = false;

  public get isMobile(): boolean {
    return this.mobileQuery.matches;
  }

  public get isDesktop(): boolean {
    return !this.isMobile;
  }

  constructor(
    protected readonly pages: PageDef[],
    protected readonly title: Title,
    protected readonly location: UrlService,
    protected readonly host: ElementRef,
    protected readonly scrolling: CdkScrolling
  ) {
    // Listen to the global state to control
    // when the page can and cannot scroll
    canScroll.subscribe(value => (this.canscroll = value));
  }

  @HostListener('window:mousewheel', ['$event'])
  public onmousewheel(event: WheelEvent): void {
    // Checks if the page can currently scroll
    // based on the global state of the app
    if (this.canscroll && this.isDesktop) {
      // Grabs the Y direction of the mousewheel
      const { deltaY } = event;

      // Normalise the data of the mousewheel
      // direction to determine which way the
      // user wants to go
      const DIRECTION = this._getDeltaDirection(deltaY);

      // Find the index of the page that is
      // currently in view
      const CURRENT_INDEX = this.pages.indexOf(this.urlstate);

      // Only continue if the page is not currently
      // scrolling
      if (!this.isanimating) {
        // Mark the page as scrolling
        this.isanimating = true;

        // Find the index of the next page
        // based on the scroll direction the
        // user requested
        let newIndex: number = CURRENT_INDEX;
        switch (DIRECTION) {
          case 'UP':
            if (CURRENT_INDEX > 0) newIndex--;
            break;
          default:
            if (CURRENT_INDEX < this.pages.length - 1) newIndex++;
            break;
        }

        // Scroll to the page at the new index
        this.setUrlState(this.pages[newIndex].path);
      }
    }
  }

  // @HostListener('window:scroll')
  public configureintersectoinobserver(): void {
    if (this.isMobile) {
      this.sections.forEach(section => {
        const observer = new IntersectionObserver(
          entries => {
            if (
              entries.length &&
              entries[0].isIntersecting &&
              !this.isanimating
            ) {
              const id = section.nativeElement.id;
              const pagedef = this.pages.find(
                page => page.name.toLowerCase() === id.toLowerCase()
              );

              this.location.set(pagedef.path);
            }
          },
          { threshold: 0.5 }
        );

        observer.observe(section.nativeElement);
      });
    }
  }

  public async setUrlState(
    url: string,
    animate: boolean = true
  ): Promise<void> {
    // Find the PageDef of the url passed to
    // the function
    const nextState = this.pages.find(page => page.path === url);

    // If the PageDef is found, we are going
    // to begin navigating to that page
    if (!!nextState) {
      // Set the title of the site to reflect
      // the page the user is seeing
      this.title.setTitle(`${environment.basePageTitle} - ${nextState.name}`);

      // Track what the current url state is
      this.urlstate = nextState;

      // Find the secion on the page that matches
      // the PageDef
      const section = this.sections
        .map(i => i.nativeElement)
        .find(sect => sect.id === this.urlstate.name);

      // Scrolls to the section of the page
      // the matches the url
      await this.scrolling.scroll(SCROLL_OPTIONS(section, animate));

      // Marks the page as no longer animating
      this.isanimating = false;

      // Update the url to match the page
      // we are on
      this.location.set(nextState.path);

      urlState.next(this.urlstate);
      return;
    }

    // if the page is a 404, return
    // to the home page
    this.setUrlState('/', false);
  }

  private _getDeltaDirection(delta: number): 'UP' | 'DOWN' {
    if (delta < 0) {
      return 'UP';
    } else if (delta > 0) return 'DOWN';
  }
}
