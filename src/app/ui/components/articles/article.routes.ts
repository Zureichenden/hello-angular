import { Routes } from '@angular/router';
import { CreateArticleComponent } from './create-article/create-article.component'; 
import { ListArticleComponent } from './list-article/list-article.component';

export const ARTICLE_ROUTES: Routes = [
  {
    path:'',

    children:[
       {path:'',component: ListArticleComponent },     
       {path:'create',component: CreateArticleComponent },  
       { path: 'edit/:id', component: CreateArticleComponent },
    ]
  }

];