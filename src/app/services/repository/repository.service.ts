import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  constructor(private http: HttpClient) {}

  getAll<T>(baseUrl: string): Observable<T[]> {
    return this.http.get<T[]>(baseUrl).pipe(catchError(this.handleError));
  }

  create<T>(item: T, baseUrl: string): Observable<T> {
    return this.http.post<T>(baseUrl, item).pipe(catchError(this.handleError));
  }

  update<T>(id: number, item: T, baseUrl: string): Observable<void> {
    return this.http
      .put<void>(`${baseUrl}${id}/`, item)
      .pipe(catchError(this.handleError));
  }

  delete(id: number, baseUrl: string): Observable<void> {
    return this.http
      .delete<void>(`${baseUrl}${id}/`)
      .pipe(catchError(this.handleError));
  }

  getById<T>(id: number, baseUrl: string): Observable<T> {
    return this.http
      .get<T>(`${baseUrl}${id}/`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code ${error.status}, message was: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
