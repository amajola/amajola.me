import { Injectable } from '@angular/core';
import { ScrollingConfig, Easing } from '../../models/scrolling';
import { EasingFunctions } from './easings';

@Injectable()
export class CdkScrolling {
  protected get documentHeight(): number {
    return Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
  }

  protected get windowHeight(): number {
    return (
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.getElementsByTagName('body')[0].clientHeight
    );
  }

  constructor() {}

  public scroll(config: ScrollingConfig): any {
    return new Promise<void>((resolve: () => void) => {
      const configOrDefaults = new ScrollingConfig(config);

      const start: number = window.pageYOffset;
      const startTime: number = this._currenttime();

      const offset: number = configOrDefaults.anchor.offsetTop;
      const scrollAmount: number = this._getscrollamount(offset);

      if ('requestAnimationFrame' in window === false) {
        window.scroll(0, scrollAmount);
        return;
      }

      this.doScroll(
        start,
        startTime,
        configOrDefaults.speed,
        configOrDefaults.easing,
        scrollAmount,
        resolve
      );
    });
  }

  private doScroll(
    start: number,
    startTime: number,
    duration: number,
    easing: Easing,
    scrollAmount: number,
    resolve: () => void
  ): any {
    const now = this._currenttime();
    const time = EasingFunctions[easing](
      Math.min(1, (now - startTime) / duration)
    );

    window.scroll(0, Math.ceil(time * (scrollAmount - start) + start));

    if (window.pageYOffset === scrollAmount || now - startTime > duration) {
      resolve();
      return;
    }

    requestAnimationFrame(() =>
      this.doScroll(start, startTime, duration, easing, scrollAmount, resolve)
    );
  }

  private _getscrollamount(offset: number): number {
    return this.documentHeight - offset < this.windowHeight
      ? this.documentHeight - this.windowHeight
      : offset;
  }

  private _currenttime(): number {
    return 'now' in window.performance
      ? performance.now()
      : new Date().getTime();
  }
}
