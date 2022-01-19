import { Injectable } from '@angular/core';
// import { catchError } from 'rxjs/internal/operators';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://stubz.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient, private router: Router) {
  }

  /**
   * Making an api call for the user registration endpoint
   * @param userDetails 
   * @returns status message: success or error
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      // return this.http.post(`${apiUrl}users`, userDetails).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Making an api call for the user login endpoint
   * @param userDetails 
   * @returns status message: success or error
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Making an API call to get all movies
   * @returns a list (array) of movies
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
    * Make an API call to get information about a specific movie
    * @param title 
    * @returns Object including data about a specific movie
  */
  getOneMovie(title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/${title}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Makes an API call to get information about a specific director
   * @param name 
   * @returns Object including data about a specific director
 */
  getDirector(name: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/directors/${name}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Makes an API call to get information about a specific genre
   * @param genre 
   * @returns Object including data about a specific genre
   */
  getGenre(genre: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/genres/${genre}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  /**
   * Makes an API call to get information about a user
   * @param user 
   * @returns Object consists of information about a user
   */
  getUser(user: any): Observable<any> {
    // getUser(): Observable<any> {
    // const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${user}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  /**
   * Makes an API call to get the list of favorite movies
   * @param user 
   * @returns a list (array) of favorite movies
   */
  getFavoriteMovies(user: any): Observable<any> {
    // getFavoriteMovies(): Observable<any> {
    // const user = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${user}/movies`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  /**
   * Makes an API call to add a movie the list of favorite movies
   * @param movieid 
   * @returns status message: success or error
   */
  addMovie(movieid: any): Observable<any> {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    // return this.http.patch(apiUrl + `users/${user}/movies/${movieid}`, {
    return this.http.post(apiUrl + `users/${user}/movies/${movieid}`, {},
      {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
  * Make an APi call to edit the user information
  * @param userDetails 
  * @returns status message: success or error
  */
  editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.put(apiUrl + `users/${username}`, userDetails, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  /**
   * Makes an API call to delete the account of a user
   * @returns status message: success or error
   */
  deleteUser(): Observable<any> {
    let user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${user}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      catchError(this.handleError)
    );
  }


  /**
   * Makes an APi call to delete a movie from the favorite movies
   * @param movieid 
   * @returns status message: success or error
   */
  deleteMovie(movieid: any): Observable<any> {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${user}/movies/${movieid}`, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  /**
     * Non-typed response extraction
     * @param res 
     * @returns body of response
     */// Non-typed response extraction
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

  /**
   * 
   * @param error 
   * @returns status of an error
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

}

