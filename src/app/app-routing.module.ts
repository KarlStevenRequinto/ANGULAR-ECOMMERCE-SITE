import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProductDetailPageComponent } from './components/product-detail-page/product-detail-page.component';
import { SearchComponent } from './components/search/search.component';
import { AddToCartPageComponent } from './components/add-to-cart-page/add-to-cart-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: ProductDetailPageComponent },
  { path: 'search/:_searchInput', component: SearchComponent },
  { path: 'cart', component: AddToCartPageComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
