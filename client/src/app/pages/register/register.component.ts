import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, ValidatorFn, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordsMatchValidator() });
  }

  passwordsMatchValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { notMatching: true };
    };
  }

  register(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const { name, email, password } = this.registerForm.value;

        this.http.post(`${environment.apiUrl}/api/auth/register`, { name, email, password }).subscribe({
      next: () => {
        // Save welcome message to session storage
        sessionStorage.setItem('welcomeMessage', `Welcome ${name}! Please log in to access our recipe world!`);

        // Redirect to login
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration error:', err);
        this.errorMessage = err.error?.message || 'Registration failed. Please try again.';
      }
    });
  }
}