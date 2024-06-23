import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

import { passwordValidator } from '../../password.validators';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public loginForm!: FormGroup;
  constructor(private _userService: UserService, private route: Router) { }
  ngOnInit(): void {

    this.loginForm = new FormGroup({
      "name": new FormControl("", [Validators.required]),
      "password": new FormControl("", [Validators.required, passwordValidator])
    })
  }
  save() {
    this._userService.login(this.loginForm.value.name, this.loginForm.value.password).subscribe({
      next: (res) => {
        if (res == 0) {
          sessionStorage.setItem("name", this.loginForm.value.name);
          sessionStorage.setItem("password", this.loginForm.value.password)
          this.route.navigate(['recipe/recipes'])
        }
        else if (res == 1) {
          this.route.navigate(['register'], { queryParams: { name: this.loginForm.value.name } })
        }
      }
    })
  }

}
