import { Injectable } from '@angular/core';
import { Purchase } from 'app/domain/models/purchase.model';
import { PurchaseRepository } from 'app/domain/repositories/purchase.repository';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })


export class GetAllPurchaseUseCase {
  constructor( private purchaseRepository: PurchaseRepository) {}

  execute(params: any): Observable<Purchase[]> {
    return this.purchaseRepository.getPurchases(params);
  }
}

