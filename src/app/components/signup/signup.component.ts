import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../shared/auth.service';
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  errors = null;
  showProgress: boolean;

  constructor(
    public router: Router,
    public fb: FormBuilder,
    public authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      name: [''],
      email: [''],
      password: [''],
      password_confirmation: ['']
    })
  }

  ngOnInit() { }

  onSubmit() {
    this.showProgress = true;
    this.authService.register(this.registerForm.value).subscribe(
      result => {
        this.showProgress = false;
      },
      error => {
        this.showProgress = false;
        this.errors = error.error;
      },
      () => {
        this.registerForm.reset();
        this.router.navigate(['profile']);
        this.showProgress = false;
      }
    )
  }

}
