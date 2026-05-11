import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ContratService } from '../../core/services/contrat.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="dashboard">
      <div class="welcome-banner">
        <div class="welcome-content">
          <h1>Tableau de bord</h1>
          <p>
            Bienvenue, <strong>{{ currentUser?.username }}</strong>
          </p>
        </div>
        <div class="welcome-icon"><span class="material-symbols-rounded" style="font-size: 64px;">admin_panel_settings</span></div>
      </div>

      <div class="stats-grid">
        <div class="stat-card automobile">
          <div class="stat-icon"><span class="material-symbols-rounded">directions_car</span></div>
          <div class="stat-info">
            <span class="stat-value">{{ stats['AUTOMOBILE'] || 0 }}</span>
            <span class="stat-label">Contrats Automobile</span>
          </div>
        </div>
        <div class="stat-card habitation">
          <div class="stat-icon"><span class="material-symbols-rounded">home</span></div>
          <div class="stat-info">
            <span class="stat-value">{{ stats['HABITATION'] || 0 }}</span>
            <span class="stat-label">Contrats Habitation</span>
          </div>
        </div>
        <div class="stat-card sante">
          <div class="stat-icon"><span class="material-symbols-rounded">medical_services</span></div>
          <div class="stat-info">
            <span class="stat-value">{{ stats['SANTE'] || 0 }}</span>
            <span class="stat-label">Contrats Santé</span>
          </div>
        </div>
        <div class="stat-card total">
          <div class="stat-icon"><span class="material-symbols-rounded">analytics</span></div>
          <div class="stat-info">
            <span class="stat-value">{{ totalContrats }}</span>
            <span class="stat-label">Total Contrats</span>
          </div>
        </div>
      </div>

      <div class="status-section">
        <h2>Répartition par Statut</h2>
        <div class="status-grid">
          <div class="status-card en-cours">
            <span class="status-dot"></span>
            <div>
              <span class="status-count">{{ statutStats['EN_COURS'] || 0 }}</span>
              <span class="status-label">En Cours</span>
            </div>
          </div>
          <div class="status-card valide">
            <span class="status-dot"></span>
            <div>
              <span class="status-count">{{ statutStats['VALIDE'] || 0 }}</span>
              <span class="status-label">Validés</span>
            </div>
          </div>
          <div class="status-card resilie">
            <span class="status-dot"></span>
            <div>
              <span class="status-count">{{ statutStats['RESILIE'] || 0 }}</span>
              <span class="status-label">Résiliés</span>
            </div>
          </div>
        </div>
      </div>

      <div class="quick-actions">
        <h2>Accès Rapide</h2>
        <div class="actions-grid">
          <a routerLink="/clients" class="action-card">
            <span class="action-icon material-symbols-rounded">group</span>
            <span>Gérer les Clients</span>
          </a>
          <a routerLink="/contrats" class="action-card">
            <span class="action-icon material-symbols-rounded">description</span>
            <span>Voir les Contrats</span>
          </a>
          <a routerLink="/paiements" class="action-card">
            <span class="action-icon material-symbols-rounded">payments</span>
            <span>Paiements</span>
          </a>
          <a href="http://localhost:8080/swagger-ui.html" target="_blank" class="action-card api">
            <span class="action-icon material-symbols-rounded">api</span>
            <span>API Swagger</span>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .dashboard {
        padding: 24px;
        max-width: 1200px;
        margin: 0 auto;
      }
      .welcome-banner {
        background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
        color: white;
        border-radius: var(--radius-lg);
        padding: 32px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 32px;
        box-shadow: var(--shadow-md);
      }
      .welcome-banner h1 {
        font-size: 28px;
        font-weight: 700;
        margin: 0 0 8px;
        letter-spacing: -0.5px;
      }
      .welcome-banner p {
        margin: 0;
        opacity: 0.9;
        font-size: 15px;
      }
      .welcome-icon {
        opacity: 0.9;
      }
      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 20px;
        margin-bottom: 32px;
      }
      .stat-card {
        background: white;
        border-radius: var(--radius-lg);
        padding: 24px;
        display: flex;
        align-items: center;
        gap: 20px;
        box-shadow: var(--shadow-sm);
        border: 1px solid var(--border-color);
        transition: transform 0.2s, box-shadow 0.2s;
      }
      .stat-card:hover {
        transform: translateY(-2px);
        box-shadow: var(--shadow-md);
      }
      .stat-card .stat-icon span {
        font-size: 36px;
      }
      .stat-card.automobile .stat-icon { color: var(--accent-color); }
      .stat-card.habitation .stat-icon { color: var(--success-color); }
      .stat-card.sante .stat-icon { color: var(--danger-color); }
      .stat-card.total .stat-icon { color: var(--warning-color); }

      .stat-value {
        font-size: 32px;
        font-weight: 700;
        display: block;
        color: #1a1a1a;
      }
      .stat-label {
        font-size: 13px;
        color: #6c757d;
      }
      .status-section,
      .quick-actions {
        background: white;
        border-radius: var(--radius-lg);
        padding: 24px;
        margin-bottom: 24px;
        box-shadow: var(--shadow-sm);
        border: 1px solid var(--border-color);
      }
      h2 {
        font-size: 18px;
        font-weight: 600;
        color: var(--text-main);
        margin: 0 0 20px;
        letter-spacing: -0.3px;
      }
      .status-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
      }
      .status-card {
        border-radius: var(--radius-md);
        padding: 20px;
        display: flex;
        align-items: center;
        gap: 16px;
      }
      .status-card.en-cours { background: #eff6ff; }
      .status-card.valide { background: #f0fdf4; }
      .status-card.resilie { background: #fef2f2; }
      .status-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
      }
      .en-cours .status-dot { background: var(--accent-color); }
      .valide .status-dot { background: var(--success-color); }
      .resilie .status-dot { background: var(--danger-color); }
      .status-count {
        font-size: 28px;
        font-weight: 700;
        display: block;
        color: var(--text-main);
      }
      .status-label {
        font-size: 13px;
        color: var(--text-muted);
        font-weight: 500;
      }
      .actions-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 16px;
      }
      .action-card {
        background: var(--bg-color);
        border-radius: var(--radius-md);
        padding: 20px;
        text-decoration: none;
        color: var(--text-main);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        transition: all 0.2s;
        border: 1px solid var(--border-color);
      }
      .action-card:hover {
        border-color: var(--accent-color);
        box-shadow: var(--shadow-sm);
        transform: translateY(-2px);
      }
      .action-card.api {
        background: #fffbeb;
        border-color: #fde68a;
      }
      .action-card.api:hover {
        border-color: var(--warning-color);
      }
      .action-card .action-icon {
        color: var(--accent-color);
      }
      .action-card.api .action-icon {
        color: var(--warning-color);
      }
      .action-card span:last-child {
        font-size: 14px;
        font-weight: 600;
        text-align: center;
      }
    `,
  ],
})
export class DashboardComponent implements OnInit {
  stats: Record<string, number> = {};
  statutStats: Record<string, number> = {};
  totalContrats = 0;

  currentUser: any;

  constructor(
    private contratService: ContratService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();

    this.contratService.getStatistiquesParType().subscribe((data: Record<string, number>) => {
      this.stats = data;

      this.totalContrats = Object.values(data).reduce((a, b) => a + b, 0);
    });

    this.contratService.getStatistiquesParStatut().subscribe((data: any) => {
      this.statutStats = data;
    });
  }
}
