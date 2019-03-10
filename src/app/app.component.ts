import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from './login/authentication.service';
import { Router } from '@angular/router';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  
  pageTitle = 'Chhatrapati Shivaji Maratha Samaj Sangh Jabalpur';
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {

    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    let context = this;
    window.addEventListener("beforeunload", function (e) {
        let currentUser : User = JSON.parse(localStorage.getItem('currentUser'));
        if(currentUser){
            context.logout();
        }
    });
}

  ngOnDestroy(): void {
    this.logout();
  }
  
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
