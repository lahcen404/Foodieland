import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { LoginRequest } from '../../../core/models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm!: FormGroup;
  loading = signal<boolean>(false);
  errorMessage = signal<string>('');

  constructor() {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');

    const credentials: LoginRequest = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    console.log('🔑 Attempting login with:', credentials.email);

    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log('✅ Login successful! Token:', response.access_token?.substring(0, 20) + '...');
        console.log('👤 User:', response.user);

        // Save user info to localStorage if available
        if (response.user) {
          this.authService.saveUser(response.user);
          console.log('💾 User saved to localStorage');
        }

        this.loading.set(false);
        console.log('🚀 Redirecting to /home...');
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('❌ Login error:', error);
        this.loading.set(false);
        this.errorMessage.set(error.error?.message || 'Login failed. Please try again.');
      }
    });
  }
}
