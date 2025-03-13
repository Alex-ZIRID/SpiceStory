import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-saved-recipes',
  standalone: true,
  imports: [CommonModule, RecipeCardComponent],
  templateUrl: './saved-recipes.component.html',
  styleUrls: ['./saved-recipes.component.scss']
})
export class SavedRecipesComponent implements OnInit {
  recipes: any[] = [];
  isLoggedIn: boolean = !!localStorage.getItem('token'); 

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']); 
      return;
    }
    this.fetchRecipes();
  }

  fetchRecipes(): void {
     this.http.get<any[]>(`${environment.apiUrl}/api/recipes`).subscribe({
      next: (data) => {
        if (Array.isArray(data) && data.length > 0) {
          this.recipes = data.map((recipe) => ({
            ...recipe,
            image: recipe.image_url && recipe.image_url.startsWith('client/src/assets')
              ? recipe.image_url.replace('client/src/', '') 
              : recipe.image_url
          }));
        } else {
          console.warn('No recipes found in API. Using fallback list.');
          this.recipes = [
            { id: 1, title: 'Spicy Tofu Stir-fry', description: 'A delicious spicy tofu recipe.', image: 'assets/tofu.jpg', author: 'John Doe' },
            { id: 2, title: 'Classic Pancakes', description: 'Fluffy pancakes with maple syrup.', image: 'assets/pancakes.jpg', author: 'Jane Smith' },
            { id: 3, title: 'Garlic Butter Shrimp', description: 'Juicy shrimp in garlic butter sauce.', image: 'assets/shrimp.jpg', author: 'Chef Alex' },
            { id: 4, title: 'Chocolate Cake', description: 'Rich and moist chocolate cake.', image: 'assets/chocolate-cake.jpg', author: 'Baker Mia' }
          ];
        }
      },
      error: (error) => {
        console.error('Error fetching recipes:', error);
        this.recipes = [];
      }
    });
  }
}