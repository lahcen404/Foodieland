import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../../core/services/recipe/recipe.service';
import { Recipe } from '../../core/models/recipe.model';
import { RecipeCard } from '../../shared/components/recipe-card/recipe-card';
import { ImageUrlPipe } from '../../shared/pipes/image-url.pipe';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RecipeCard, ImageUrlPipe, FormsModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  // inject recipe service
  private recipeService = inject(RecipeService);

  recipes = signal<Recipe[]>([]);
  allRecipes = signal<Recipe[]>([]);
  featuredRecipe = signal<Recipe | null>(null);
  selectedCategory = signal<string | null>(null);

  // Search
  searchTerm = signal<string>('');
  searchLoading = signal<boolean>(false);
  private searchTimeout: ReturnType<typeof setTimeout> | null = null;

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
    } else {
      this.selectedCategory.set(categoryName);
    }
    this.performSearch();
  }

  // Search with debounce
  onSearchChange(term: string): void {
    this.searchTerm.set(term);

    // Clear previous timeout
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    // Debounce search (300ms)
    this.searchTimeout = setTimeout(() => {
      this.performSearch();
    }, 300);
  }

  // Perform search with both search term and category
  performSearch(): void {
    const search = this.searchTerm().trim();
    const category = this.selectedCategory();

    // If no filters, show all recipes
    if (!search && !category) {
      this.recipes.set(this.allRecipes());
      return;
    }

    this.searchLoading.set(true);

    this.recipeService.getRecipes(search || undefined, category || undefined).subscribe({
      next: (data) => {
        this.recipes.set(data);
        this.searchLoading.set(false);
      },
      error: (err) => {
        console.error('Error searching recipes:', err);
        this.searchLoading.set(false);
      }
    });
  }

  // Clear search
  clearSearch(): void {
    this.searchTerm.set('');
    this.selectedCategory.set(null);
    this.recipes.set(this.allRecipes());
  }
}
