import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommentSectionComponent } from '../../components/comment-section/comment-section.component';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, CommentSectionComponent],
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe: any;
  userId: number = 1; 

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const recipeId = this.route.snapshot.paramMap.get('id');
    if (recipeId) {
      this.fetchRecipe(recipeId);
    }
  }

  fetchRecipe(recipeId: string): void {
    this.http.get(`${environment.apiUrl}/api/recipes/${recipeId}`).subscribe({
      next: (data: any) => {
        if (data) {
          this.recipe = data;
  
          if (typeof this.recipe.ingredients === 'string') {
            this.recipe.ingredients = this.recipe.ingredients.split(',').map((i: string) => i.trim());
          }
  
          if (typeof this.recipe.instructions === 'string') {
            this.recipe.instructions = this.recipe.instructions
              .split('.')
              .map((step: string) => step.trim())
              .filter((step: string) => step.length > 0); 
          }
        }
      },
      error: (error) => console.error('Error fetching recipe:', error)
    });
  }

  deleteRecipe(): void {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.http.delete(`http://localhost:5001/api/recipes/${this.recipe.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      }).subscribe({
        next: () => {
          alert('Recipe deleted successfully.');
          this.router.navigate(['/saved-recipes']); 
        },
        error: (error) => {
          if (error.status === 403) {
            alert('Failed to delete recipe. You can only delete recipes that you have created.');
          } else {
            alert('An error occurred while trying to delete the recipe. Please try again later.');
          }
          console.error('Error deleting recipe:', error);
        }
      });
    }
  }
}