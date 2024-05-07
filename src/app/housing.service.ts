import {Injectable} from '@angular/core';
import {HousingLocation} from './housinglocation';
import {initializeApp} from "firebase/app";
import {collection, getFirestore, getDocs, doc, deleteDoc, addDoc, updateDoc} from "firebase/firestore";
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root',
})

export class HousingService {
  //Router is initialized to be used later to redirect.
  constructor(private router: Router) { }
  //Firebase database is initialized using the firebaseConfig.
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

  async getAllHousingLocations(): Promise<HousingLocation[]> {
    //All Firebase data is queried and parsed into a JSON array.
    this.data = JSON.parse(JSON.stringify((await getDocs(collection(this.db, 'locations'))).docs.map((doc, index)=> ({...doc.data(), fID: doc.id, id: index}))));
    return (this.data) ?? [];
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    //Specific house data by the id is queried to Firebase and parsed into a JSON array.
    return (this.data[id]) ?? {};
  }

  async delHousingLocationById(id: number) {
    //Specific house by the id is queried to be deleted to Firebase. The data is queried again to refresh the app and it's redirected to the home page.
    deleteDoc(doc(this.db, "locations", String(this.data[id].fID)));
    this.router.navigate(['/']);
  }

  async addHousingLocation(name: string, city: string, state: string, photo: string, availableUnits: number, wifi: boolean, laundry: boolean) {
    //A new house is queried to be added to Firebase. The data is queried again to refresh the app and it's redirected to the home page.
    await addDoc(collection(this.db, "locations"), {
      name: name,
      city: city,
      state: state,
      photo: photo,
      availableUnits: availableUnits,
      wifi: wifi,
      laundry: laundry
    });
    this.router.navigate(['/']);
  }

  async updateHousingLocation(fID: string, id: number, name: string, city: string, state: string, photo: string, availableUnits: number, wifi: boolean, laundry: boolean) {
    //Specific house by the id is queried to be updated to Firebase. The data is queried again to refresh the app and it's redirected to the details page of the modified house.
    await updateDoc(doc(this.db, "locations", fID), {
      name: name,
      city: city,
      state: state,
      photo: photo,
      availableUnits: availableUnits,
      wifi: wifi,
      laundry: laundry
    });
    return this.router.navigate(['details/',id]);
  }

}