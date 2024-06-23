import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { RecipeService } from '../../service/recipe.service';
import { CategoryService } from '../../service/category.service';
import { UserService } from '../../service/user.service';
import { Category } from '../../models/category.model';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-edit-recipe',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.scss'
})
export class EditRecipeComponent {

  constructor(private _recipeService: RecipeService, private _categoryService: CategoryService, private _userService: UserService, private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) { }
  public editRecipe!: FormGroup;
  public categoryList: Category[] = [];
  public recipe!: Recipe;
  public recipeById!: number;

  ngOnInit() {
    this.userAuthorizationCheck()
    this.initForm()

  }

  userAuthorizationCheck() {
    if (!sessionStorage.getItem('password')) {
      Swal.fire({
        icon: "error",
        title: "Oops, you don't have access permission",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>'
      })
      this.router.navigate(['login'])
    }
  }

  initForm() {
    this.editRecipe = this.formBuilder.group({
      recipeName: ['', Validators.required],
      categoryCode: ['', Validators.required],
      preparationTimeInMinutes: ['', Validators.required],
      difficultyLevel: ['', Validators.required],
      ingredients: ['', Validators.required],
      preparationSteps: ['', Validators.required]
    });
    this._categoryService.getCategoryAll().subscribe({
      next: (res) => {
        this.categoryList = res
      },
      error: (err) => {
        console.log(err);
      }
    })
    this.route.params.subscribe(param => {
      this.recipeById = param['id']
    })
    this._recipeService.getRecipeById(this.recipeById).subscribe({
      next: (res) => {
        this.recipe = res
        this.editRecipe.setValue({
          recipeName: this.recipe.name,
          categoryCode: this.recipe.categoryId,
          preparationTimeInMinutes: this.recipe.preparationTime,
          difficultyLevel: this.recipe.level,
          ingredients: this.recipe.ingredients.join(', '),
          preparationSteps: this.recipe.instructions.join('\n')
        });
        this.recipeById = res.categoryId
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  saveChanges() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to save the changes?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, save changes',
      cancelButtonText: 'No, cancel',
      reverseButtons: true,
      confirmButtonColor: '#FF69B4',
      cancelButtonColor: '#FFFFFF',
      background: '#FFFFFF'
    }).then((result) => {
      if (result.isConfirmed) {
        if (this.editRecipe.valid) {
          this.recipe = {
            ...this.recipe,
            id: this.recipeById,
            name: this.editRecipe.value.recipeName,
            categoryId: this.editRecipe.value.categoryCode,
            preparationTime: this.editRecipe.value.preparationTimeInMinutes,
            level: this.editRecipe.value.difficultyLevel,
            ingredients: this.editRecipe.value.ingredients.split(','),
            instructions: this.editRecipe.value.preparationSteps.split('\n')
          }
          this._recipeService.putRecipeById(this.recipe)
            .subscribe(() => {
              Swal.fire({
                title: 'Recipe Updated Successfully!',
                text: 'The recipe has been updated successfully.',
                icon: 'success',
                timer: 2000,
                timerProgressBar: true,
                background: '#FFFFFF',
                iconColor: '#FF69B4',
                showConfirmButton: false,
                customClass: {
                  title: 'swal-title',
                  popup: 'swal-popup',
                  icon: 'swal-icon'
                }
              });
            });
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'The form is invalid.',
            icon: 'error',
            confirmButtonColor: '#FF69B4',
            background: '#FFFFFF',
            showConfirmButton: true,
            customClass: {
              title: 'swal-title',
              popup: 'swal-popup',
              icon: 'swal-icon'
            }
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    })
  }
}
