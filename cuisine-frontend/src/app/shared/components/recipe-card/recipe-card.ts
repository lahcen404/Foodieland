import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Recipe } from '../../../core/models/recipe.model';
import { ImageUrlPipe } from '../../pipes/image-url.pipe';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule, ImageUrlPipe],
  templateUrl: './recipe-card.html',
  styleUrl: './recipe-card.css',
})
export class RecipeCard {
  @Input() recipe!: Recipe;
  @Input() bgLight = false;

  constructor(private router: Router) {}

  onRecipeClick(): void {
    this.router.navigate(['/recipe', this.recipe.id]);
  }
}
