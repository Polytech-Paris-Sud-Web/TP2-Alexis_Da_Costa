import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../../article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
    
  @Input()
  article : Article | undefined;
  @Output() 
  deleteRequest = new EventEmitter<Article>();

  constructor(private route: ActivatedRoute, private articleService: ArticleService, private router: Router){
    this.article = undefined;
    
  }

  ngOnInit(): void {
    // this.route.params.subscribe((params) => {
    //   if (params["id"] !== undefined){
    //     this.articleService.getArticle(params["id"]).subscribe((data) => {
    //       this.article = data;
    //     });
    //   }
    // });
  }

  delete() {
      this.deleteRequest.emit(this.article);
  }

}

export interface Article {
  id: number,
  title: string;
  content: string;
  authors: string;
}