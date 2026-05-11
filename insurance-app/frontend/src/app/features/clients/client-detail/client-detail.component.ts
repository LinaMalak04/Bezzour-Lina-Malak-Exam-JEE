import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClientService } from '../../../core/services/client.service';
import { Client } from '../../../core/models';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-container">
      <div class="header-actions">
        <a routerLink="/clients" class="btn-back">
          <span class="material-symbols-rounded">arrow_back</span> Retour aux clients
        </a>
      </div>

      <div class="profile-card" *ngIf="client">
        <div class="profile-info">
          <div class="profile-avatar"><span class="material-symbols-rounded">person</span></div>
          <div class="header-content">
            <h1>{{ client.nom }}</h1>
            <p class="client-id">ID: {{ client.id }}</p>
          </div>
        </div>
        <h2>Contrats ({{ client.contrats?.length || 0 }})</h2>
        <div class="contrats-grid">
          <a *ngFor="let contrat of client.contrats" [routerLink]="['/contrats']" [queryParams]="{ highlight: contrat.id }" class="contrat-card" [ngClass]="contrat.typeContrat.toLowerCase()">
            <div class="contrat-icon">
              <span class="material-symbols-rounded" *ngIf="contrat.typeContrat === 'AUTOMOBILE'">directions_car</span>
              <span class="material-symbols-rounded" *ngIf="contrat.typeContrat === 'HABITATION'">home</span>
              <span class="material-symbols-rounded" *ngIf="contrat.typeContrat === 'SANTE'">medical_services</span>
            </div>
            <div class="contrat-details">
              <h3>Contrat {{ contrat.typeContrat | titlecase }}</h3>
              <span class="status-badge" [ngClass]="contrat.statut.toLowerCase().replace('_', '-')">
                {{ contrat.statut.replace('_', ' ') | titlecase }}
              </span>
              <p class="meta">
                <span>Prime: <strong>{{ contrat.montantCotisation }}€</strong></span>
                <span>Début: {{ contrat.dateSouscription | date:'dd/MM/yyyy' }}</span>
              </p>
            </div>
          </a>
        </div>

        <div class="empty-state" *ngIf="!client.contrats?.length">
          <span class="empty-icon material-symbols-rounded">description</span>
          <p>Ce client n'a pas encore de contrats.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-container { padding: 24px; max-width: 1000px; margin: 0 auto; }
    .header-actions { margin-bottom: 24px; }
    .btn-back { display: inline-flex; align-items: center; gap: 8px; color: var(--text-muted); text-decoration: none; font-weight: 500; transition: color 0.2s; }
    .btn-back:hover { color: var(--accent-color); }
    .btn-back .material-symbols-rounded { font-size: 20px; }
    .profile-card { background: white; border-radius: var(--radius-xl); padding: 32px; margin-bottom: 32px; box-shadow: var(--shadow-md); border: 1px solid var(--border-color); display: flex; flex-direction: column; }
    .profile-info { display: flex; gap: 24px; align-items: center; margin-bottom: 24px; width: 100%; }
    .profile-avatar { width: 72px; height: 72px; background: var(--bg-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--accent-color); flex-shrink: 0; border: 1px solid var(--border-color); }
    .profile-avatar .material-symbols-rounded { font-size: 40px; }
    .header-content h1 { margin: 0 0 8px; font-size: 28px; color: var(--text-main); font-weight: 700; letter-spacing: -0.5px; }
    .client-id { background: var(--bg-color); padding: 4px 8px; border-radius: 4px; font-size: 13px; font-weight: 600; color: var(--text-muted); display: inline-block; margin: 0; border: 1px solid var(--border-color); }
    .contrats-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px; margin-top: 16px; }
    .contrat-card { background: white; border-radius: var(--radius-lg); padding: 20px; box-shadow: var(--shadow-sm); border: 1px solid var(--border-color); border-left: 4px solid var(--border-color); display: flex; gap: 16px; transition: transform 0.2s, box-shadow 0.2s; text-decoration: none; color: inherit; }
    .contrat-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); }
    .contrat-card.automobile { border-left-color: var(--accent-color); }
    .contrat-card.habitation { border-left-color: var(--success-color); }
    .contrat-card.sante { border-left-color: var(--danger-color); }
    .contrat-card.automobile .contrat-icon { color: var(--accent-color); background: #eff6ff; }
    .contrat-card.habitation .contrat-icon { color: var(--success-color); background: #f0fdf4; }
    .contrat-card.sante .contrat-icon { color: var(--danger-color); background: #fef2f2; }
    .contrat-icon { display: flex; align-items: center; justify-content: center; width: 48px; height: 48px; border-radius: var(--radius-md); flex-shrink: 0; }
    .contrat-icon .material-symbols-rounded { font-size: 28px; }
    .contrat-details { flex: 1; }
    .contrat-details h3 { margin: 0 0 8px; font-size: 16px; color: var(--text-main); font-weight: 600; }
    .status-badge { display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: 600; margin-bottom: 8px; }
    .status-badge.en-cours { background: #eff6ff; color: #1d4ed8; }
    .status-badge.valide { background: #f0fdf4; color: #15803d; }
    .status-badge.resilie { background: #fef2f2; color: #b91c1c; }
    .meta { margin: 0; font-size: 13px; color: var(--text-muted); display: flex; justify-content: space-between; margin-top: 12px; }
    .meta strong { color: var(--text-main); }
    .empty-state { text-align: center; padding: 48px; background: white; border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); border: 1px solid var(--border-color); margin-top: 16px; }
    .empty-icon { font-size: 48px; display: block; margin-bottom: 16px; opacity: 0.5; color: var(--text-muted); }
    .empty-state p { color: var(--text-muted); margin: 0; font-size: 16px; font-weight: 500; }
  `]
})
export class ClientDetailComponent implements OnInit {
  client: Client | null = null;
  constructor(private route: ActivatedRoute, private clientService: ClientService) {}
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.clientService.getWithContrats(id).subscribe(data => this.client = data);
  }
}
