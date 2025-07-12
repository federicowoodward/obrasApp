import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MenuService {
  private responsiveMenu$ = new BehaviorSubject<boolean>(false);

  toggle() {
    this.responsiveMenu$.next(!this.responsiveMenu$.value);
  }
  open() {
    this.responsiveMenu$.next(true);
  }
  close() {
    this.responsiveMenu$.next(false);
  }
  get state$() {
    return this.responsiveMenu$.asObservable();
  }
  get value() {
    return this.responsiveMenu$.value;
  }
}
