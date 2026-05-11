import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContratService } from '../../../core/services/contrat.service';
import { ClientService } from '../../../core/services/client.service';
import { Contrat, Client, TypeContrat } from '../../../core/models';

@Component({
  selector: 'app-contrats-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1><span class="material-symbols-rounded" style="vertical-align: bottom; font-size: 28px; color: var(--accent-color); margin-right: 8px;">description</span>Gestion des Contrats</h1>
        <div class="header-actions">
          <select [(ngModel)]="filterType" (change)="filterContrats()">
            <option value="">Tous les types</option>
            <option value="AUTOMOBILE">Automobile</option>
            <option value="HABITATION">Habitation</option>
            <option value="SANTE">Santé</option>
          </select>
          <select [(ngModel)]="filterStatut" (change)="filterContrats()">
            <option value="">Tous les statuts</option>
            <option value="EN_COURS">En Cours</option>
            <option value="VALIDE">Validé</option>
            <option value="RESILIE">Résilié</option>
          </select>
          <button class="btn-add" (click)="showForm = !showForm"><span class="material-symbols-rounded icon-small">add</span> Nouveau Contrat</button>
        </div>
      </div>

      <!-- Form -->
      <div class="form-card" *ngIf="showForm">
        <h3>Nouveau Contrat</h3>
        <div class="form-grid">
          <div class="form-group">
            <label>Type de contrat *</label>
            <select [(ngModel)]="newContrat.typeContrat">
              <option value="">-- Choisir --</option>
              <option value="AUTOMOBILE">Automobile</option>
              <option value="HABITATION">Habitation</option>
              <option value="SANTE">Santé</option>
            </select>
          </div>
          <div class="form-group">
            <label>Client *</label>
            <select [(ngModel)]="newContrat.clientId">
              <option [value]="0">-- Choisir --</option>
              <option *ngFor="let c of clients" [value]="c.id">{{ c.nom }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Date de souscription *</label>
            <input type="date" [(ngModel)]="newContrat.dateSouscription" />
          </div>
          <div class="form-group">
            <label>Montant cotisation (MAD) *</label>
            <input type="number" [(ngModel)]="newContrat.montantCotisation" placeholder="500.00" />
          </div>
          <div class="form-group">
            <label>Durée (mois) *</label>
            <input type="number" [(ngModel)]="newContrat.dureeContrat" placeholder="12" />
          </div>
          <div class="form-group">
            <label>Taux de couverture (%) *</label>
            <input type="number" [(ngModel)]="newContrat.tauxCouverture" placeholder="80" />
          </div>
          <!-- Automobile fields -->
          <ng-container *ngIf="newContrat.typeContrat === 'AUTOMOBILE'">
            <div class="form-group">
              <label>Immatriculation *</label>
              <input [(ngModel)]="newContrat.numeroImmatriculation" placeholder="123456-A-7" />
            </div>
            <div class="form-group">
              <label>Marque *</label>
              <input [(ngModel)]="newContrat.marqueVehicule" placeholder="Toyota" />
            </div>
            <div class="form-group">
              <label>Modèle *</label>
              <input [(ngModel)]="newContrat.modeleVehicule" placeholder="Yaris" />
            </div>
          </ng-container>
          <!-- Habitation fields -->
          <ng-container *ngIf="newContrat.typeContrat === 'HABITATION'">
            <div class="form-group">
              <label>Type logement *</label>
              <select [(ngModel)]="newContrat.typeLogement">
                <option value="APPARTEMENT">Appartement</option>
                <option value="MAISON">Maison</option>
                <option value="LOCAL_COMMERCIAL">Local commercial</option>
              </select>
            </div>
            <div class="form-group">
              <label>Adresse *</label>
              <input [(ngModel)]="newContrat.adresseLogement" placeholder="Adresse du bien" />
            </div>
            <div class="form-group">
              <label>Superficie (m²)</label>
              <input type="number" [(ngModel)]="newContrat.superficie" placeholder="85" />
            </div>
          </ng-container>
          <!-- Sante fields -->
          <ng-container *ngIf="newContrat.typeContrat === 'SANTE'">
            <div class="form-group">
              <label>Niveau de couverture *</label>
              <select [(ngModel)]="newContrat.niveauCouverture">
                <option value="BASIQUE">Basique</option>
                <option value="INTERMEDIAIRE">Intermédiaire</option>
                <option value="PREMIUM">Premium</option>
              </select>
            </div>
            <div class="form-group">
              <label>Nb personnes couvertes *</label>
              <input type="number" [(ngModel)]="newContrat.nbPersonnesCouvertes" placeholder="2" />
            </div>
          </ng-container>
        </div>
        <div class="form-actions">
          <button class="btn-save" (click)="saveContrat()">Créer le contrat</button>
          <button class="btn-cancel" (click)="showForm = false">Annuler</button>
        </div>
      </div>

      <!-- Contrats table -->
      <div class="table-card">
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Type</th><th>Client</th><th>Souscription</th>
              <th>Cotisation</th><th>Durée</th><th>Statut</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let c of filteredContrats">
              <td><span class="id-badge">{{ c.id }}</span></td>
              <td>
                <span class="type-badge" [class]="c.typeContrat?.toLowerCase()">
                  <span class="material-symbols-rounded icon-badge" *ngIf="c.typeContrat === 'AUTOMOBILE'">directions_car</span>
                  <span class="material-symbols-rounded icon-badge" *ngIf="c.typeContrat === 'HABITATION'">home</span>
                  <span class="material-symbols-rounded icon-badge" *ngIf="c.typeContrat === 'SANTE'">medical_services</span>
                  {{ c.typeContrat }}
                </span>
              </td>
              <td><strong>{{ c.clientNom }}</strong></td>
              <td>{{ c.dateSouscription | date:'dd/MM/yyyy' }}</td>
              <td><strong>{{ c.montantCotisation | number:'1.2-2' }} MAD</strong></td>
              <td>{{ c.dureeContrat }} mois</td>
              <td><span class="statut-badge" [class]="c.statut?.toLowerCase()">{{ statutLabel(c.statut!) }}</span></td>
              <td class="actions">
                <button *ngIf="c.statut === 'EN_COURS'" class="btn-icon btn-valider" (click)="valider(c.id!)" title="Valider"><span class="material-symbols-rounded">check_circle</span></button>
                <button *ngIf="c.statut !== 'RESILIE'" class="btn-icon btn-resilier" (click)="resilier(c.id!)" title="Résilier"><span class="material-symbols-rounded">cancel</span></button>
              </td>
            </tr>
            <tr *ngIf="filteredContrats.length === 0">
              <td colspan="8" class="empty-row">Aucun contrat trouvé</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .page-container { padding:24px; max-width:1300px; margin:0 auto; }
    .page-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; flex-wrap:wrap; gap:16px; }
    h1 { font-size:24px; font-weight:700; margin:0; color:var(--text-main); letter-spacing: -0.5px; }
    .header-actions { display:flex; gap:12px; align-items:center; flex-wrap:wrap; }
    select { padding:10px 16px; border:1px solid var(--border-color); border-radius:var(--radius-md); outline:none; font-size:14px; color: var(--text-main); transition: all 0.2s; }
    select:focus { border-color:var(--accent-color); box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
    .btn-add { background:var(--accent-color); color:white; border:none; padding:10px 20px; border-radius:var(--radius-md); font-weight:600; cursor:pointer; white-space:nowrap; display: flex; align-items: center; gap: 8px; transition: background 0.2s; }
    .btn-add:hover { background: var(--accent-hover); }
    .icon-small { font-size: 20px; }
    .form-card { background:white; border-radius:var(--radius-lg); padding:24px; margin-bottom:24px; box-shadow:var(--shadow-sm); border:1px solid var(--border-color); border-top:3px solid var(--accent-color); }
    .form-card h3 { margin:0 0 20px; font-size: 18px; color: var(--text-main); font-weight: 600; }
    .form-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(200px,1fr)); gap:16px; margin-bottom:24px; }
    .form-group label { display:block; font-size:13px; font-weight:600; margin-bottom:8px; color:var(--text-main); }
    .form-group input, .form-group select { width:100%; padding:12px 16px; border:1px solid var(--border-color); border-radius:var(--radius-md); font-size:14px; outline:none; box-sizing:border-box; transition: all 0.2s; }
    .form-group input:focus, .form-group select:focus { border-color:var(--accent-color); box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
    .form-actions { display:flex; gap:12px; }
    .btn-save { background:var(--success-color); color:white; border:none; padding:10px 24px; border-radius:var(--radius-md); cursor:pointer; font-weight:600; transition: opacity 0.2s; }
    .btn-save:hover { opacity: 0.9; }
    .btn-cancel { background:white; color:var(--text-muted); border:1px solid var(--border-color); padding:10px 24px; border-radius:var(--radius-md); cursor:pointer; font-weight: 500; transition: all 0.2s; }
    .btn-cancel:hover { background: var(--bg-color); color: var(--text-main); }
    .table-card { background:white; border-radius:var(--radius-lg); overflow:hidden; box-shadow:var(--shadow-sm); border: 1px solid var(--border-color); }
    table { width:100%; border-collapse:collapse; }
    thead { background:var(--bg-color); border-bottom: 1px solid var(--border-color); }
    th { padding:16px; text-align:left; font-size:12px; font-weight:600; color:var(--text-muted); text-transform:uppercase; letter-spacing: 0.5px; }
    td { padding:16px; border-bottom:1px solid var(--border-color); font-size:14px; color: var(--text-main); vertical-align:middle; }
    tbody tr:last-child td { border-bottom: none; }
    .id-badge { background:var(--bg-color); padding:4px 8px; border-radius:4px; font-size:12px; font-weight:600; color: var(--text-muted); border: 1px solid var(--border-color); }
    .type-badge { display: inline-flex; align-items: center; gap: 4px; padding:4px 10px; border-radius:20px; font-size:12px; font-weight:600; }
    .icon-badge { font-size: 16px; }
    .type-badge.automobile { background:#eff6ff; color:#1d4ed8; }
    .type-badge.habitation { background:#f0fdf4; color:#15803d; }
    .type-badge.sante { background:#fef2f2; color:#b91c1c; }
    .statut-badge { padding:4px 10px; border-radius:20px; font-size:12px; font-weight:600; }
    .statut-badge.en_cours { background:#eff6ff; color:#1d4ed8; }
    .statut-badge.valide { background:#f0fdf4; color:#15803d; }
    .statut-badge.resilie { background:#fef2f2; color:#b91c1c; }
    .actions { display:flex; gap:8px; align-items: center; }
    .btn-icon { background: none; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: var(--radius-md); transition: all 0.2s; color: var(--text-muted); }
    .btn-icon .material-symbols-rounded { font-size: 20px; }
    .btn-valider:hover { background: #f0fdf4; color: var(--success-color); }
    .btn-resilier:hover { background: #fef2f2; color: var(--danger-color); }
    .empty-row { text-align:center; color:var(--text-muted); padding:48px !important; }
    tr:hover td { background:#fafafa; }
  `]
})
export class ContratsListComponent implements OnInit {
  allContrats: Contrat[] = [];
  filteredContrats: Contrat[] = [];
  clients: Client[] = [];
  filterType = '';
  filterStatut = '';
  showForm = false;
  newContrat: any = { typeContrat: '', clientId: 0, dateSouscription: '', montantCotisation: 0, dureeContrat: 12, tauxCouverture: 80 };

  constructor(private contratService: ContratService, private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadContrats();
    this.clientService.getAll().subscribe(d => this.clients = d);
  }

  loadContrats(): void {
    this.contratService.getAll().subscribe(data => {
      this.allContrats = data;
      this.filterContrats();
    });
  }

  filterContrats(): void {
    this.filteredContrats = this.allContrats.filter(c => {
      const matchType = !this.filterType || c.typeContrat === this.filterType;
      const matchStatut = !this.filterStatut || c.statut === this.filterStatut;
      return matchType && matchStatut;
    });
  }

  saveContrat(): void {
    const type = this.newContrat.typeContrat;
    if (!type) return;
    let obs;
    if (type === 'AUTOMOBILE') obs = this.contratService.createAutomobile(this.newContrat);
    else if (type === 'HABITATION') obs = this.contratService.createHabitation(this.newContrat);
    else obs = this.contratService.createSante(this.newContrat);
    (obs as any).subscribe({
      next: () => {
        this.loadContrats();
        this.showForm = false;
      },
      error: (err: any) => console.error(err),
    });
  }

  valider(id: number): void {
    this.contratService.valider(id).subscribe(() => this.loadContrats());
  }

  resilier(id: number): void {
    if (confirm('Résilier ce contrat ?')) {
      this.contratService.resilier(id).subscribe(() => this.loadContrats());
    }
  }

  statutLabel(s: string): string {
    return { EN_COURS: 'En Cours', VALIDE: 'Validé', RESILIE: 'Résilié' }[s] || s;
  }
}
