import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DeleteArticleUseCase, DisableArticleUseCase, EnableArticleUseCase, GetAllArticleUseCase } from 'app/domain/usecases/articles';
import { CommonModule } from '@angular/common';
import { Article, ArticleStatus, ArticleUtils } from 'app/domain/models/article.model';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from 'shared/confirm-modal/confirm-modal.component'; 
import { firstValueFrom, Subject } from 'rxjs';

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
  articleIdInProgress: number | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  modalRef?: BsModalRef;
  ArticleUtils = ArticleUtils; 
  ArticleStatus = ArticleStatus;

  constructor(
    private formBuilder: FormBuilder,
    private getAllArticleUseCase: GetAllArticleUseCase,
    private disableArticleUseCase: DisableArticleUseCase,
    private deleteArticleUseCase: DeleteArticleUseCase,
    private enableArticleUseCase: EnableArticleUseCase,
    private router: Router,
    private modalService: BsModalService
  ) {
    this.articleForm = this.formBuilder.group({
      search: [''],
      minPrice: [''],
      maxPrice: [''],
      stock: [''],
      status: [''],
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
    if (params.status) {
      searchParams.status = params.status;
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

  navigateToEditArticle(id: number | undefined): void {
    if (id !== undefined) {
      this.router.navigate([`/articles/edit`, id]);
    } else {
      console.error('ID del artículo no válido');
    }
  }

  async enableArticle(id: number | undefined): Promise<void> {
    if (id === undefined) {
      console.error('ID del artículo no válido');
      return;
    }

    const confirmed = await this.showConfirmModal(
      'Habilitar Artículo',
      '¿Está seguro que desea habilitar este artículo?'
    );

    if (!confirmed) return;

    this.articleIdInProgress = id;
    this.isLoading = true;
    this.enableArticleUseCase.execute(id).subscribe({
      next: () => {
        this.successMessage = 'Artículo habilitado exitosamente.';
        this.isLoading = false;
        this.articleIdInProgress = null;
        this.getArticles();
      },
      error: () => {
        this.errorMessage = 'Error al habilitar el artículo.';
        this.isLoading = false;
        this.articleIdInProgress = null;
      },
    });
  }

  async disableArticle(id: number | undefined): Promise<void> {
    if (id === undefined) {
      console.error('ID del artículo no válido');
      return;
    }

    const confirmed = await this.showConfirmModal(
      'Deshabilitar Artículo',
      '¿Está seguro que desea deshabilitar este artículo?'
    );

    if (!confirmed) return;

    this.articleIdInProgress = id;
    this.isLoading = true;
    this.disableArticleUseCase.execute(id).subscribe({
      next: () => {
        this.successMessage = 'Artículo deshabilitado exitosamente.';
        this.isLoading = false;
        this.articleIdInProgress = null;
        this.getArticles();
      },
      error: () => {
        this.errorMessage = 'Error al deshabilitar el artículo.';
        this.isLoading = false;
        this.articleIdInProgress = null;
      },
    });
  }

  async deleteArticle(id: number | undefined): Promise<void> {
    if (id === undefined) {
      console.error('ID del artículo no válido');
      return;
    }

    const confirmed = await this.showConfirmModal(
      'Eliminar Artículo',
      '¿Está seguro que desea eliminar este artículo? Esta acción no se puede deshacer.'
    );

    if (!confirmed) return;

    this.articleIdInProgress = id;
    this.isLoading = true;
    this.deleteArticleUseCase.execute(id).subscribe({
      next: () => {
        this.successMessage = 'Artículo eliminado exitosamente.';
        this.isLoading = false;
        this.articleIdInProgress = null;
        this.getArticles();
      },
      error: () => {
        this.errorMessage = 'Error al eliminar el artículo.';
        this.isLoading = false;
        this.articleIdInProgress = null;
      },
    });
  }

  canEdit(article: Article): boolean {
    return article.status !== ArticleStatus.DELETED;
  }

  canEnable(article: Article): boolean {
    return article.status !== ArticleStatus.DELETED && article.status !== ArticleStatus.ENABLED;
  }

  canDisable(article: Article): boolean {
    return article.status !== ArticleStatus.DELETED && article.status === ArticleStatus.ENABLED;
  }

  canDelete(article: Article): boolean {
    return article.status !== ArticleStatus.DELETED;
  }

  async showConfirmModal(title: string, message: string): Promise<boolean> {
    const onClose = new Subject<boolean>();
    
    this.modalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        title,
        message,
        onClose
      }
    });

    const result = await firstValueFrom(onClose);
    return result;
  }
}