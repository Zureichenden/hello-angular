import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Article } from 'app/domain/models/article.model'; 
import { GetAllArticleUseCase } from 'app/domain/usecases/articles'; 
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { PurchaseDetail } from 'app/domain/models/purchase-detail.model';
import { Purchase } from 'app/domain/models/purchase.model';
import { CreatePurchaseUseCase, GetAllPurchaseUseCase } from 'app/domain/usecases/purchases';

@Component({
  selector: 'app-marketplace',
  templateUrl: './marketplace.component.html',
  styleUrls: ['./marketplace.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TooltipModule],
})
export class MarketplaceComponent implements OnInit {
  articles: Article[] = [];
  cartItems: { article: Article; quantity: number }[] = [];
  searchTerm: string = '';
  isLoading: boolean = false;
  error: string | null = null;
  sortOption: string = 'name';
  showCart: boolean = false;
  modalRef?: BsModalRef;

  constructor(
    private getAllArticleUseCase: GetAllArticleUseCase,
    private createPurchaseUseCase: CreatePurchaseUseCase,
  ) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.isLoading = true;
    this.error = null;
    this.getAllArticleUseCase.execute({}).subscribe({
      next: (articles) => {
        this.articles = articles;
        this.sortArticles();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching articles:', err);
        this.error = 'Error al cargar los artículos. Por favor, intente de nuevo.';
        this.isLoading = false;
      },
    });
  }

  addToCart(article: Article): void {
    const existingItem = this.cartItems.find(item => item.article.id === article.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ article, quantity: 1 });
    }
  }

  removeFromCart(item: { article: Article; quantity: number }): void {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }

  updateQuantity(item: { article: Article; quantity: number }, event: Event): void {
    const input = event.target as HTMLInputElement;
    const newQuantity = parseInt(input.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      item.quantity = newQuantity;
    } else if (newQuantity <= 0) {
      this.removeFromCart(item);
    }
  }

  getTotalAmount(): number {
    return this.cartItems.reduce((total, item) => total + item.article.price * item.quantity, 0);
  }

  getTotalItems(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }


  
  completePurchase(): void {
    const purchaseDetails: PurchaseDetail[] = this.cartItems.map(item => ({
      articleId: item.article.id!,
      quantity: item.quantity,
      unitPrice: item.article.price,
    }));

    const purchase: Purchase = {
      userId: '1', 
      purchaseDate: new Date().toISOString(),
      totalAmount: this.getTotalAmount(),
      purchaseDetails: purchaseDetails,
    };

    this.createPurchaseUseCase.execute(purchase).subscribe({
      next: (response) => {
        console.log('Compra registrada:', response);
        alert('Compra completada con éxito');
        this.cartItems = []; 
        this.showCart = false;
      },
      error: (err) => {
        console.error('Error al registrar la compra:', err);
        alert('Ocurrió un error al completar la compra.');
      },
    });
  }

  sortArticles(): void {
    switch (this.sortOption) {
      case 'name':
        this.articles.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'priceLow':
        this.articles.sort((a, b) => a.price - b.price);
        break;
      case 'priceHigh':
        this.articles.sort((a, b) => b.price - a.price);
        break;
      case 'stock':
        this.articles.sort((a, b) => b.stock - a.stock);
        break;
    }
  }

  get filteredArticles(): Article[] {
    return this.articles.filter(article =>
      article.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  toggleCart(): void {
    this.showCart = !this.showCart;
  }

  showModal(title: string, message: string): void {
    const initialState = {
      title: title,
      message: message,
    };
    // this.modalRef = this.modalService.show(YourModalComponent, { initialState });
  }

}

