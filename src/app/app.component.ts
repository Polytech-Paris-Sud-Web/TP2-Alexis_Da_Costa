import { Component } from '@angular/core';
import { ArticleService } from './services/article.service';
import { AuthorService } from './services/author.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
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
