import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleRepository } from '../../repositories/article.repository';
import { Article } from '../../models/article.model';
import { ARTICLE_REPOSITORY } from 'app/tokens/injection-tokens'; 

@Injectable({ providedIn: 'root' })


export class CreateArticleUseCase {
  constructor( private articleRepository: ArticleRepository) {}

  execute(article: Article): Observable<Article> {
    return this.articleRepository.createArticle(article);
  }
}

