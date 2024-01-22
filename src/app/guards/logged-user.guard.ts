import { computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanMatchFn } from '@angular/router';

export const loggedUserGuard: CanMatchFn = (route, segments) => {
  const user = toSignal(inject(AngularFireAuth).user);
  return computed(() => user != null)();
};
