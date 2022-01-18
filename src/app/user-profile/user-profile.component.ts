import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent implements OnInit {
  user: any = {};
  movies: any[] = [];
  favoriteMovies: any[] = [];
  @Input() userData = { FirstName: '', username: '', password: '', email: '', Birthday: '' };

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    let username = localStorage.getItem('user');
    this.fetchApiData.getUser(username).subscribe((res: any) => {
      // this.fetchApiData.getUser().subscribe((res: any) => {

      this.user = res;
      this.getFavoriteMovies();
      console.log(res);
    });
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      this.movies.forEach((movie: any) => {
        // if (this.user.FavoriteMovies.includes(movie._id)) {
        if (this.user.favorites.includes(movie._id)) {
          this.favoriteMovies.push(movie);
        }
      });
    });
    console.log(this.favoriteMovies);
  }

  // removeFavoriteMovie(id: string, Title: string): void {
  //   this.fetchApiData.deleteMovie(id).subscribe((resp) => {
  //     console.log(resp);
  //     this.snackBar.open(
  //       `${Title} has been removed from your favorites!`,
  //       'OK',
  //       {
  //         duration: 2000,
  //       }
  //     );
  //     setTimeout(function () {
  //       window.location.reload();
  //     }, 1000);
  //   });
  // }

  deleteAccount(): void {
    this.fetchApiData.deleteUser().subscribe(() => {
      localStorage.clear();
      this.router.navigate(['/welcome']);
      this.snackBar.open('You have deleted your account succesfully!', 'OK', {
        duration: 4000,
      });
    });
  }
  openEditUserProfileDialog(): void {
    this.dialog.open(ProfileEditComponent, {
      // Assigning the dialog a width
      width: '50%'
    });
  }

}
