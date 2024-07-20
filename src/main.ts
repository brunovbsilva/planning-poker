import { AppComponent } from './app/app.component';
import { isDevMode, importProvidersFrom } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { TitlePrefixStrategy } from './app/shared/strategies/title-prefix.strategy';
import { provideRouter, TitleStrategy } from '@angular/router';
import { routes } from "./app/app-routing";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import {FIREBASE_OPTIONS} from "@angular/fire/compat";


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      ServiceWorkerModule.register(
        'ngsw-worker.js', {
        enabled: !isDevMode(),
        registrationStrategy: 'registerWhenStable:30000'
      })
    ),
    provideAnimations(),
    provideRouter(routes),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideFirebaseApp(() => initializeApp()),
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig },
    { provide: TitleStrategy, useClass: TitlePrefixStrategy },
  ]
})
  .catch(err => console.error(err));
