import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Author, AuthorCreation } from '../models/author.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private apiUrl = environment.apiurl;
  private preloadAuthors : Author[] | undefined;

  constructor(private http : HttpClient) {
  } 

  public preload(): Observable<Author[]> {
    if (!this.preloadAuthors) {
      return this.http.get<Author[]>(`${this.apiUrl}/authors`).pipe(
        map(authors => {
          this.preloadAuthors = authors;
          return authors;
        })
      );
    }
    return of(this.preloadAuthors);
  }

  public getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.apiUrl + "/authors");
  }

  public getPreloadAuthors(): Observable<Author[]> {
    return this.preloadAuthors ? of(this.preloadAuthors) : this.http.get<Author[]>(`${this.apiUrl}/authors`);
  }

  public deleteAuthor(id: number): void {
    fetch(this.apiUrl + "/authors/" + id, { method: 'DELETE' });
  }

  public createAuthor(author: AuthorCreation): void {
    this.http.post<Author>(this.apiUrl + "/authors", author).subscribe();
  }

  public getAuthor(id: number): Observable<Author> {
    return this.http.get<Author>(this.apiUrl + "/authors/" + id);
  }
}