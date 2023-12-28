export class AngularFirestoreMock {
  collection() {
    return {
      valueChanges() {
        return new Promise((resolve) => resolve({}));
      },
      doc() {
        return {
          valueChanges() {
            return new Promise((resolve) => resolve({}));
          },
          set() {
            return new Promise((resolve) => resolve({}));
          }
        }
      }
    }
  }
}