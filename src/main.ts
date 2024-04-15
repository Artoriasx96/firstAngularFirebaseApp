/*
 *  Protractor support is deprecated in Angular.
 *  Protractor is used in this example for compatibility with Angular documentation tools.
 */
import {bootstrapApplication, provideProtractorTestingSupport} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {provideRouter} from '@angular/router';
import routeConfig from './app/routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { importProvidersFrom } from '@angular/core';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
bootstrapApplication(AppComponent, {
  providers: [provideProtractorTestingSupport(), provideRouter(routeConfig), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"firstangularapp-c2f28","appId":"1:246176476651:web:96393cf9cb2833a05abdae","databaseURL":"https://firstangularapp-c2f28-default-rtdb.europe-west1.firebasedatabase.app","storageBucket":"firstangularapp-c2f28.appspot.com","apiKey":"AIzaSyCHzqNHDdlM4ZOZcA0pDyQIFVW_W7yfubU","authDomain":"firstangularapp-c2f28.firebaseapp.com","messagingSenderId":"246176476651"}))), importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideStorage(() => getStorage()))],
}).catch((err) => console.error(err));