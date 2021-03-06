import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Article, ArticleCreation } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private apiUrl = environment.apiurl;
  public preloadArticles : Article[] | undefined;

  constructor(private http : HttpClient) {
  } 

  public preload(): Observable<Article[]> {
    if (!this.preloadArticles) {
      return this.http.get<Article[]>(`${this.apiUrl}/articles?_sort=id&_order=desc`).pipe(
        map(articles => {
          this.preloadArticles = articles;
          return articles;
        })
      );
    }
    return of(this.preloadArticles);
  }
  

  public getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl + "/articles?_sort=id&_order=desc");
  }

  public getPreloadArticles(): Observable<Article[]> {
    return this.preloadArticles ? of(this.preloadArticles) : this.http.get<Article[]>(`${this.apiUrl}/articles?_sort=id&_order=desc`);
  }

  public deleteArticle(id: number): void {
    fetch(this.apiUrl + "/articles/" + id, { method: 'DELETE' });
  }

  public createArticle(article: ArticleCreation): void {
    this.http.post<Article>(this.apiUrl + "/articles", article).subscribe();
  }

  public getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(this.apiUrl + "/articles/" + id);
  }

  public getPreloadArticle(id : number): Observable<Article> {
    return this.preloadArticles ? of(this.preloadArticles.filter(article => article.id === id)[0]) : this.http.get<Article>(this.apiUrl + "/articles/" + id);
  }
}