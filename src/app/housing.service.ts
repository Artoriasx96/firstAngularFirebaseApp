import {Injectable} from '@angular/core';
import {HousingLocation} from './housinglocation';
import {initializeApp} from "firebase/app";
import {collection, getFirestore, getDocs} from "firebase/firestore";

@Injectable({
  providedIn: 'root',
})

export class HousingService {

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

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const snapshot = await getDocs(collection(this.db, 'locations'));
    const data = (await snapshot).docs.map(doc => doc.data());
    const jsonData = JSON.parse(JSON.stringify(data));
    return (jsonData) ?? [];
  }
  

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const snapshot = await getDocs(collection(this.db, 'locations'));
    const data = (await snapshot).docs.map(doc => doc.data());
    const jsonData = JSON.parse(JSON.stringify(data));
    return (jsonData[id]) ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    // tslint:disable-next-line
    console.log(firstName, lastName, email);
  }
}