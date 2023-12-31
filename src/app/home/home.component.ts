import { Component,inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { Housinglocation } from '../housinglocation';
import { HousingService } from '../housing.service';
import { RouterLink,RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HousingLocationComponent,RouterOutlet
  ],
  template: `
    <section>
      <router-outlet></router-outlet>
      <form>
        <input type="text" placeholder="Filter by city" #filter>
        <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
    <app-housing-location *ngFor=" let housingLocation of filteredLocationList" [housingLocation]="housingLocation"></app-housing-location>
  </section>
  `,
  styleUrls: ['./home.component.css'],
})

export class HomeComponent {
  readonly baseUrl = 'https://angular.io/assets/images/tutorials/faa';

  housingLocationList:Housinglocation[]=[];
  filteredLocationList: Housinglocation[] = [];
  housingService:HousingService=inject(HousingService)
  filterResults(text: string) {
    if (!text) {
      this.filteredLocationList = this.housingLocationList;
    }
  
    this.filteredLocationList = this.housingLocationList.filter(
      housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    );
  }
  constructor() {
    this.housingLocationList=this.housingService.getAllHousingLocations();
    this.filteredLocationList=this.housingLocationList;
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/