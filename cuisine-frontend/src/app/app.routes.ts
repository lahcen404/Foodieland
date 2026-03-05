import { Routes } from '@angular/router';
import { RecipeDetails } from './features/recipe-details/recipe-details';
import { Home } from './features/home/home';
import { AdminDashboard } from './features/admin-dashboard/admin-dashboard';


export const routes: Routes = [

  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: Home },

  { path: 'recipe/:id', component: RecipeDetails },

  { path: 'admin', component: AdminDashboard },

  { path: '**', redirectTo: 'home' }
];
