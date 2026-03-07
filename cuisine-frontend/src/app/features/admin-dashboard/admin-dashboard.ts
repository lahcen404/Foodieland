import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecipeService } from '../../core/services/recipe/recipe.service';
import { Recipe } from '../../core/models/recipe.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard implements OnInit {
  private fb = inject(FormBuilder);
  private recipeService = inject(RecipeService);

  recipes = signal<Recipe[]>([]);
  recipeForm!: FormGroup;
  loading = signal<boolean>(false);
  errorMessage = signal<string>('');
  successMessage = signal<string>('');
  isEditMode = signal<boolean>(false);
  editingId = signal<number | null>(null);
  showForm = signal<boolean>(false);

  ngOnInit(): void {
    this.initializeForm();
    this.loadRecipes();
  }

  private initializeForm(): void {
    this.recipeForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      category: ['', Validators.required],
      prep_time: [0, [Validators.required, Validators.min(0)]],
      cook_time: [0, [Validators.required, Validators.min(0)]],
      calories: [0, [Validators.required, Validators.min(0)]],
      is_healthy: [false],
      author_name: ['', Validators.required],
      image_url: [''],
      ingredients: this.fb.array([]),
    });
  }

  private loadRecipes(): void {
    this.loading.set(true);
    this.recipeService.getRecipes().subscribe({
      next: (data) => {
        this.recipes.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading recipes:', err);
        this.errorMessage.set('Failed to load recipes');
        this.loading.set(false);
      }
    });
  }

  onSubmit(): void {
    if (this.recipeForm.invalid) {
      this.errorMessage.set('Please fill in all required fields');
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    const formData = this.recipeForm.value;

    if (this.isEditMode() && this.editingId()) {
      // Update recipe
      this.recipeService.updateRecipe(this.editingId()!, formData).subscribe({
        next: () => {
          this.successMessage.set('Recipe updated successfully!');
          this.loadRecipes();
          this.resetForm();
          this.showForm.set(false);
          this.loading.set(false);
        },
        error: (err) => {
          this.errorMessage.set(err.error?.message || 'Failed to update recipe: ' + err.statusText);
          this.loading.set(false);
        }
      });
    } else {
      // Create new recipe
      this.recipeService.createRecipe(formData).subscribe({
        next: () => {
          this.successMessage.set('Recipe created successfully!');
          this.loadRecipes();
          this.resetForm();
          this.showForm.set(false);
          this.loading.set(false);
        },
        error: (err) => {
          this.errorMessage.set(err.error?.message || 'Failed to create recipe: ' + err.statusText);
          this.loading.set(false);
        }
      });
    }
  }

  editRecipe(recipe: Recipe): void {
    this.isEditMode.set(true);
    this.editingId.set(recipe.id || null);
    this.showForm.set(true);
    this.recipeForm.patchValue({
      title: recipe.title,
      description: recipe.description,
      category: recipe.category,
      prep_time: recipe.prep_time,
      cook_time: recipe.cook_time,
      calories: recipe.calories,
      is_healthy: recipe.is_healthy,
      author_name: recipe.author_name || recipe.author || '',
      image_url: recipe.image_url,
    });
    window.scrollTo(0, 0);
  }

  deleteRecipe(id: number | undefined): void {
    if (!id || !confirm('Are you sure you want to delete this recipe?')) {
      return;
    }

    this.loading.set(true);
    this.recipeService.deleteRecipe(id).subscribe({
      next: () => {
        this.successMessage.set('Recipe deleted successfully!');
        this.loadRecipes();
        this.loading.set(false);
      },
      error: (err) => {
        this.errorMessage.set('Failed to delete recipe');
        this.loading.set(false);
      }
    });
  }

  resetForm(): void {
    // clear all form controls and editing state
    this.recipeForm.reset();
    this.isEditMode.set(false);
    this.editingId.set(null);
  }

  toggleFormVisibility(): void {
    const currently = this.showForm();
    console.log('📋 Toggle form - Current:', currently);
    if (currently) {
      // hiding form
      this.showForm.set(false);
    } else {
      // opening form for new recipe; reset to clean state
      this.resetForm();
      this.showForm.set(true);
      window.scrollTo(0, 0);
    }
  }
}
