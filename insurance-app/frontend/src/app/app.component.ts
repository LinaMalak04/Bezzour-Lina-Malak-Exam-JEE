import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="app-layout" [class.authenticated]="isAuth">
      <!-- Sidebar -->
      <aside class="sidebar" *ngIf="isAuth">
        <div class="sidebar-header">
          <span class="logo-icon material-symbols-rounded">admin_panel_settings</span>
          <span class="logo-text">AssuranceMS</span>
        </div>
        <nav class="sidebar-nav">
          <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">
            <span class="nav-icon material-symbols-rounded">dashboard</span><span>Tableau de bord</span>
          </a>
          <a routerLink="/clients" routerLinkActive="active" class="nav-item">
            <span class="nav-icon material-symbols-rounded">group</span><span>Clients</span>
          </a>
          <a routerLink="/contrats" routerLinkActive="active" class="nav-item">
            <span class="nav-icon material-symbols-rounded">description</span><span>Contrats</span>
          </a>
          <a routerLink="/paiements" routerLinkActive="active" class="nav-item">
            <span class="nav-icon material-symbols-rounded">payments</span><span>Paiements</span>
          </a>
        </nav>
        <div class="sidebar-footer">
          <div class="user-info">
            <div class="user-avatar">{{ currentUser?.username?.[0]?.toUpperCase() }}</div>
            <div>
              <div class="user-name">{{ currentUser?.username }}</div>
              <div class="user-role">{{ currentUser?.roles?.[0] }}</div>
            </div>
          </div>
          <button class="logout-btn" (click)="logout()">Déconnexion</button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="main-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [
    `
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      .app-layout {
        display: flex;
        min-height: 100vh;
        background: var(--bg-color);
      }
      .app-layout:not(.authenticated) .main-content {
        width: 100%;
      }
      .sidebar {
        width: 250px;
        min-height: 100vh;
        background: var(--primary-color);
        color: white;
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
        box-shadow: 4px 0 10px rgba(0,0,0,0.05);
      }
      .sidebar-header {
        padding: 24px;
        display: flex;
        align-items: center;
        gap: 12px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }
      .logo-icon {
        font-size: 28px;
        color: var(--accent-color);
      }
      .logo-text {
        font-size: 18px;
        font-weight: 700;
        letter-spacing: -0.5px;
      }
      .sidebar-nav {
        flex: 1;
        padding: 24px 0;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }
      .nav-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 24px;
        color: rgba(255, 255, 255, 0.7);
        text-decoration: none;
        transition: all 0.2s;
        font-weight: 500;
        font-size: 14px;
      }
      .nav-item:hover {
        background: rgba(255, 255, 255, 0.05);
        color: white;
      }
      .nav-item.active {
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border-right: 3px solid var(--accent-color);
      }
      .nav-icon {
        font-size: 18px;
      }
      .sidebar-footer {
        padding: 20px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
      }
      .user-info {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 12px;
      }
      .user-avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: #0d6efd;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
      }
      .user-name {
        font-size: 14px;
        font-weight: 600;
      }
      .user-role {
        font-size: 11px;
        color: rgba(255, 255, 255, 0.6);
      }
      .logout-btn {
        width: 100%;
        padding: 10px;
        background: rgba(255, 255, 255, 0.05);
        color: white;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: var(--radius-md);
        cursor: pointer;
        font-size: 13px;
        font-weight: 500;
        transition: all 0.2s;
      }
      .logout-btn:hover {
        background: rgba(220, 53, 69, 0.7);
      }
      .main-content {
        flex: 1;
        margin-left: 250px;
        min-height: 100vh;
      }
      .authenticated .main-content {
        margin-left: 250px;
      }
      :not(.authenticated) .main-content {
        margin-left: 0;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  isAuth = false;
  currentUser: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user: any) => {
      this.isAuth = !!user;
      this.currentUser = user;
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
