import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../core/services/recipe/recipe.service';
import { Recipe } from '../../core/models/recipe.model';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-details.html',
  styleUrl: './recipe-details.css',
})
export class RecipeDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private recipeService = inject(RecipeService);

  recipe = signal<Recipe | null>(null);
  otherRecipes = signal<Recipe[]>([]);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.loadRecipe(+id);
    }
  }

  private loadRecipe(id: number): void {
    this.loading.set(true);
    this.error.set(null);

    this.recipeService.getRecipeById(id).subscribe({
      next: (data) => {
        this.recipe.set(data);
        this.loadOtherRecipes(id);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading recipe:', err);
        this.error.set('Recipe not found');
        this.loading.set(false);
      }
    });
  }

  private loadOtherRecipes(currentId: number): void {
    this.recipeService.getRecipes().subscribe({
      next: (recipes) => {
        // Filter out current recipe and get up to 3 other recipes
        const filtered = recipes.filter(r => r.id !== currentId).slice(0, 3);
        this.otherRecipes.set(filtered);
      },
      error: (err) => console.error('Error loading other recipes:', err)
    });
  }

  goBack(): void {
    this.router.navigate(['/home']);
  }

  onIngredientCheckboxChange(event: Event): void {
    // This method handles the checkbox change for strikethrough effect
    // The CSS handles the visual changes, this is just for potential future enhancements
  }

  navigateToRecipe(id: number | undefined): void {
    if (id) {
      this.router.navigate(['/recipe', id]);
      window.scrollTo(0, 0);
    }
  }
}
