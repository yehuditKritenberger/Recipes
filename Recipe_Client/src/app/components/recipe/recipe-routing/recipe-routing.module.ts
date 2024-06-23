import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllRecipesComponent } from '../all-recipes/all-recipes.component';
import { DetailsRecipeComponent } from '../details-recipe/details-recipe.component';
import { EditRecipeComponent } from '../edit-recipe/edit-recipe.component';
import { SmallRecipeComponent } from '../small-recipe/small-recipe.component';
import { AddRecipeComponent } from '../add-recipe/add-recipe.component';

const recipeRoutes: Routes = [
  { path: '', redirectTo: 'recipes', pathMatch: 'full' },
  { path: 'recipes', component: AllRecipesComponent },
  { path: 'recipe-details/:id', component: DetailsRecipeComponent},
  { path: 'edit-recipe/:id', component: EditRecipeComponent},
  { path: 'smallRecipe/:recipe', component: SmallRecipeComponent},
  { path: 'add-recipe', component: AddRecipeComponent },
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(recipeRoutes)
  ],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
