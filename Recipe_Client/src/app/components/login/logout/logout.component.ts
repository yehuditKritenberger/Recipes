import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {

  constructor(private router: Router) { }
  logout() {
    sessionStorage.clear();
    this.router.navigate(['recipe/recipes'])
  }
}
