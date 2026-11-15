import { Injectable } from '@angular/core';
import { Field } from '@angular/forms/signals';
import { ErrorStateMatcher } from '@angular/material/core';

@Injectable({
  providedIn: 'root',
})
export class DirtyStateMatcherService implements ErrorStateMatcher {
  isErrorState(): boolean {
    return false;
  }

  isSignalErrorState(field: Field<unknown> | null): boolean {
    if (!field) {
      return false;
    }

    const state = field();

    return state.invalid() && (state.touched() || state.dirty());
  }
}
