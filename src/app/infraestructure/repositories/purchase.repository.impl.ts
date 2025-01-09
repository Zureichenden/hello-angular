import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_CONFIG } from 'app/config/api.config';
import { Purchase } from 'app/domain/models/purchase.model';
import { PurchaseRepository } from 'app/domain/repositories/purchase.repository';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PurchaseRepositoryImpl implements PurchaseRepository {
  private apiUrl = API_CONFIG.baseUrl + API_CONFIG.endpoints.purchases;

  constructor(private http: HttpClient) {}

  createPurchase(purchase: Purchase): Observable<Purchase> {
    return this.http.post<Purchase>(this.apiUrl, purchase);
  }

  getPurchases(params: any): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(this.apiUrl, { params });
  }

  getPurchaseById(id: number): Observable<Purchase> {
    return this.http.get<Purchase>(`${this.apiUrl}/${id}`);
  }

  updatePurchase(purchase: Purchase): Observable<Purchase> {
    return this.http.put<Purchase>(`${this.apiUrl}/${purchase.id}`, purchase);
  }

  deletePurchase(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}
