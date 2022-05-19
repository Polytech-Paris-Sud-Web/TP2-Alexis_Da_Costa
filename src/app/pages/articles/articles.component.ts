import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ArticleService } from '../../article.service';
import { Article } from '../article/article.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  sliced : boolean = false;
  articles: Article[] | null;
  searchForm : FormGroup;

  constructor(private fb: FormBuilder, private articleService: ArticleService, private router: Router) {
    this.articles = null;
    this.searchForm = this.fb.group({
      search: ['', Validators.required ]
    })
    if(router.url == "/"){
      this.sliced = true;
    }
  }

  ngOnInit(): void {
    this.articleService.getArticles().subscribe((data) => {
      this.articles = this.sliced ? data.slice(0, 10) : data;
    });
  }

  deleteArticle(article: Article): void {
    let toDelete : boolean = confirm("Are you sure you want to delete this article?");
    console.log(article);
    if(toDelete){
      this.articleService.deleteArticle(article.id);
      this.articleService.getArticles().subscribe((data) => {
        this.articles = this.sliced ? data.slice(0, 10) : data;
      });
    }
  }

  filterBySearch(): void {
    const { search } = this.searchForm.value;  
    this.articleService.getArticles().subscribe((data) => {
      this.articles = data;
      this.articles = this.articles.filter((article) => {
        return article.title.toLowerCase().includes(search.toLowerCase());
      });
    });
  }

  clearSearch(): void {
    this.searchForm.reset();
    this.articleService.getArticles().subscribe((data) => {
      this.articles = this.sliced ? data.slice(0, 10) : data;
    });
  }
}
