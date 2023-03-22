import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './skeleton/home/home.component';
import { ProductComponent } from './product/product.component';
import { ProductentryComponent } from './productentry/productentry.component';
import { ProductoutputComponent } from './productoutput/productoutput.component';
import { StockstatusComponent } from './stockstatus/stockstatus.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { LastDataEntrComponent } from './last-data-entr/last-data-entr.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthComponent } from './authentication/auth/auth.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'categories', component: CategoryComponent,canActivate:[AdminGuard]},
  {path: 'product', component: ProductComponent},
  {path: 'productentry', component: ProductentryComponent},
  {path: 'last-data-entry/:id', component: LastDataEntrComponent},


  {path: 'productoutput', component: ProductoutputComponent},
  {path: 'stock',component:StockstatusComponent},
  {path: '',component:AuthComponent},
  {path: 'update-product/:id',component:UpdateProductComponent},
  {path: 'last-data-entry',component:LastDataEntrComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
