import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/recipes';

  // get all recipes
  getRecipes(search?: string, category?: string): Observable<Recipe[]> {
    let params = new HttpParams();
    if (search) params = params.append('search', search);
    if (category) params = params.append('category', category);

    console.log('📡 RecipeService.getRecipes', { search, category, url: this.apiUrl, params: params.toString() });
    return this.http.get<Recipe[]>(this.apiUrl, { params });
  }

// get recipe by id
  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
  }

  // create new recipe
  createRecipe(recipe: Recipe): Observable<Recipe> {
    console.log('📡 RecipeService.createRecipe', { url: this.apiUrl, body: recipe });
    return this.http.post<Recipe>(this.apiUrl, recipe);
  }

  // update existing recipee
  updateRecipe(id: number, recipe: Recipe): Observable<Recipe> {
    const url = `${this.apiUrl}/${id}`;
    console.log('📡 RecipeService.updateRecipe', { url, body: recipe });
    return this.http.put<Recipe>(url, recipe);
  }

  // delete recipe
  deleteRecipe(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    console.log('📡 RecipeService.deleteRecipe', { url });
    return this.http.delete<void>(url);
  }
}
