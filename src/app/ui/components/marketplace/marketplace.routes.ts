import { Routes } from '@angular/router';
import { MarketplaceComponent } from './marketplace.component';

export const MARKETPLACE_ROUTES: Routes = [
  {
    path:'',

    children:[
       {path:'',component: MarketplaceComponent },     
    ]
  }

];