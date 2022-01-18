import { Component, OnInit } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
// import { MovieCardComponent } from '../movie-card/movie-card.component';
import { MatDialog } from '@angular/material/dialog';
// import { AppComponent } from '../app.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  // constructor(public dialog: MatDialog, private app: AppComponent) { }
  constructor(public dialog: MatDialog) { }

  // user: string | null = localStorage.getItem('username')
  // /** Only gets set when it's the first login after sign up. */
  // firstLogin: string | null = localStorage.getItem('firstLogin')
  ngOnInit(): void {
    // this.app.setLoggedIn(false);
  }
  // This is the function that will open the dialog when the signup button is clicked  
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Assigning the dialog a width
      width: '280px'
    });
  }
  // This is the function that will open the dialog when the login button is clicked  
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      // Assigning the dialog a width
      width: '280px'
    });
  }

}
