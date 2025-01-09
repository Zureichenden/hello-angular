import { InjectionToken } from '@angular/core';
import { AuthRepository } from 'app/domain/repositories/auth.repository'; 
import { ArticleRepository } from 'app/domain/repositories/article.repository'; 

export const AUTH_REPOSITORY = new InjectionToken<AuthRepository>('AuthRepository');
export const ARTICLE_REPOSITORY = new InjectionToken<ArticleRepository>('ArticleRepository');

