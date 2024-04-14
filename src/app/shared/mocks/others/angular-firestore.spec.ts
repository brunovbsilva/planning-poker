import { Observable, Subject, of } from "rxjs";
import { RoomItemMock } from "../constants";

class Doc {
  public value: Subject<any> = new Subject<any>();
  update(value: any): void {
    this.value.next(value);
  }
  delete(): void {
    this.value.next(null);
  }
  valueChanges(): Observable<any> {
    return this.value.asObservable();
  }
}

class Collection {
  public value: Subject<any> = new Subject<any>();
  add(value: any): void {
    this.value.next(value);
  }
  snapshotChanges(): Observable<any> {
    return of([{ payload: { doc: { data: () => RoomItemMock, id: RoomItemMock.id } } }]);
  }
}

export class AngularFirestoreMock {
  private docObj: Doc = new Doc();
  private collectionObj: Collection = new Collection();
  getResult() {
    return this.docObj.value;
  }
  collection(path: string) {
    return this.collectionObj;
  }
  doc(path: string) {
    return this.docObj;
  }

 
}