import { Observable } from 'rxjs';
import { Purchase } from '../models/purchase.model'; 
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})

export abstract class PurchaseRepository {
  abstract createPurchase(purchase: Purchase): Observable<Purchase>;
  abstract getPurchases(params: any): Observable<Purchase[]>;
  abstract getPurchaseById(id: number): Observable<Purchase>;
  abstract updatePurchase(purchase: Purchase): Observable<Purchase>;
  abstract deletePurchase(id: number): Observable<void>;
}
