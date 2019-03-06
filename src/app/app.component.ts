import { Component } from '@angular/core';
import { AuthenticationService } from './login/authentication.service';
import { Router } from '@angular/router';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  pageTitle = 'Chhatrapati Shivaji Maratha Samaj Sangh Jabalpur';
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {

    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
