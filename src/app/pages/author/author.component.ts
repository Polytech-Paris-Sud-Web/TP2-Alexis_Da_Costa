import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorService } from '../../author.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  author: Author | undefined;
  constructor(private route: ActivatedRoute, private authorService: AuthorService, private router: Router) { 
    this.author = undefined;
    route.params.subscribe((params) => {
      this.authorService.getAuthors().subscribe((data) => {
        let authorFind = data.find((author) => author.name == params["name"]);
        if(!authorFind){
          alert("Author not found in database");
          this.author = undefined
          this.router.navigate(['/']);
        }
        else{
          this.author = authorFind
        }
        
      }, (error) => {
        alert("Authors not found with error code: " + error.status);
        this.router.navigate(["/"]);
      });
    });
  }

  ngOnInit(): void {
  }

}

export type Author = {
  id: number,
  name: string;
  bio?: string;
}