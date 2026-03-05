import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../core/services/recipe/recipe.service';
import { Recipe } from '../../core/models/recipe.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  // inject recipe service
  private recipeService = inject(RecipeService);


  recipes = signal<Recipe[]>([]);
  featuredRecipe = signal<Recipe | null>(null);

  //  categories
  categories = [
    { name: 'Breakfast', icon: 'https://i.imgur.com/0X6Qbjd.png' },
    { name: 'Vegan', icon: 'https://i.imgur.com/ZF6s192.png' },
    { name: 'Meat', icon: 'https://i.imgur.com/Op6hU7T.png' },
    { name: 'Dessert', icon: 'https://i.imgur.com/9X6a1yj.png' },
    { name: 'Lunch', icon: 'https://i.imgur.com/3l4Mg9X.png' },
    { name: 'Chocolate', icon: 'https://i.imgur.com/n1D3W0b.png' },
  ];

  ngOnInit(): void {
    // fetch data from recipe service
    this.recipeService.getRecipes().subscribe({
      next: (data) => {
        this.recipes.set(data);

        // set first recipe as featured
        if (data.length > 0) {
          this.featuredRecipe.set(data[0]);
        }
      },
      error: (err) => console.error('Error fetching recipes:', err)
    });
  }
}
