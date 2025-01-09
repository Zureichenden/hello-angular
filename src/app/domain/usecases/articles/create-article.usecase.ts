import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleRepository } from '../../repositories/article.repository';
import { Article } from '../../models/article.model';

@Injectable({ providedIn: 'root' })


export class CreateArticleUseCase {
  constructor( private articleRepository: ArticleRepository) {}

  execute(article: Article): Observable<Article> {
    return this.articleRepository.createArticle(article);
  }
}

