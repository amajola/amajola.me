import { BehaviorSubject } from 'rxjs';

export const canScroll: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
  true
);
