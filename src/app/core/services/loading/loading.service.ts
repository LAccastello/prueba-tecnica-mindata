import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class LoadingService {
  private loading$ = new BehaviorSubject<boolean>(false);
  loading: Observable<boolean> = this.loading$.asObservable();

  constructor() {}

  simulateHttp(): Observable<null> {
    return of(null).pipe(delay(1000));
  }

  showLoading(): void {
    this.loading$.next(true);
  }

  hideLoading(): void {
    this.loading$.next(false);
  }
}
