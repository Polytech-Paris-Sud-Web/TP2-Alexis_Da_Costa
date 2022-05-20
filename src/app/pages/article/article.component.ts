import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from '../../services/article.service';

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
  }

  delete() {
      this.deleteRequest.emit(this.article);
  }

}
