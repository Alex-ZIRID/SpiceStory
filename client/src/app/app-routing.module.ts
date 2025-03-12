import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RecipeDetailComponent } from './pages/recipe-detail/recipe-detail.component';
import { CreateEditRecipeComponent } from './pages/create-edit-recipe/create-edit-recipe.component';
import { SavedRecipesComponent } from './pages/saved-recipes/saved-recipes.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'recipe/:id', component: RecipeDetailComponent },
  { path: 'saved-recipes', component: SavedRecipesComponent },
  { path: 'recipes', component: SavedRecipesComponent },
  { path: 'create-recipe', component: CreateEditRecipeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'logout', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }