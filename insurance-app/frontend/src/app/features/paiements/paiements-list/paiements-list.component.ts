import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Paiement, Contrat } from '../../../core/models';
import { ContratService } from '../../../core/services/contrat.service';

@Component({
  selector: 'app-paiements-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1><span class="material-symbols-rounded" style="vertical-align: bottom; font-size: 28px; color: var(--accent-color); margin-right: 8px;">payments</span>Gestion des Paiements</h1>
        <button class="btn-add" (click)="showForm = !showForm"><span class="material-symbols-rounded icon-small">add</span> Nouveau Paiement</button>
      </div>

      <div class="form-card" *ngIf="showForm">
        <h3>Enregistrer un paiement</h3>
        <div class="form-grid">
          <div class="form-group">
            <label>Contrat *</label>
            <select [(ngModel)]="newPaiement.contratId">
              <option [value]="0">-- Choisir un contrat --</option>
              <option *ngFor="let c of contrats" [value]="c.id">
                #{{ c.id }} - {{ c.typeContrat }} - {{ c.clientNom }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>Date *</label>
            <input type="date" [(ngModel)]="newPaiement.date" />
          </div>
          <div class="form-group">
            <label>Montant (MAD) *</label>
            <input type="number" [(ngModel)]="newPaiement.montant" placeholder="250.00" />
          </div>
          <div class="form-group">
            <label>Type *</label>
            <select [(ngModel)]="newPaiement.type">
              <option value="MENSUALITE">Mensualité</option>
              <option value="PAIEMENT_ANNUEL">Paiement annuel</option>
              <option value="PAIEMENT_EXCEPTIONNEL">Paiement exceptionnel</option>
            </select>
          </div>
        </div>
        <div class="form-actions">
          <button class="btn-save" (click)="savePaiement()">Enregistrer</button>
          <button class="btn-cancel" (click)="showForm = false">Annuler</button>
        </div>
      </div>

      <div class="table-card">
        <table>
          <thead>
            <tr><th>ID</th><th>Contrat</th><th>Date</th><th>Montant</th><th>Type</th></tr>
          </thead>
          <tbody>
            <tr *ngFor="let p of paiements">
              <td><span class="id-badge">{{ p.id }}</span></td>
              <td>Contrat #{{ p.contratId }}</td>
              <td>{{ p.date | date:'dd/MM/yyyy' }}</td>
              <td><strong>{{ p.montant | number:'1.2-2' }} MAD</strong></td>
              <td><span class="type-badge" [class]="p.type.toLowerCase()">{{ typeLabel(p.type) }}</span></td>
            </tr>
            <tr *ngIf="paiements.length === 0">
              <td colspan="5" class="empty-row">Aucun paiement trouvé</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .page-container { padding:24px; max-width:1100px; margin:0 auto; }
    .page-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; }
    h1 { font-size:24px; font-weight:700; margin:0; color:var(--text-main); letter-spacing: -0.5px; }
    .btn-add { background:var(--accent-color); color:white; border:none; padding:10px 20px; border-radius:var(--radius-md); font-weight:600; cursor:pointer; display: flex; align-items: center; gap: 8px; transition: background 0.2s; }
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
    td { padding:16px; border-bottom:1px solid var(--border-color); font-size:14px; color: var(--text-main); }
    tbody tr:last-child td { border-bottom: none; }
    .id-badge { background:var(--bg-color); padding:4px 8px; border-radius:4px; font-size:12px; font-weight:600; color: var(--text-muted); border: 1px solid var(--border-color); }
    .type-badge { padding:4px 10px; border-radius:20px; font-size:12px; font-weight:600; }
    .type-badge.mensualite { background:#eff6ff; color:#1d4ed8; }
    .type-badge.paiement_annuel { background:#f0fdf4; color:#15803d; }
    .type-badge.paiement_exceptionnel { background:#fff7ed; color:#c2410c; }
    .empty-row { text-align:center; color:var(--text-muted); padding:48px !important; }
    tr:hover td { background:#fafafa; }
  `]
})
export class PaiementsListComponent implements OnInit {
  paiements: Paiement[] = [];
  contrats: Contrat[] = [];
  showForm = false;
  newPaiement: Paiement = { contratId: 0, date: '', montant: 0, type: 'MENSUALITE' };

  constructor(private http: HttpClient, private contratService: ContratService) {}

  ngOnInit(): void {
    this.loadPaiements();
    this.contratService.getAll().subscribe(d => this.contrats = d);
  }

  loadPaiements(): void {
    this.http.get<Paiement[]>(`${environment.apiUrl}/paiements`).subscribe(d => this.paiements = d);
  }

  savePaiement(): void {
    this.http.post<Paiement>(`${environment.apiUrl}/paiements`, this.newPaiement).subscribe(() => {
      this.loadPaiements();
      this.showForm = false;
      this.newPaiement = { contratId: 0, date: '', montant: 0, type: 'MENSUALITE' };
    });
  }

  typeLabel(t: string): string {
    return { MENSUALITE: 'Mensualité', PAIEMENT_ANNUEL: 'Annuel', PAIEMENT_EXCEPTIONNEL: 'Exceptionnel' }[t] || t;
  }
}
