export class AngularFireStorageMock {
  ref(path: string) {
    return {
      getDownloadURL() {
        return new Promise((resolve) => resolve(''));
      }
    }
  }
}