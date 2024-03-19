import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"solyomsoft-task","appId":"1:1026912427102:web:da0fd7a7bca814d2afa8cf","storageBucket":"solyomsoft-task.appspot.com","apiKey":"AIzaSyDfV_H2XvIWj6jFX4ojqNLjBFFSbG96lLs","authDomain":"solyomsoft-task.firebaseapp.com","messagingSenderId":"1026912427102"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
