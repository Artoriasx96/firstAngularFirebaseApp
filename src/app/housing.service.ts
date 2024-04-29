import {Injectable} from '@angular/core';
import {HousingLocation} from './housinglocation';
import {initializeApp} from "firebase/app";
import { collection, getFirestore, getDocs, doc, deleteDoc} from "firebase/firestore";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})

export class HousingService {

  constructor(private router: Router) { }

  firebaseConfig = {
    apiKey: "AIzaSyCHzqNHDdlM4ZOZcA0pDyQIFVW_W7yfubU",
    authDomain: "firstangularapp-c2f28.firebaseapp.com",
    databaseURL: "https://firstangularapp-c2f28-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "firstangularapp-c2f28",
    storageBucket: "firstangularapp-c2f28.appspot.com",
    messagingSenderId: "246176476651",
    appId: "1:246176476651:web:96393cf9cb2833a05abdae"
  };

  app = initializeApp(this.firebaseConfig);
  db = getFirestore(this.app);
  data : HousingLocation[] = [];

  redirect() {
    this.router.navigate(['']);
  }

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    this.data = JSON.parse(JSON.stringify((await getDocs(collection(this.db, 'locations'))).docs.map((doc, index)=> ({...doc.data(), fID: doc.id, id: index}))));
    return (this.data) ?? [];
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    return (this.data[id]) ?? {};
  }

  async delHousingLocationById(id: number) {
    deleteDoc(doc(this.db, "locations", String(this.data[id].fID)));
    this.getAllHousingLocations();
    return this.redirect();
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    // tslint:disable-next-line
    console.log(firstName, lastName, email);
  }
}