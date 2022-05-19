import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../article.service';
import { Article } from '../article/article.component';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {

  article : Article | undefined;
  constructor(route: ActivatedRoute, private articleService: ArticleService, private router: Router){
    this.article = undefined;
    route.params.subscribe((params) => {
      // this.articleService.getArticle(params["id"]).subscribe((data) => {
      //     this.article = data;
      // }, (error) => {
      //   alert("Article not found with error code: " + error.status);
      //   this.router.navigate(["/"]);
      // });

      this.articleService.getArticles().subscribe((data) => {
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
