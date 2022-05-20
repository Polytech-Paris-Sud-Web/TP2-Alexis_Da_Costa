import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ArticleService } from './services/article.service';
import { ArticleComponent } from './pages/article/article.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { HttpClientModule } from '@angular/common/http';
import { ArticleCreationComponent } from './pages/article-creation/article-creation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { AuthorComponent } from './pages/author/author.component';
import { ArticleDetailsComponent } from './pages/article-details/article-details.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AuthorsComponent } from './pages/authors/authors.component';
import { AuthorService } from './services/author.service';

const appRoutes: Routes = [
  { 
    path: 'create', 
    component: ArticleCreationComponent 
  },
  { 
    path: 'articles', 
    component: ArticlesComponent,
  },
  { 
    path: '', 
    component: ArticlesComponent
  },
  {
    path: "articles/:id",
    component: ArticleDetailsComponent
  },
  {
    path: "authors/:name",
    component: AuthorComponent
  },
  {
    path: "authors",
    component: AuthorsComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    ArticlesComponent,
    ArticleCreationComponent,
    NavbarComponent,
    AuthorComponent,
    ArticleDetailsComponent,
    AuthorsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } 
    ),
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [ArticleService, AuthorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
