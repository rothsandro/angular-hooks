import { ChangeDetectorRef, Injectable } from '@angular/core';
import produce from 'immer';

export interface StateFn<T extends object> {
  $set: (update: Partial<T> | ((state: T) => void)) => void;
}

export type State<T extends object> = T & StateFn<T>;

@Injectable()
export class StateHook {
  constructor(private cdr: ChangeDetectorRef) {}

  use<T extends object>(initial: T): State<T> {
    const state: State<T> = {
      ...initial,
      $set: (change) => {
        const producer =
          typeof change === 'function'
            ? (draft: T) => void change(draft)
            : (draft: T) => void Object.assign(draft, change);

        const newState = produce(state, producer);
        if (newState === state) return;
        Object.assign(state, newState);
        this.cdr.markForCheck();
      },
    };

    return state;
  }
}
