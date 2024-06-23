import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';

import Swal from 'sweetalert2';

import { CategoryService } from '../../service/category.service';
import { RecipeService } from '../../service/recipe.service';
import { Category } from '../../models/category.model';


@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './add-recipe.component.html',
  styleUrl: './add-recipe.component.scss'
})
export class AddRecipeComponent {
  constructor(private _categoryService: CategoryService, private _recipeService: RecipeService, private formBuilder: FormBuilder, private router: Router) { }
  public addRecipe!: FormGroup;
  public CategoryList: Category[] = [];
  ingredients: string[] = [];
  instructions: string[] = [];

  ngOnInit(){
    this.userAuthorizationCheck()
    this.initRecipeForm()
  }

  userAuthorizationCheck(){
    if (!sessionStorage.getItem('password')) {
        Swal.fire({
        icon: "error",
        title: "Oops, you don't have access permission",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>'
      })
      this.router.navigate(['login'])
    }
    this._categoryService.getCategoryAll().subscribe({
      next: (res) => {
        this.CategoryList = res
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  initRecipeForm(){ 
    this.addRecipe = new FormGroup({
    "id": new FormControl("", [Validators.required]),
    "name": new FormControl("", [Validators.required]),
    "selectedCategory": new FormControl("category"),
    "preparationTime": new FormControl("", [Validators.required]),
    "level": new FormControl("1", [Validators.required, Validators.min(1), Validators.max(5)]),
    "date": new FormControl(new Date().getDate(), [Validators.required]),
    ingredients: this.formBuilder.array([this.formBuilder.control('')]),
    instructions: this.formBuilder.array([this.formBuilder.control('')]),
    "userId": new FormControl("", [Validators.required]),
    "img": new FormControl("", [Validators.required]),
  })}

  get ingredientsArray() {
    return this.addRecipe.get('ingredients') as FormArray;
  }

  get instructionsArray() {
    return this.addRecipe.get('instructions') as FormArray;
  }

  addIngredient() {
    const lastControl = this.ingredientsArray.at(this.ingredientsArray.length - 1);
    if (lastControl.value.trim() !== '') {
      this.ingredientsArray.push(this.formBuilder.control(''));
    }
  }

  addPreparationStep() {
    const lastControl = this.instructionsArray.at(this.instructionsArray.length - 1);
    if (lastControl.value.trim() !== '') {
      this.instructionsArray.push(this.formBuilder.control(''));
    }
  }

  removeEmptyIngredients() {
    for (let i = this.ingredientsArray.length - 1; i >= 0; i--) {
      if (this.ingredientsArray.at(i).value.trim() === '') {
        this.ingredientsArray.removeAt(i);
      }
    }
  }

  removeEmptyPreparationSteps() {
    for (let i = this.instructionsArray.length - 1; i >= 0; i--) {
      if (this.instructionsArray.at(i).value.trim() === '') {
        this.instructionsArray.removeAt(i);
      }
    }
  }

  saveRecipe() {
    this._recipeService.addRecipe(this.addRecipe.value).subscribe({
      next: (res) => {
        Swal.fire({
                  title: "Thank you!",
                  text: "The recipe was successfully added!",
                  icon: "success"
                })
        this.router.navigate(["recipe/recipes"])
      },
      error(err) {
        console.log(err)
      },
    })
  }
}
