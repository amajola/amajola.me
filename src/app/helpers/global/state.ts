import { BehaviorSubject, Subject } from 'rxjs';
import { PageDef } from 'src/app/models/page-def';

export const canScroll: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
  true
);

export const urlState: Subject<PageDef> = new Subject<PageDef>();

class RouterCore {
  public onRouterReuest: Subject<string> = new Subject<string>();

  public navigate(url: string): void {
    this.onRouterReuest.next(url);
  }
}

export const Router = new RouterCore();
