import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from '../../services/article.service';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html'
})
export class ArticleDetailsComponent implements OnInit {

  article : Article | undefined;
  constructor(route: ActivatedRoute, private articleService: ArticleService, private router: Router){
    this.article = undefined;
    route.params.subscribe((params) => {
      this.articleService.getPreloadArticles().subscribe((data) => {
        let articleFound = data.find((article) => article.id == params["id"]);
        if(!articleFound){
          alert("Article not found");
          this.router.navigate(["/"]);
        }
        else{
          this.article = articleFound;
        }
      });
    });
    
  }

  ngOnInit(): void {
  }
}
