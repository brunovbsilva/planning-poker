import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { LayoutModule } from './layout/layout.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { PagesModule } from './pages/pages.module';

const config = {
  apiKey: "AIzaSyBxcb1o6HFEHy-RwZevt909OKSOqEpvW-g",
  authDomain: "planning-poker-cd302.firebaseapp.com",
  projectId: "planning-poker-cd302",
  storageBucket: "planning-poker-cd302.appspot.com",
  messagingSenderId: "903421093759",
  appId: "1:903421093759:web:79ee181c62d36ca5d09c4a"
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    PagesModule,
    AppRoutingModule,
    LayoutModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
