import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { MatIconModule } from '@angular/material/icon'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RecipeCardComponent,MatIconModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  featuredRecipe: any = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchFeaturedRecipe();
  }

  fetchFeaturedRecipe(): void {
    this.http.get('http://localhost:5001/api/recipes').subscribe({
      next: (data: any) => {
        if (data.length > 0) {
          this.featuredRecipe = data[Math.floor(Math.random() * data.length)];
        } else {
          console.warn('No recipes available from API.');
          this.featuredRecipe = null;
        }
      },
      error: (error) => {
        console.error('Error fetching recipes:', error);
        this.featuredRecipe = null;
      },
      complete: () => console.log('Featured recipe fetched'),
    });
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}