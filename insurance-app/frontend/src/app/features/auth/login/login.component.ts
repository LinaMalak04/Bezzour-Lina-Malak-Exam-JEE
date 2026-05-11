import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="auth-container">
      <div class="auth-card">
        <div class="auth-header">
          <div class="logo"><span class="material-symbols-rounded" style="font-size: 48px; color: var(--accent-color);">admin_panel_settings</span></div>
          <h1>AssuranceMS</h1>
          <p>Connectez-vous à votre espace</p>
        </div>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label>Nom d'utilisateur</label>
            <input type="text" formControlName="username" placeholder="admin / employe / client1" />
            <span class="error" *ngIf="loginForm.get('username')?.invalid && loginForm.get('username')?.touched">
              Champ obligatoire
            </span>
          </div>
          <div class="form-group">
            <label>Mot de passe</label>
            <input type="password" formControlName="password" placeholder="••••••••" />
          </div>
          <div class="error-msg" *ngIf="errorMsg">{{ errorMsg }}</div>
          <button type="submit" [disabled]="loading" class="btn-primary">
            {{ loading ? 'Connexion...' : 'Se connecter' }}
          </button>
        </form>
        <div class="demo-hints">
          <p><strong>Comptes de démo :</strong></p>
          <p>admin / Admin123! &nbsp;|&nbsp; employe / Employe123! &nbsp;|&nbsp; client1 / Client123!</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container { display:flex; justify-content:center; align-items:center; min-height:100vh; background: var(--bg-color); }
    .auth-card { background:white; border-radius:var(--radius-xl); padding:40px; width:100%; max-width:420px; box-shadow:var(--shadow-lg); border: 1px solid var(--border-color); }
    .auth-header { text-align:center; margin-bottom:32px; }
    .logo { margin-bottom:16px; }
    h1 { font-size:24px; font-weight:700; color:var(--text-main); margin:0; letter-spacing: -0.5px; }
    .auth-header p { color:var(--text-muted); margin-top:8px; font-size: 15px; }
    .form-group { margin-bottom:20px; }
    label { display:block; font-size:14px; font-weight:600; color:var(--text-main); margin-bottom:8px; }
    input { width:100%; padding:12px 16px; border:1px solid var(--border-color); border-radius:var(--radius-md); font-size:15px; outline:none; transition:all 0.2s; box-sizing:border-box; color: var(--text-main); }
    input:focus { border-color:var(--accent-color); box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
    .error { font-size:12px; color:var(--danger-color); margin-top:6px; display:block; }
    .error-msg { background:#fef2f2; color:var(--danger-color); padding:12px; border-radius:var(--radius-md); margin-bottom:20px; font-size:14px; border: 1px solid #fecaca; }
    .btn-primary { width:100%; padding:14px; background:var(--accent-color); color:white; border:none; border-radius:var(--radius-md); font-size:16px; font-weight:600; cursor:pointer; transition:background 0.2s; box-shadow: var(--shadow-sm); }
    .btn-primary:hover:not(:disabled) { background:var(--accent-hover); }
    .btn-primary:disabled { opacity:0.7; cursor:not-allowed; }
    .demo-hints { margin-top:32px; padding:16px; background:var(--bg-color); border-radius:var(--radius-md); font-size:13px; text-align:center; color:var(--text-muted); border: 1px solid var(--border-color); }
    .demo-hints strong { color:var(--text-main); display: block; margin-bottom: 8px; }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  errorMsg = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;
    this.loading = true;
    this.errorMsg = '';
    this.authService.login(this.loginForm.value).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: (err) => {
        this.errorMsg = 'Identifiants incorrects. Veuillez réessayer.';
        this.loading = false;
      }
    });
  }
}
