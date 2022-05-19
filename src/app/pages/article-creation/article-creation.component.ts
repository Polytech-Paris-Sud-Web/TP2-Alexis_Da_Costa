import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ArticleService } from '../../article.service';

@Component({
  selector: 'app-article-creation',
  templateUrl: './article-creation.component.html',
  styleUrls: ['./article-creation.component.css']
})
export class ArticleCreationComponent implements OnInit {
  articleForm : FormGroup;

  constructor(private fb: FormBuilder, private articleService: ArticleService, private router: Router) {
    this.articleForm = this.fb.group({
      title: ['', Validators.required ],
      content : ['', Validators.required ],
      authors : ['', Validators.required ],
    });
  }

  createArticle(): void {
    const { title, content, authors } = this.articleForm.value;
    const newArticle = {
      title,
      content,
      authors,
    }
    this.articleService.createArticle(newArticle);
    this.articleService.preload().subscribe();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  ngOnInit(): void {
  }

}
