export interface HousingLocation {
  //Interface used to store the data received from the database following a JSON structure.
  fID: string;
  id: number;
  name: string;
  city: string;
  state: string;
  photo: string;
  availableUnits: number;
  wifi: boolean;
  laundry: boolean;
}