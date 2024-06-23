import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../service/recipe.service';
import { CategoryService } from '../../service/category.service';
import { UserService } from '../../service/user.service';
import { Category } from '../../models/category.model';
import { HoursAndMinutesPipe } from '../../../hours-and-minutes.pipe';

@Component({
  selector: 'app-details-recipe',
  standalone: true,
  imports: [CommonModule, HoursAndMinutesPipe],
  templateUrl: './details-recipe.component.html',
  styleUrl: './details-recipe.component.scss'
})
export class DetailsRecipeComponent {

  constructor(private route: ActivatedRoute, private _reciprService: RecipeService, private _categoryService: CategoryService, private _userService: UserService, private router: Router) { }
  
  public recipe!: Recipe
  public byId!: number
  public name!: string
  public category!: Category
  public isUser: Boolean = false

  ngOnInit(){
    this.init()
  }

  init() {
    if (!sessionStorage.getItem('password')) {
      Swal.fire({
        icon: "error",
        title: "Oops, you don't have access permission",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>'
      })
      this.router.navigate(['login'])
    }
    const name = sessionStorage.getItem("name");
    this.route.params.subscribe(param => {
      this.byId = param['id']
    })
    this._reciprService.getRecipeById(this.byId).subscribe({
      next: (res) => {
        this.recipe = res
        this.byId = res.categoryId
      },
      error: (err) => {
        console.log(err);
      }
    })
    this._categoryService.getCategoryById(this.byId).subscribe({
      next: (res) => {
        this.category = res
        this.byId = this.recipe.userId
      },
      error: (err) => {
        console.log(err);
      }
    })

    this._userService.getUserById(this.byId).subscribe({
      next: (res) => {
        if (res.password == sessionStorage.getItem('password'))
          this.isUser = true
        this.byId = this.recipe.id
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  edit() {
    this.router.navigate(['/recipe/edit-recipe', this.recipe.id])
  }

  delete() {
    this._reciprService.deleteRecipeById(this.byId).subscribe({
      next: (res) => {
        this.router.navigate(['recipe/recipes'])
      },
      error: (err) => {
        alert(err)
      }
    })
  }
  
}
