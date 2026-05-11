import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <h1>🛡️ Inscription</h1>
          <p>Créer un nouveau compte</p>
        </div>
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label>Nom d'utilisateur</label>
            <input type="text" formControlName="username" />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" formControlName="email" />
          </div>
          <div class="form-group">
            <label>Nom complet</label>
            <input type="text" formControlName="fullName" />
          </div>
          <div class="form-group">
            <label>Mot de passe</label>
            <input type="password" formControlName="password" />
          </div>
          <div class="form-group">
            <label>Rôle</label>
            <select formControlName="role">
              <option value="ROLE_CLIENT">Client</option>
              <option value="ROLE_EMPLOYE">Employé</option>
            </select>
          </div>
          <div class="success-msg" *ngIf="successMsg">{{ successMsg }}</div>
          <div class="error-msg" *ngIf="errorMsg">{{ errorMsg }}</div>
          <button type="submit" [disabled]="loading" class="btn-primary">
            {{ loading ? 'Inscription...' : "S'inscrire" }}
          </button>
          <p class="link-text"><a routerLink="/auth/login">← Retour à la connexion</a></p>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .auth-container { display:flex; justify-content:center; align-items:center; min-height:100vh; background:linear-gradient(135deg,#1a3a5c,#0d6efd); }
    .auth-card { background:white; border-radius:16px; padding:40px; width:100%; max-width:420px; box-shadow:0 20px 60px rgba(0,0,0,0.3); }
    .auth-header { text-align:center; margin-bottom:24px; }
    h1 { font-size:22px; font-weight:700; color:#1a3a5c; }
    .auth-header p { color:#6c757d; }
    .form-group { margin-bottom:16px; }
    label { display:block; font-size:13px; font-weight:600; margin-bottom:5px; }
    input, select { width:100%; padding:10px 14px; border:2px solid #e5e7eb; border-radius:8px; font-size:14px; outline:none; box-sizing:border-box; }
    input:focus, select:focus { border-color:#0d6efd; }
    .success-msg { background:#d1fae5; color:#065f46; padding:10px; border-radius:6px; margin-bottom:12px; font-size:13px; }
    .error-msg { background:#fff5f5; color:#dc3545; padding:10px; border-radius:6px; margin-bottom:12px; font-size:13px; }
    .btn-primary { width:100%; padding:12px; background:#0d6efd; color:white; border:none; border-radius:8px; font-size:15px; font-weight:600; cursor:pointer; }
    .link-text { text-align:center; margin-top:16px; font-size:13px; }
    a { color:#0d6efd; text-decoration:none; }
  `]
})
export class RegisterComponent {
  form: FormGroup;
  loading = false;
  successMsg = '';
  errorMsg = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fullName: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['ROLE_CLIENT']
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    this.authService.register(this.form.value).subscribe({
      next: () => {
        this.successMsg = 'Compte créé! Redirection...';
        setTimeout(() => this.router.navigate(['/auth/login']), 1500);
      },
      error: (err) => {
        this.errorMsg = err.error || 'Erreur lors de l\'inscription';
        this.loading = false;
      }
    });
  }
}
