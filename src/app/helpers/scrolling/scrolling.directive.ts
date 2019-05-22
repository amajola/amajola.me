import { Subscription, fromEvent } from 'rxjs';
import {
  Directive,
  Input,
  ElementRef,
  OnInit,
  SimpleChanges,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import {
  ScrollingAnchor,
  Easing,
  ScrollingActivationTarget,
} from '../../models/scrolling';
import { CdkScrolling } from './scrolling.service';

@Directive({
  selector: '[cdkScrolling]',
})
export class ScrollingDirective implements OnInit, OnDestroy, OnChanges {
  private currentEvent: Subscription;

  private anchorElement: ScrollingAnchor = 'self';

  @Input()
  public get anchor(): ScrollingAnchor {
    return this.anchorElement === 'self' ? this.element : this.anchorElement;
  }
  public set anchor(v: ScrollingAnchor) {
    this.anchorElement = v;
  }

  private scrollOn: ScrollingActivationTarget = 'click';

  @Input()
  public get on(): ScrollingActivationTarget {
    return (this.scrollOn === 'hover' ? 'mouseover' : 'click') as any;
  }
  public set on(v: ScrollingActivationTarget) {
    this.scrollOn = v;
  }

  @Input() public speed: number = 700;

  @Input() public easing: Easing = 'easeInQuart';

  public get element(): HTMLElement {
    return this.host.nativeElement;
  }

  constructor(
    private host: ElementRef<HTMLElement>,
    private scroller: CdkScrolling
  ) {}

  public ngOnInit(): void {
    this.initWatcher();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if ('on' in changes || 'anchor' in changes) {
      this.initWatcher();
    }
  }

  public ngOnDestroy(): void {
    if (this.currentEvent && this.currentEvent.unsubscribe) {
      this.currentEvent.unsubscribe();
    }
  }

  public trigger(): void {
    this.scroller.scroll({
      anchor: this.anchor as HTMLElement,
      speed: this.speed,
      easing: this.easing,
    });
  }

  protected initWatcher(): void {
    if (this.currentEvent && this.currentEvent.unsubscribe) {
      this.currentEvent.unsubscribe();
      this.currentEvent = void 0;
    }

    this.currentEvent = fromEvent(this.element, this.on).subscribe(
      this.trigger.bind(this)
    );
  }
}
