import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {DetailsComponent} from './details/details.component';
import {CreateComponent} from './create/create.component';
import {UpdateComponent} from './update/update.component';

const routeConfig: Routes = [
  //Defines which routes are used by the app and which component manages each route.
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
  },
  {
    path: 'edit/:id',
    component: UpdateComponent,
    title: 'Edit details',
  }
];
export default routeConfig;