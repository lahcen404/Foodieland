import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../core/services/recipe/recipe.service';
import { Recipe } from '../../core/models/recipe.model';
import { RecipeCard } from '../../shared/components/recipe-card/recipe-card';
import { ImageUrlPipe } from '../../shared/pipes/image-url.pipe';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RecipeCard, ImageUrlPipe],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  // inject recipe service
  private recipeService = inject(RecipeService);


  recipes = signal<Recipe[]>([]);
  allRecipes = signal<Recipe[]>([]);
  featuredRecipe = signal<Recipe | null>(null);
  selectedCategory = signal<string | null>(null);

  //  categories

  categories = [
    { name: 'Breakfast', icon: '/categories/breakfast.png' },
    { name: 'Vegan', icon: '/categories/vegan.png' },
    { name: 'Meat', icon: '/categories/meat.png' },
    { name: 'Dessert', icon: '/categories/dessert.png' },
    { name: 'Lunch', icon: '/categories/lunch.png' },
    { name: 'Chocolate', icon: '/categories/chokolat.png' },
  ];


  ngOnInit(): void {
    // fetch data from recipe service
    this.recipeService.getRecipes().subscribe({
      next: (data) => {
        this.allRecipes.set(data);
        this.recipes.set(data);

        // set first recipe as featured
        if (data.length > 0) {
          this.featuredRecipe.set(data[0]);
        }
      },
      error: (err) => console.error('Error fetching recipes:', err)
    });
  }

  onCategorySelect(categoryName: string): void {
    // Tooggle category selection
    if (this.selectedCategory() === categoryName) {
      this.selectedCategory.set(null);
      this.recipes.set(this.allRecipes());
    } else {
      this.selectedCategory.set(categoryName);
      const filtered = this.allRecipes().filter(
        recipe => recipe.category === categoryName
      );
      this.recipes.set(filtered);
    }
  }
}
