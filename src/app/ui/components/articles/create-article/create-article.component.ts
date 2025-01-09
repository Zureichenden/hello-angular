import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateArticleUseCase } from 'app/domain/usecases/articles';
import { Article } from 'app/domain/models/article.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class CreateArticleComponent {
  articleForm: FormGroup;
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private createArticleUseCase: CreateArticleUseCase
  ) {
    this.articleForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      stock: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit(): void {
    if (this.articleForm.valid) {
      const article: Article = this.articleForm.value;
      this.isLoading = true;
      this.successMessage = null;
      this.errorMessage = null;

      this.createArticleUseCase.execute(article).subscribe({
        next: (createdArticle) => {
          this.successMessage = 'Artículo creado exitosamente.';
          this.isLoading = false;
          this.articleForm.reset();
          console.log('Article created successfully', createdArticle);
        },
        error: (err) => {
          this.errorMessage = 'Error al crear el artículo. Intente nuevamente.';
          console.error('Error creating article', err);
          this.isLoading = false;
        },
      });
    }
  }
  


}
