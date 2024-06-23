import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallRecipeComponent } from './small-recipe.component';

describe('SmallRecipeComponent', () => {
  let component: SmallRecipeComponent;
  let fixture: ComponentFixture<SmallRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SmallRecipeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SmallRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
