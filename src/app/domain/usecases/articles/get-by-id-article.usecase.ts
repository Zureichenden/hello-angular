import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleRepository } from '../../repositories/article.repository';
import { Article } from '../../models/article.model';

@Injectable({ providedIn: 'root' })


export class GetByIdArticleUseCase {
  constructor( private articleRepository: ArticleRepository) {}

  execute(id: number): Observable<Article> {
    return this.articleRepository.getArticleById(id);
  }
}

