import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {HousingService} from '../housing.service';
import {HousingLocation} from '../housinglocation';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  
  template: ` 
  <article>
  <section class="listing-apply">
    <h2 class="section-heading">Edit this house</h2>
    <form [formGroup]="applyForm" (submit)="submitApplication()">
      <label for="name">Name</label>
      <input id="name" type="text" formControlName="name" value="{{this.housingLocation?.name}}"/>
      <label for="city">City</label>
      <input id="city" type="text" formControlName="city" />
      <label for="state">State</label>
      <input id="state" type="text" formControlName="state" />
      <label for="photo">Photo</label>
      <input id="photo" type="text" formControlName="photo" />
      <label for="availableUnits">Available Units</label>
      <input id="availableUnits" type="number" formControlName="availableUnits" />
      <label for="wifi">Wi-Fi</label>
      <input id="wifi" type="checkbox" formControlName="wifi" />
      <label for="laundry">Laundry</label>
      <input id="laundry" type="checkbox" formControlName="laundry" />
      <button type="submit" class="primary">Edit</button>
    </form>
  </section>
</article>`,
  styleUrls: ['./update.component.css'],
})

export class UpdateComponent {
  //The route :id parameter is parsed into an integer that is used to call the housingService.getHousingLocationById() function and returns a specific house by the id.
  //Fills the form with the current data of the house and allows you to modify and update it by pushing the Edit button which calls the submitApplication() that does an UPDATE query by calling the housingService.updateHousingLocation() function.
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;

  applyForm = new FormGroup({
    name: new FormControl(),
    city: new FormControl(),
    state: new FormControl(),
    photo: new FormControl(),
    availableUnits: new FormControl(),
    wifi: new FormControl(),
    laundry: new FormControl(),
  });

  constructor() {
    const housingLocationId = parseInt(this.route.snapshot.params['id'], 10);
    this.housingService.getHousingLocationById(housingLocationId).then((housingLocation) => {
        this.housingLocation = housingLocation;
        this.applyForm.setValue({
            name: this.housingLocation?.name ?? '', 
            city: this.housingLocation?.city ?? '', 
            state: this.housingLocation?.state ?? '',
            photo: this.housingLocation?.photo ?? '',
            availableUnits: this.housingLocation?.availableUnits ?? 0,
            wifi: this.housingLocation?.wifi ?? false,
            laundry: this.housingLocation?.laundry ?? false
        });
    });
  }

  submitApplication() {
    this.housingService.updateHousingLocation(
        this.housingLocation?.fID ?? '',
        this.housingLocation?.id ?? 0,
        this.applyForm.value.name ?? '',
        this.applyForm.value.city ?? '',
        this.applyForm.value.state ?? '',
        this.applyForm.value.photo ?? '',
        this.applyForm.value.availableUnits ?? 0,
        this.applyForm.value.wifi ?? false,
        this.applyForm.value.laundry ?? false,
    );
    this.housingService.getAllHousingLocations();
  }
}