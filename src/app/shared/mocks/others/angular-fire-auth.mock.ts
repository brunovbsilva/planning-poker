export class AngularFireAuthMock {
  signInWithEmailAndPassword(email: string, password: string) {
    return new Promise((resolve) => resolve({}));
  }
  signInWithPopup(provider: any) {
    return new Promise((resolve) => resolve({}));
  }
  createUserWithEmailAndPassword(email: string, password: string) {
    return new Promise((resolve) => resolve({}));
  }
  signOut() {
    return new Promise((resolve) => resolve({}));
  }
}