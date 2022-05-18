import { Injectable } from '@angular/core';
import { Article } from './pages/article/article.component';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http : HttpClient) {
  } 

  public getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>("http://localhost:3000/articles");
  }

  public deleteArticle(id: number): void {
    fetch("http://localhost:3000/articles/" + id, { method: 'DELETE' });
  }

  public createArticle(article: Omit<Article, "id">): void {
    this.http.post<Article>("http://localhost:3000/articles", article).subscribe(
      (data) => {
        console.log(data);
      }
    );
    console.log("Posted article: " + article);
  }

  public getArticle(id: number): Observable<Article> {
    return this.http.get<Article>("http://localhost:3000/articles/" + id);
  }
}
