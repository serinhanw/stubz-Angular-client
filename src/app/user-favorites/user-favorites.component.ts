import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreCardComponent } from '../genre-card/genre-card.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';
import { DirectorCardComponent } from '../director-card/director-card.component';

@Component({
  selector: 'app-user-favorites',
  templateUrl: './user-favorites.component.html',
  styleUrls: ['./user-favorites.component.scss'],
})
export class UserFavoritesComponent implements OnInit {
  user: any = {};
  movies: any[] = [];
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) { }

  /**
   * When opens the components, gets the user information
   */
  ngOnInit(): void {
    // this.getUserFavorites();
    this.getUser()
  }

  /**
   * Gets the user information from backend
   */
  getUser(): void {
    let username = localStorage.getItem('user');
    this.fetchApiData.getUser(username).subscribe((res: any) => {
      // this.fetchApiData.getUser().subscribe((res: any) => {

      this.user = res;
      this.getFavoriteMovies();
      console.log(res);
    });
  }

  openGenreDialog(Name: string, Description: string): void {
    this.dialog.open(GenreCardComponent, {
      data: { Name, Description },
      width: '500px',
    });
  }

  openDirectorDialog(
    Name: string,
    Bio: string,
    Birthyear: any,
  ): void {
    this.dialog.open(DirectorCardComponent, {
      data: {
        Name,
        Bio,
        Birthyear,
      },
      width: '500px',
    });
  }

  openSynopsisDialog(
    Title: string,
    Description: string,
    Year: any,
  ): void {
    this.dialog.open(SynopsisCardComponent, {
      data: {
        Title,
        Description,
        Year,
      },
      width: '500px',
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

  removeFromFavorites(movieid: string, title: string): void {
    this.fetchApiData
      // .deleteMovie(this.user.username, movieid)
      .deleteMovie(movieid)
      .subscribe((res: any) => {
        this.snackBar.open(
          `${title} has been removed from your favorite movies`, 'Got it!',
          {
            duration: 2000,
          }
        );
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      });
    // this.getUserFavorites();
  }


  // isFavorites(movieId: string): boolean {
  //   return this.favoriteMovies.some((movie) => movie._id === movieId);
  // }

  // toggleFavorites(movie: any): void {
  //   this.isFavorites(movie._id)
  //     ? this.removeFromFavorites(movie._id, movie.Title)
  //     : this.addToFavorites(movie._id, movie.Title);
  // }
}