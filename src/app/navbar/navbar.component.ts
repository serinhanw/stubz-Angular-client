import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  /** Navigates to home. */
  toHome(): void {
    this.router.navigate(['/movies']);
  }

  /** Navigates to user view. */
  toUser(): void {
    this.router.navigate(['user']);
  }

  toFavorites(): void {
    this.router.navigate(['favorites']);
  }

  userLogout(): void {
    localStorage.clear();
    this.snackBar.open('You successfully logged out! 👋', 'Catch ya later!', {
      duration: 2000,
    });
    this.router.navigate(['/welcome']).then(() => {
      window.location.reload();
    });
  }

}




