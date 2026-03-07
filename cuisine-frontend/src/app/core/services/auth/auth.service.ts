import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { LoginRequest, RegisterRequest, AuthResponse, User } from '../../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api';

  currentUser = signal<User | null>(null);
  isAuthenticated = signal<boolean>(false);
  userRole = signal<'admin' | 'user' | null>(null);

  constructor() {
    this.loadUserFromStorage();
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        this.setToken(response.access_token);
        if (response.user) {
          this.saveUser(response.user);
          this.isAuthenticated.set(true);
        }
      })
    );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
      tap((response) => {
        if (response.access_token) {
          this.setToken(response.access_token);
          if (response.user) {
            this.saveUser(response.user);
            this.isAuthenticated.set(true);
          }
        }
      })
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        this.clearAuth();
      })
    );
  }

  private setToken(token: string): void {
    localStorage.setItem('auth_token', token);
    this.isAuthenticated.set(true);
  }

  clearAuth(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.userRole.set(null);
    this.isAuthenticated.set(false);
  }

  public initializeAuthState(): void {
    console.log('🔐 Initializing auth state from storage...');
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('user');

    if (token) {
      this.isAuthenticated.set(true);
    }

    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        this.currentUser.set(parsedUser);
        this.userRole.set(parsedUser.role);
      } catch (e) {
        this.clearAuth();
      }
    }
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  saveUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUser.set(user);
    this.userRole.set(user.role);
  }
}
