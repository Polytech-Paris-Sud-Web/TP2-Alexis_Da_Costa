import { Injectable } from '@angular/core';
import { Article } from './pages/article/article.component';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = "https://my-json-server.typicode.com/Polytech-Paris-Sud-Web/TP2-Alexis_Da_Costa";
  // private apiUrl = "http://localhost:3000";

  constructor(private http : HttpClient) {
  } 

  public getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl + "/articles");
  }

  public deleteArticle(id: number): void {
    fetch(this.apiUrl + "/articles/" + id, { method: 'DELETE' });
  }

  public createArticle(article: Omit<Article, "id">): void {
    this.http.post<Article>(this.apiUrl + "/articles", article).subscribe(
      (data) => {
        console.log(data);
      }
    );
    console.log("Posted article: " + article);
  }

  public getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(this.apiUrl + "/articles/" + id);
  }
}
