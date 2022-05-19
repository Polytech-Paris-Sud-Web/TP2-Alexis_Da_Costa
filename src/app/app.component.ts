import { Component } from '@angular/core';
import { ArticleService } from './article.service';
import { AuthorService } from './author.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'simple-app';

  constructor(private articleService : ArticleService, private authorService : AuthorService){

  }

  ngOnInit() {
    this.articleService.preload().subscribe();
    this.authorService.preload().subscribe();
  }
}
