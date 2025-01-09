import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleRepository } from '../../repositories/article.repository';
import { Article } from '../../models/article.model';

@Injectable({ providedIn: 'root' })


export class DisableArticleUseCase {
  constructor( private articleRepository: ArticleRepository) {}

  execute(idArticle: number): Observable<void> {
    return this.articleRepository.disableArticle(idArticle);
  }
}

