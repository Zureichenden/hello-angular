import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PurchaseRepository } from 'app/domain/repositories/purchase.repository';
import { Purchase } from 'app/domain/models/purchase.model';

@Injectable({ providedIn: 'root' })

export class CreatePurchaseUseCase {

  constructor(private purchaseRepository: PurchaseRepository) {}

  execute(purchase: Purchase): Observable<Purchase> {
    if (!purchase.purchaseDetails || purchase.purchaseDetails.length === 0) {
      throw new Error('La compra debe incluir al menos un detalle.');
    }
    
    return this.purchaseRepository.createPurchase(purchase);
  }

}
