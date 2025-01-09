import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleRepository } from '../../repositories/article.repository';
import { Article } from '../../models/article.model';

@Injectable({ providedIn: 'root' })


export class GetAllArticleUseCase {
  constructor( private articleRepository: ArticleRepository) {}

  execute(params: any): Observable<Article[]> {
    return this.articleRepository.getArticles(params);
  }
}

