import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

import { Recipe } from '../../models/recipe.model';
import { HoursAndMinutesPipe } from '../../../hours-and-minutes.pipe';

@Component({
  selector: 'app-small-recipe',
  standalone: true,
  imports: [CommonModule, HoursAndMinutesPipe, HttpClientModule],
  templateUrl: './small-recipe.component.html',
  styleUrl: './small-recipe.component.scss'
})
export class SmallRecipeComponent {

  @Input() 
  recipe!: Recipe;
  constructor( private router: Router) { }
  showAllDetails()
  {
    this.router.navigate(['/recipe/recipe-details',this.recipe.id]);
  }
}
