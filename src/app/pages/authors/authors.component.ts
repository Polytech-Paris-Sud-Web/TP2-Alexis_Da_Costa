import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../../author.service';
import { Author } from '../author/author.component';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  authors : Author[] | null;

  constructor(private authorService : AuthorService) {
      this.authors = null;
   }

  ngOnInit(): void {
    this.authorService.getAuthors().subscribe((data) => {
      this.authors = data;
    })
    console.table(this.authors);
  }

}
