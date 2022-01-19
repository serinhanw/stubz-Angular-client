import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { GenreCardComponent } from '../genre-card/genre-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';
import { AppComponent } from '../app.component';
import { NavbarComponent } from '../navbar/navbar.component';

const username = localStorage.getItem('user');

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  user: any = {};
  movies: any[] = [];
  favoriteMovies: any[] = [];
  directors: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    // public app: AppComponent,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
    // this.app.navigationHome = true;
    // this.app.navigationUser = true;
    // this.app.navigationUser = false;

    // this.app.setLoggedIn(true);

    this.getMovies();
    this.getUser(username);
    this.getUserFavorites();
  }


  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getUser(username: any): void {
    this.fetchApiData.getUser(username).subscribe((resp: any) => {
      // this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    })
  }

  openGenreDialog(Name: string, Description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: {
        Name,
        Description
      },
      width: '500px',
    });
  }

  openDirectorDialog(Name: string, Bio: string, Birthyear: any): void {
    this.dialog.open(DirectorCardComponent, {
      data: {
        Name,
        Bio,
        Birthyear,
      },
      width: '500px',
    });
  }

  openSynopsisDialog(Title: string, Description: string, Year: string): void {
    this.dialog.open(SynopsisCardComponent, {
      data: {
        Title,
        Description,
        Year
      },
      width: '500px',
    });
  }

  // updateFavorites(): void {
  //   this.fetchApiData.getUser(this.user).subscribe((res: any) => {
  //     this.favoriteMovies = res.FavoriteMovies;
  //     return this.favoriteMovies;
  //   });
  // }


  getUserFavorites(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      // this.fetchApiData.getUser(this.user.username).subscribe((resp: any) => {
      this.favoriteMovies = resp.favorites;
      return this.favoriteMovies;
      // this.user = resp.user;
      // resp.user.favoriteMovies.forEach((favorite: { _id: string }) => this.favoriteMovies.push(favorite._id))
    });
  }

  addToFavorites(movieid: any, title: string): void {
    // addToFavorites(movieid: string): void {
    this.fetchApiData
      // .addMovie(this.user.username, movieid)
      .addMovie(movieid)
      .subscribe((res: any) => {
        this.snackBar.open(
          `${title} has been added to your favorite movies`, 'Yay!',
          {
            duration: 2000,
          })
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        // this.ngOnInit();
        this.getUserFavorites();
      });
  }

  removeFromFavorites(movieid: any, title: string): void {
    this.fetchApiData
      .deleteMovie(movieid)
      .subscribe((res: any) => {
        this.snackBar.open(
          `${title} has been removed from your favorite movies`, 'Got it!',
          {
            duration: 2000,
          })
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        this.getUserFavorites();
      });
  }

  isFavorites(movieId: any): any {
    if (this.favoriteMovies.includes(movieId)) {
      return true;
    } else {
      return false;
    }
  }

}

