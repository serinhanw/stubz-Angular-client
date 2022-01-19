import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApplicationRef } from '@angular/core';

import { OverlayContainer } from '@angular/cdk/overlay';
import { UserLoginFormComponent } from './user-login-form/user-login-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

// export class AppComponent implements OnInit {
export class AppComponent {
  title = 'myFlix-Angular-client';

  // constructor(
  //   private router: Router,
  //   private snackBar: MatSnackBar,
  //   private overlay: OverlayContainer
  // ) { }

  /** Determines loader on top of page. */
  // loading: boolean = false
  // loggedIn: boolean = true
  // loggedIn: boolean = false
  /** Alters title depending on screensize. */
  // dynamicTitle: string = 'Stubz'
  /** Determines which menu symbol is highlighted. */
  // navigationHome: boolean = true
  /** Determines which menu symbol is highlighted. */
  // navigationUser: boolean = true
  // navigationUser: boolean = false
  /** Determines which menu symbol is highlighted. */
  // navigationFavorites: boolean = true

  // ngOnInit(): void {
  //   this.getWindowWidth();
  //   window.addEventListener('resize', this.getWindowWidth);
  // }

  // /** Checks screen width and then sets a long or short page title. */
  // getWindowWidth = (): void => {
  //   if (window.innerWidth < 768) {
  //     this.dynamicTitle = 'Stubz'
  //   } else {
  //     this.dynamicTitle = 'Stubz'
  //   }
  // }

  // /** Sets login status. */
  // public setLoggedIn(value: boolean): void {
  //   this.loggedIn = value;
  //   // public setLoggedIn(value: boolean = true): void {
  //   //   this.loggedIn = value;

  // }

  // /** Navigates to home. */
  // toHome(): void {
  //   this.router.navigate(['/movies']);
  // }

  // /** Navigates to user view. */
  // toUser(): void {
  //   this.router.navigate(['user']);
  // }

  // toFavorites(): void {
  //   this.router.navigate(['favorites']);
  // }

  // /** Logs user out. */
  // logout(): void {
  //   this.loggedIn = false;

  //   localStorage.removeItem('username');
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('id');
  //   this.snackBar.open('You\'ve logged out.', 'OK', { duration: 5000 });
  //   this.router.navigate(['']);
  // }
}