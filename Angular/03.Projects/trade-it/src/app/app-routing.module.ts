import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './services/guards/auth-guard.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', redirectTo: ''},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'create-product', component: CreateProductComponent, canActivate: [AuthGuardService] },
  { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuardService], 
    children: [
      { path: 'edit', component: EditProfileComponent}
    ] },
  { path: 'products-list', component: ListProductsComponent, canActivate: [AuthGuardService],
    children: [
      { path: ':id', component: ProductDetailsComponent },
    ] },
  { path: 'products-list-search/:search', component: ListProductsComponent, canActivate: [AuthGuardService],
    children: [ 
      { path: ':id', component: ProductDetailsComponent },
    ] },
  { path: 'products-list-my', component: ListProductsComponent, canActivate: [AuthGuardService],
    children: [ 
      { path: ':id', component: ProductDetailsComponent },
      { path: ':id/edit', component: EditProductComponent} 
    ],
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
