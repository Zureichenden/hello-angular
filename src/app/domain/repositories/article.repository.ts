import { Observable } from 'rxjs';
import { Article } from '../models/article.model'; 
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})

export abstract class ArticleRepository {
  abstract createArticle(article: Article): Observable<Article>;
  abstract getArticles(params: any): Observable<Article[]>;
  abstract getArticleById(id: number): Observable<Article>;
  abstract updateArticle(article: Article): Observable<Article>;
  abstract deleteArticle(id: number): Observable<void>;
  abstract enableArticle(id: number): Observable<void>; 
  abstract disableArticle(id: number): Observable<void>; 
}
