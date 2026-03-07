import { Routes } from '@angular/router';
import { RecipeDetails } from './features/recipe-details/recipe-details';
import { HomeComponent } from './features/home/home';
import { AdminDashboard } from './features/admin-dashboard/admin-dashboard';
import { LoginComponent } from './features/auth/login/login';
import { RegisterComponent } from './features/auth/register/register';
import { AdminGuard, PublicGuard } from './core/guards/auth.guard';


export const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },

  { path: 'recipe/:id', component: RecipeDetails },

  { path: 'admin', component: AdminDashboard, canActivate: [AdminGuard] },

  { path: 'login', component: LoginComponent, canActivate: [PublicGuard] },

  { path: 'register', component: RegisterComponent, canActivate: [PublicGuard] },

  { path: '**', redirectTo: 'home' }
];
