export class AngularFireAuthMock {
  public currentUser = new Promise((resolve) => resolve(null));
  signInWithEmailAndPassword(email: string, password: string) {
    return this.currentUser;
  }
  signInWithPopup(provider: any) {
    return this.currentUser;
  }
  createUserWithEmailAndPassword(email: string, password: string) {
    return this.currentUser;
  }
  signOut() {
    return this.currentUser;
  }
}