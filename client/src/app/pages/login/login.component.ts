import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string = '';
  welcomeMessage: string | null = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // Retrieve welcome message from session storage (if any)
    this.welcomeMessage = sessionStorage.getItem('welcomeMessage');

    // Remove welcome message after 5 seconds
    if (this.welcomeMessage) {
      setTimeout(() => {
        this.welcomeMessage = null;
        sessionStorage.removeItem('welcomeMessage');
      }, 5000);
    }
  }

  // Login Function
  login(): void {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please enter a valid email and password.';
      return;
    }

    console.log('Attempting Login with:', this.loginForm.value); // Debugging

    
    this.http.post(`${environment.apiUrl}/api/auth/login`, this.loginForm.value).subscribe(
      (response: any) => {
        console.log('Login Successful:', response); // Debugging
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Login Error:', error); // Debugging
        this.errorMessage = 'Invalid credentials. Please try again.';
      }
    );
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  logout(): void {
    console.log('🔴 Logging out...');
    localStorage.removeItem('token');
    console.log('🟢 Token removed from localStorage:', localStorage.getItem('token')); // Step 2

    sessionStorage.clear();
    console.log('🟢 Session storage cleared'); 

    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    console.log('🟢 Cookie cleared'); 

    setTimeout(() => {
      console.log('🟢 Redirecting to login...');
      this.router.navigate(['/login']).then(() => {
        window.location.reload();
      });
    }, 100);
  }
}