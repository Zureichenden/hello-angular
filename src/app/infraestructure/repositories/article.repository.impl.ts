import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "app/config/api.config";
import { Article } from "app/domain/models/article.model";
import { ArticleRepository } from "app/domain/repositories/article.repository";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArticleRepositoryImpl implements ArticleRepository {
  private apiUrl = API_CONFIG.baseUrl + API_CONFIG.endpoints.articles;

  constructor(private http: HttpClient) {}

  createArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(this.apiUrl, article);
  }

  getArticles(params: any): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl, { params });
  }

  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiUrl}/${id}`);
  }

  updateArticle(article: Article): Observable<Article> {
    return this.http.put<Article>(`${this.apiUrl}/${article.id}`, article);
  }

  deleteArticle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
