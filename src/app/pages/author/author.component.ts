import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from 'src/app/models/author.model';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html'
})
export class AuthorComponent implements OnInit {

  author: Author | undefined;
  constructor(private route: ActivatedRoute, private authorService: AuthorService, private router: Router) { 
    this.author = undefined;
    route.params.subscribe((params) => {
      this.authorService.getPreloadAuthors().subscribe((data) => {
        let authorFind = data.find((author) => author.name == params["name"]);
        if(!authorFind){
          this.author = {
            name: params["name"],
            bio: "Author not found in database, so the bio is unvailable. Please create this user.",
            id: -1
          }
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