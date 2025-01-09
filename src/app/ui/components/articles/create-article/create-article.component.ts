import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateArticleUseCase, GetByIdArticleUseCase, UpdateArticleUseCase } from 'app/domain/usecases/articles';
import { Article } from 'app/domain/models/article.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class CreateArticleComponent implements OnInit {
  articleForm: FormGroup;
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isEditMode = false; // Flag to check if it's an edit or create mode
  articleId!: number; // Holds the article ID

  constructor(
    private formBuilder: FormBuilder,
    private createArticleUseCase: CreateArticleUseCase,
    private getByIdArticleUseCase: GetByIdArticleUseCase,
    private updateArticleUseCase: UpdateArticleUseCase,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.articleForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
      imageUrl: ['', [Validators.required, Validators.pattern(
        /^(https?):\/\/([a-z0-9\-\.]+)\.([a-z]{2,6})([\/\w .-]*)*(\?[;&a-z0-9%_\.=+-]*)?$/i
      )]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.articleId = +id; // Convert id to number
        this.isEditMode = true;
        this.loadArticle();
      }
    });
  }

  loadArticle(): void {
    this.isLoading = true;
    this.getByIdArticleUseCase.execute(this.articleId).subscribe({
      next: (article) => {
        this.articleForm.patchValue(article);
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar los datos del artículo.';
        console.error('Error loading article', err);
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.articleForm.valid) {
      const article: Article = this.articleForm.value;
      article.id = this.articleId; // Aseguramos que el ID se incluya en el artículo en modo de edición
  
      this.isLoading = true;
      this.successMessage = null;
      this.errorMessage = null;
  
      if (this.isEditMode) {
        // Si es el modo de edición, llamamos al UseCase de actualización
        this.updateArticleUseCase.execute(article).subscribe({
          next: (updatedArticle) => {
            this.successMessage = 'Artículo actualizado exitosamente.';
            this.isLoading = false;
            this.router.navigate(['/articles']); // Redirigir a la lista después de la actualización
          },
          error: (err) => {
            this.errorMessage = 'Error al actualizar el artículo.';
            this.isLoading = false;
          }
        });
      } else {
        // Si es el modo de creación, llamamos al UseCase de creación
        this.createArticleUseCase.execute(article).subscribe({
          next: (createdArticle) => {
            this.successMessage = 'Artículo creado exitosamente.';
            this.isLoading = false;
            this.articleForm.reset();
          },
          error: (err) => {
            this.errorMessage = 'Error al crear el artículo.';
            this.isLoading = false;
          }
        });
      }
    }
  }
  
}
