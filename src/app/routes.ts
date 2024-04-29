import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DetailsComponent} from './details/details.component';
import { HousingService } from './housing.service';
import { CreateComponent } from './create/create.component';

const routeConfig: Routes = [
    {
      path: '',
      component: HomeComponent,
      title: 'Home page',
    },
    {
      path: 'details/:id',
      component: DetailsComponent,
      title: 'Home details',
    },
    {
      path: 'new',
      component: CreateComponent,
      title: 'Add a House',
    }
  ];
  export default routeConfig;