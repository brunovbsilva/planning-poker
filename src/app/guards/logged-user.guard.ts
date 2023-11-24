import { inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanMatchFn } from '@angular/router';
import { map } from 'rxjs';

export const loggedUserGuard: CanMatchFn = (route, segments) => {
  return inject(AngularFireAuth).user.pipe(
    map(user => user == null ? false : true)
  );
};
