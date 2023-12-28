import { AngularFireAuth, AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireAuthMock } from "./angular-fire-auth.mock";
import { AngularFireStorage, AngularFireStorageModule } from "@angular/fire/compat/storage";
import { AngularFireStorageMock } from "./angular-fire-storage.mock";
import { AngularFirestoreMock } from "./angular-firestore.mock";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";

const config = {
  apiKey: "mocked-api-key",
  authDomain: "mocked-auth-domain",
  projectId: "mocked-project-id",
  storageBucket: "mocked-storage-bucket",
  messagingSenderId: "mocked-messaging-sender-id",
  appId: "mocked-app-id"
}

export const AngularFireModulesMock = [
  AngularFireModule.initializeApp(config),
  AngularFirestoreModule,
  AngularFireAuthModule,
  AngularFireStorageModule
]

export const AngularFireProvidersMock = [
  { provide: AngularFireAuth, useClass: AngularFireAuthMock },
  { provide: AngularFireStorage, useClass: AngularFireStorageMock },
  { provide: AngularFireStorage, useClass: AngularFirestoreMock }
]