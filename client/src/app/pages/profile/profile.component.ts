import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RecipeCardComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  userRecipes: any[] = [];
  otherRecipes: any[] = [];
  token: string | null = localStorage.getItem('token');

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
  
    this.fetchUserProfile();
  }

  fetchUserProfile(): void {
    this.http.get('http://localhost:5001/api/auth/profile', {
      headers: { Authorization: `Bearer ${this.token}` }
    }).subscribe({
      next: (data: any) => {
        this.user = data;
        this.fetchAllRecipes();
      },
      error: (error) => {
        console.error('Error fetching user profile:', error);
        if (error.status === 403) {
          alert('Session expired. Please log in again.');
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
        }
      }
    });
  }

  fetchAllRecipes(): void {
    this.http.get('http://localhost:5001/api/recipes', {
      headers: { Authorization: `Bearer ${this.token}` }
    }).subscribe({
      next: (data: any) => {
        this.userRecipes = data.filter((recipe: any) => recipe.user_id === this.user.id);
        this.otherRecipes = data.filter((recipe: any) => recipe.user_id !== this.user.id);
      },
      error: (error) => console.error('Error fetching recipes:', error)
    });
  }

  deleteRecipe(recipeId: number): void {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.http.delete(`http://localhost:5001/api/recipes/${recipeId}`, {
        headers: { Authorization: `Bearer ${this.token}` }
      }).subscribe({
        next: () => {
          this.userRecipes = this.userRecipes.filter(recipe => recipe.id !== recipeId);
          alert('Recipe deleted successfully');
        },
        error: (error) => console.error('Error deleting recipe:', error)
      });
    }
  }
}