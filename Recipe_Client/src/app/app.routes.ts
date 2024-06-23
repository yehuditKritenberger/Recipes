import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login/login.component';
import { RegisterComponent } from './components/login/register/register.component';
import { LogoutComponent } from './components/login/logout/logout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'recipe', loadChildren:()=>import  ('./components/recipe/recipe/recipe.module').then(c=>c.RecipeModule)},
    { path: 'register', component: RegisterComponent },
    { path: 'logout',component: LogoutComponent },
    { path: '**', component: NotFoundComponent}]
    ;