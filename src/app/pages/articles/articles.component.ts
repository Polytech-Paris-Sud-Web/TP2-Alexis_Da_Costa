import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ArticleService } from '../../article.service';
import { Article } from '../article/article.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: Article[] | null;
  searchForm : FormGroup;

  constructor(private fb: FormBuilder, private articleService: ArticleService) {
    this.articles = null;
    this.searchForm = this.fb.group({
      search: ['', Validators.required ]
    })
  }

  ngOnInit(): void {
    this.articleService.getArticles().subscribe((data) => {
      // Get the 10 most recent articles 
      this.articles = data.reverse().slice(0, 10);
    });
  }

  deleteArticle(article: Article): void {
    let toDelete : boolean = confirm("Are you sure you want to delete this article?");
    console.log(article);
    if(toDelete){
      this.articleService.deleteArticle(article.id);
      this.articleService.getArticles().subscribe((data) => {
        this.articles = data.reverse().slice(0, 10);
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
      this.articles = data.slice(0, 10);
    });
  }
}
