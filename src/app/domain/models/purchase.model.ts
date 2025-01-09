import { PurchaseDetail } from "./purchase-detail.model";

export interface Purchase {
    id?: number;
    userId: string;
    purchaseDate: string;
    totalAmount: number;
    purchaseDetails: PurchaseDetail[];
}