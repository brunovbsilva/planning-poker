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
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { TitleStrategy } from '@angular/router';
import { TitlePrefixStrategy } from './shared/strategies/title-prefix.strategy';

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
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    LayoutModule,
    PagesModule,
    SharedModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  exports: [
    SharedModule
  ],
  providers: [
    { provide: TitleStrategy, useClass: TitlePrefixStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
