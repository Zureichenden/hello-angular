import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ArticleRepository } from './domain/repositories/article.repository';
import { ArticleRepositoryImpl } from './infraestructure/repositories/article.repository.impl';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: ArticleRepository, useClass: ArticleRepositoryImpl },

    provideHttpClient(withFetch(), withInterceptors([])),
    provideRouter(routes),
    provideZoneChangeDetection({ eventCoalescing: true }),
    
  ],
};