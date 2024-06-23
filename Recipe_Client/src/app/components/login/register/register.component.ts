import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';

import { UserService } from '../../service/user.service';
import { User } from '../../models/user.model';
import { passwordValidator } from '../../password.validators';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule ,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  public registerForm!: FormGroup;
  public name!:string
  public user!:User
  constructor(private _userService: UserService, private route:Router ,private activateRout:ActivatedRoute) { }
  ngOnInit(): void {
    this.activateRout.queryParams.subscribe(params => {this.name=params['name']})
    this.registerForm = new FormGroup({
      "id": new FormControl("", [Validators.required]),
      "name": new FormControl(this.name, [Validators.required]),
      "adress": new FormControl("", [Validators.required]),
      "email": new FormControl("", [Validators.required, Validators.email]),
      "password": new FormControl("", [Validators.required, passwordValidator]),
    })
  }
  save() {
     this._userService.register(this.registerForm.value).subscribe({
      next:(res)=>{  
      sessionStorage.setItem("name",this.registerForm.value.name);
     sessionStorage.setItem("password",this.registerForm.value.password)
     this.route.navigate(['recipe/recipes'])
      },
        error:(err)=>console.log(err)})
      }
}
