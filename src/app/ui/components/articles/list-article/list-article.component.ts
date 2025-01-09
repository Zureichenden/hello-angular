import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GetAllArticleUseCase } from 'app/domain/usecases/articles';
import { CommonModule } from '@angular/common';
import { Article } from 'app/domain/models/article.model';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TooltipModule],
})
export class ListArticleComponent implements OnInit {
  articleForm: FormGroup;
  articles: Article[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private getAllArticleUseCase: GetAllArticleUseCase,
    private router: Router

  ) {
    this.articleForm = this.formBuilder.group({
      search: [''],
      minPrice: [''],
      maxPrice: [''],
      stock: [''],
    });
  }

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(): void {
    this.isLoading = true;
    this.error = null;

    const params = this.articleForm.value;
    const searchParams: any = {};

    if (params.search) {
      searchParams.name = params.search;
    }
    if (params.minPrice) {
      searchParams.minPrice = params.minPrice;
    }
    if (params.maxPrice) {
      searchParams.maxPrice = params.maxPrice;
    }
    if (params.stock) {
      searchParams.stock = params.stock;
    }

    this.getAllArticleUseCase.execute(searchParams).subscribe({
      next: (articles) => {
        this.articles = articles;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching articles:', err);
        this.error = 'Error al obtener los artículos. Intente de nuevo más tarde.';
        this.isLoading = false;
      },
    });
  }

  refreshArticles(): void {
    this.articleForm.reset();
    this.getArticles();
  }

  navigateToCreateArticle(): void {
    this.router.navigate(['/articles/create']);
  }

}

