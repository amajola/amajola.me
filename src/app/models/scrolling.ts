export type ScrollingAnchor = 'self' | Element;
export type ScrollingActivationTarget = 'click' | 'hover';

export type Easing =
  | 'linear'
  | 'easeInQuad'
  | 'easeOutQuad'
  | 'easeInOutQuad'
  | 'easeInCubic'
  | 'easeOutCubic'
  | 'easeInOutCubic'
  | 'easeInQuart'
  | 'easeOutQuart'
  | 'easeInOutQuart'
  | 'easeInQuint'
  | 'easeOutQuint'
  | 'easeInOutQuint';

export class ScrollingConfig {
  public anchor: HTMLElement;
  public speed?: number = 500;
  public easing?: Easing = 'linear';
  public offset?: number = 0;

  constructor(init: ScrollingConfig) {
    Object.assign(this, init);
  }
}
