import {Component, OnInit} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
@Component({
  //Top component of the app, used to route to Home and to Create a house.
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, RouterLink, RouterOutlet],
  template: `
    <main>
    <a [routerLink]="['/']">
        <header class="brand-name">
          <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true" />
        </header>
      </a>
      <a [routerLink]="['/new']">
        Create
      </a>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  title = 'homes';
  constructor(private router: Router) { }
  ngOnInit() {
    this.router.navigate(['/']);
  }
}