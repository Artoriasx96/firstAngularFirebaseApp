import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {HousingService} from '../housing.service';
import {HousingLocation} from '../housinglocation';


@Component({
    selector: 'app-create',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    template: ` 
    <article>
    <section class="listing-apply">
      <h2 class="section-heading">Add a new house</h2>
      <form [formGroup]="applyForm" (submit)="submitApplication()">
        <label for="name">Name</label>
        <input id="name" type="text" formControlName="name" />
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
        <button type="submit" class="primary">Add</button>
      </form>
    </section>
  </article>`,
    styleUrl: './create.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent { 
    housingService = inject(HousingService);
    applyForm = new FormGroup({
      name: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      photo: new FormControl(''),
      availableUnits: new FormControl(1),
      wifi: new FormControl(false),
      laundry: new FormControl(false),
    });

    submitApplication() {
      this.housingService.addHousingLocation(
        this.applyForm.value.name ?? '',
        this.applyForm.value.city ?? '',
        this.applyForm.value.state ?? '',
        this.applyForm.value.photo ?? '',
        this.applyForm.value.availableUnits ?? 1,
        this.applyForm.value.wifi ?? false,
        this.applyForm.value.laundry ?? false,
      );
    }
}
