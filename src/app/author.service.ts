import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { map, Observable, of } from 'rxjs';
import { Author } from './pages/author/author.component';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  // private apiUrl = "https://my-json-server.typicode.com/Polytech-Paris-Sud-Web/TP2-Alexis_Da_Costa";
  private apiUrl = "http://localhost:3000";
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

  public deleteAuthor(id: number): void {
    fetch(this.apiUrl + "/authors/" + id, { method: 'DELETE' });
  }

  public createAuthor(author: Omit<Author, "id">): void {
    this.http.post<Author>(this.apiUrl + "/authors", author).subscribe(
      (data) => {
        console.log(data);
      }
    );
    console.log("Posted author: " + author);
  }

  public getAuthor(id: number): Observable<Author> {
    return this.http.get<Author>(this.apiUrl + "/authors/" + id);
  }
}
