import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  public changes: Subject<{ prev: string; next: string }> = new Subject();

  constructor() {}

  public get path(): string {
    return window.location.pathname;
  }

  public set(url: string): void {
    const current = this.path;
    window.history.replaceState(null, null, url);
    this.changes.next({ prev: current, next: `/${url}` });
  }
}
