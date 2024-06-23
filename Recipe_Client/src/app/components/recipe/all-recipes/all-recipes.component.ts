import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Recipe } from '../../models/recipe.model';
import { Category } from '../../models/category.model';
import { RecipeService } from '../../service/recipe.service';
import { CategoryService } from '../../service/category.service';
import { SmallRecipeComponent } from '../small-recipe/small-recipe.component';

@Component({
  selector: 'app-all-recipes',
  standalone: true,
  imports: [CommonModule, SmallRecipeComponent, ReactiveFormsModule],
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.scss'
})
export class AllRecipesComponent {

  public allRecipes!: FormGroup;
  public recipesList: Recipe[] = [];
  public recipesListFilter: Recipe[] = [];
  public categoryList: Category[] = [];
  public inputCategory: FormControl = new FormControl("");
  public selectedCategory: FormControl = new FormControl(0);
  constructor(private _recipeService: RecipeService, private _CategoryService: CategoryService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.allRecipes = new FormGroup({
      inputCategory: this.inputCategory,
      selectedCategory: this.selectedCategory
    })

    this.filterRecipes();
    this.getRecipes();
    this.getCategories();
  }

  filterRecipes() {
    this.selectedCategory.valueChanges.subscribe((value: number) => {
      this.recipesListFilter = this.recipesList.filter(x => x.categoryId == value)
      if (value == 0)
        this.recipesListFilter = this.recipesList;
    });
    this.inputCategory.valueChanges.subscribe((value: string) => {
      this.recipesListFilter = this.recipesList.filter(x => x.name.includes(value))
    });
  }

  getRecipes() {
    this._recipeService.getRecipesAll().subscribe({
      next: (res) => {
        this.recipesList = res;
        this.recipesListFilter = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getCategories() {
    this._CategoryService.getCategoryAll().subscribe({
      next: (res) => {
        if (res) {
          res.unshift({ id: 0, name: "הכל", iconPath: "" })
          this.categoryList = res
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


}
