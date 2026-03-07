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

    return this.http.get<Recipe[]>(this.apiUrl, { params });
  }

// get recipe by id
  getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiUrl}/${id}`);
  }

  // create new recipe with optional image upload
  createRecipe(recipe: Recipe, image?: File): Observable<Recipe> {
    if (image) {
      const formData = this.createFormData(recipe, image);
      return this.http.post<Recipe>(this.apiUrl, formData);
    }
    return this.http.post<Recipe>(this.apiUrl, recipe);
  }

  // update existing recipe with optional image upload
  updateRecipe(id: number, recipe: Recipe, image?: File): Observable<Recipe> {
    const url = `${this.apiUrl}/${id}`;
    if (image) {
      const formData = this.createFormData(recipe, image);
      formData.append('_method', 'PUT');
      return this.http.post<Recipe>(url, formData);
    }
    return this.http.put<Recipe>(url, recipe);
  }

  // create FormData from recipe and image
  private createFormData(recipe: Recipe, image: File): FormData {
    const formData = new FormData();
    formData.append('title', recipe.title);
    formData.append('category', recipe.category);
    formData.append('description', recipe.description);
    formData.append('prep_time', recipe.prep_time.toString());
    formData.append('cook_time', recipe.cook_time.toString());
    formData.append('calories', recipe.calories.toString());
    formData.append('is_healthy', recipe.is_healthy ? '1' : '0');
    if (recipe.author_name) {
      formData.append('author_name', recipe.author_name);
    }
    if (recipe.image_url) {
      formData.append('image_url', recipe.image_url);
    }
    if (recipe.ingredients) {
      formData.append('ingredients', JSON.stringify(recipe.ingredients));
    }
    formData.append('image', image);
    return formData;
  }

  // delete recipe
  deleteRecipe(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
