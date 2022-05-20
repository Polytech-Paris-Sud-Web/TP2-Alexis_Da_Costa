import { Component, OnInit } from '@angular/core';
import { Author } from 'src/app/models/author.model';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html'
})
export class AuthorsComponent implements OnInit {
  authors : Author[] | null;

  constructor(private authorService : AuthorService) {
      this.authors = null;
   }

  ngOnInit(): void {
    this.authorService.getPreloadAuthors().subscribe((data) => {
      this.authors = data;
    })
    console.table(this.authors);
  }

}
