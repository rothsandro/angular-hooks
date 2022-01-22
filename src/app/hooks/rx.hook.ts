import { ChangeDetectorRef, Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

export type RxState<T> = (RxSuspenseState | RxReadyState<T>) &
  RxCompleteState &
  RxErrorState;

export interface RxCompleteState {
  complete: boolean;
}

export interface RxErrorState {
  error: unknown;
}

export interface RxSuspenseState {
  ready: false;
  value: undefined;
}

export interface RxReadyState<T> {
  ready: true;
  value: T;
}

@Injectable()
export class RxHook implements OnDestroy {
  private subscription = new Subscription();

  constructor(private cdr: ChangeDetectorRef) {}

  use<T>(observable: Observable<T>): RxState<T> {
    const state: RxState<T> = {
      ready: false,
      value: undefined,
      complete: false,
      error: undefined,
    };

    const patchState = (patch: Partial<RxState<T>>) => {
      Object.assign(state, patch);
      this.cdr.detectChanges();
    };

    this.subscription.add(
      observable.subscribe({
        next: (value) => patchState({ ready: true, value }),
        error: (error) => patchState({ error }),
        complete: () => patchState({ complete: true }),
      })
    );

    return state;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
