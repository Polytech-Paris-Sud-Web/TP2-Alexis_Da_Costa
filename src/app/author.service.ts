import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { Author } from './pages/author/author.component';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http : HttpClient) {
  } 

  public getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>("http://localhost:3000/authors");
  }

  public deleteAuthor(id: number): void {
    fetch("http://localhost:3000/authors/" + id, { method: 'DELETE' });
  }

  public createAuthor(author: Omit<Author, "id">): void {
    this.http.post<Author>("http://localhost:3000/authors", author).subscribe(
      (data) => {
        console.log(data);
      }
    );
    console.log("Posted author: " + author);
  }

  public getAuthor(id: number): Observable<Author> {
    return this.http.get<Author>("http://localhost:3000/authors/" + id);
  }
}
