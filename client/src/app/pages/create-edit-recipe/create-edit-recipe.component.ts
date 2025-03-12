import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-edit-recipe',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './create-edit-recipe.component.html',
  styleUrls: ['./create-edit-recipe.component.scss']
})
export class CreateEditRecipeComponent implements OnInit {
  recipe = { 
    title: '', 
    description: '', 
    ingredients: '', 
    instructions: '', 
    image_url: '' 
  };
  isEditing = false;
  recipeId: string | null = null;
  apiUrl = 'http://localhost:5001/api/recipes';  
  token: string | null = localStorage.getItem('token'); 

  constructor(
    private http: HttpClient, 
    private router: Router, 
    private route: ActivatedRoute 
  ) {}

  ngOnInit(): void {
    // Redirect user to login if not authenticated
    if (!this.token) {
      alert('You must be logged in to create or edit a recipe.');
      this.router.navigate(['/login']);
      return;
    }

    // Check if editing and fetch existing recipe
    this.recipeId = this.route.snapshot.paramMap.get('id');
    if (this.recipeId) {
      this.isEditing = true;
      this.fetchRecipe(this.recipeId);
    }
  }

  fetchRecipe(id: string): void {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.token}` });
    this.http.get(`${this.apiUrl}/${id}`, { headers }).subscribe({
      next: (data: any) => {
        this.recipe = data;
      },
      error: (error) => console.error('Error fetching recipe:', error)
    });
  }

  submitRecipe(): void {
    // Validate required fields
    if (!this.recipe.title || !this.recipe.description || !this.recipe.ingredients || !this.recipe.instructions || !this.recipe.image_url) {
      alert('All fields are required!');
      return;
    }

    // Ensure user is authenticated
    if (!this.token) {
      alert('You are not logged in. Please log in to add a recipe.');
      this.router.navigate(['/login']);
      return;
    }

    // Attach Authorization headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.token}`
    });

    const request = this.isEditing
      ? this.http.put(`${this.apiUrl}/${this.recipeId}`, this.recipe, { headers })  
      : this.http.post(this.apiUrl, this.recipe, { headers });

    request.subscribe({
      next: () => {
        alert(`Recipe ${this.isEditing ? 'updated' : 'created'} successfully!`);
        this.router.navigate(['/recipes']);
      },
      error: (error) => {
        console.error(`Error ${this.isEditing ? 'updating' : 'creating'} recipe:`, error);
        if (error.status === 401) {
          alert('Unauthorized. Please log in again.');
          this.router.navigate(['/login']);
        } else if (error.status === 403) {
          alert('You are not allowed to edit this recipe.');
        } else {
          alert('Something went wrong. Please try again.');
        }
      }
    });
  }
}