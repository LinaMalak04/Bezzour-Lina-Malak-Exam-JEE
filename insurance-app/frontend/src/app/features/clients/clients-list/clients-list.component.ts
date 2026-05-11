import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../../core/services/client.service';
import { Client } from '../../../core/models';

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="page-container">
      <div class="page-header">
        <h1><span class="material-symbols-rounded" style="vertical-align: bottom; font-size: 28px; color: var(--accent-color); margin-right: 8px;">group</span>Gestion des Clients</h1>
        <button class="btn-add" (click)="showForm = !showForm"><span class="material-symbols-rounded" style="font-size: 20px;">add</span>Nouveau Client</button>
      </div>

      <div class="search-bar">
        <span class="material-symbols-rounded search-icon">search</span>
        <input [(ngModel)]="searchTerm" (input)="onSearch()" placeholder="Rechercher par nom ou email..." />
      </div>

      <!-- Add Form -->
      <div class="form-card" *ngIf="showForm">
        <h3>{{ editingClient ? 'Modifier le client' : 'Nouveau client' }}</h3>
        <div class="form-grid">
          <div class="form-group">
            <label>Nom complet *</label>
            <input [(ngModel)]="formData.nom" placeholder="Nom du client" />
          </div>
          <div class="form-group">
            <label>Email *</label>
            <input [(ngModel)]="formData.email" type="email" placeholder="email@exemple.com" />
          </div>
          <div class="form-group">
            <label>Téléphone</label>
            <input [(ngModel)]="formData.telephone" placeholder="06XXXXXXXX" />
          </div>
        </div>
        <div class="form-actions">
          <button class="btn-save" (click)="saveClient()">Enregistrer</button>
          <button class="btn-cancel" (click)="cancelForm()">Annuler</button>
        </div>
      </div>

      <!-- Table -->
      <div class="table-card">
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Nom</th><th>Email</th><th>Téléphone</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let client of filteredClients">
              <td><span class="id-badge">{{ client.id }}</span></td>
              <td><strong>{{ client.nom }}</strong></td>
              <td>{{ client.email }}</td>
              <td>{{ client.telephone || '—' }}</td>
              <td class="actions">
                <a [routerLink]="['/clients', client.id]" class="btn-icon btn-view" title="Voir"><span class="material-symbols-rounded">visibility</span></a>
                <button class="btn-icon btn-edit" (click)="editClient(client)" title="Modifier"><span class="material-symbols-rounded">edit</span></button>
                <button class="btn-icon btn-delete" (click)="deleteClient(client.id!)" title="Supprimer"><span class="material-symbols-rounded">delete</span></button>
              </td>
            </tr>
            <tr *ngIf="filteredClients.length === 0">
              <td colspan="5" class="empty-row">Aucun client trouvé</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .page-container { padding:24px; max-width:1200px; margin:0 auto; }
    .page-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; }
    h1 { font-size:24px; font-weight:700; color:var(--text-main); margin:0; letter-spacing: -0.5px; }
    .btn-add { background:var(--accent-color); color:white; border:none; padding:10px 20px; border-radius:var(--radius-md); font-weight:600; cursor:pointer; display: flex; align-items: center; gap: 8px; transition: background 0.2s; }
    .btn-add:hover { background: var(--accent-hover); }
    .search-bar { margin-bottom:24px; position: relative; max-width: 400px; }
    .search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: var(--text-muted); font-size: 20px; pointer-events: none; }
    .search-bar input { width:100%; padding:12px 16px 12px 40px; border:1px solid var(--border-color); border-radius:var(--radius-md); font-size:15px; outline:none; box-sizing:border-box; transition: all 0.2s; color: var(--text-main); }
    .search-bar input:focus { border-color:var(--accent-color); box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
    .form-card { background:white; border-radius:var(--radius-lg); padding:24px; margin-bottom:24px; box-shadow:var(--shadow-sm); border:1px solid var(--border-color); border-top:3px solid var(--accent-color); }
    .form-card h3 { margin:0 0 20px; color:var(--text-main); font-size: 18px; font-weight: 600; }
    .form-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:16px; margin-bottom:24px; }
    .form-group label { display:block; font-size:13px; font-weight:600; margin-bottom:8px; color:var(--text-main); }
    .form-group input, .form-group select { width:100%; padding:12px 16px; border:1px solid var(--border-color); border-radius:var(--radius-md); font-size:14px; outline:none; box-sizing:border-box; transition: all 0.2s; }
    .form-group input:focus, .form-group select:focus { border-color:var(--accent-color); box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); }
    .form-actions { display:flex; gap:12px; }
    .btn-save { background:var(--success-color); color:white; border:none; padding:10px 24px; border-radius:var(--radius-md); cursor:pointer; font-weight:600; transition: opacity 0.2s; }
    .btn-save:hover { opacity: 0.9; }
    .btn-cancel { background:white; color:var(--text-muted); border:1px solid var(--border-color); padding:10px 24px; border-radius:var(--radius-md); cursor:pointer; font-weight: 500; transition: all 0.2s; }
    .btn-cancel:hover { background: var(--bg-color); color: var(--text-main); }
    .table-card { background:white; border-radius:var(--radius-lg); padding:0; box-shadow:var(--shadow-sm); overflow:hidden; border: 1px solid var(--border-color); }
    table { width:100%; border-collapse:collapse; }
    thead { background:var(--bg-color); border-bottom: 1px solid var(--border-color); }
    th { padding:16px; text-align:left; font-size:12px; font-weight:600; color:var(--text-muted); text-transform:uppercase; letter-spacing: 0.5px; }
    td { padding:16px; border-bottom:1px solid var(--border-color); font-size:14px; color: var(--text-main); }
    tbody tr:last-child td { border-bottom: none; }
    .id-badge { background:var(--bg-color); padding:4px 8px; border-radius:4px; font-size:12px; font-weight:600; color: var(--text-muted); border: 1px solid var(--border-color); }
    .actions { display:flex; gap:8px; align-items: center; }
    .btn-icon { background: none; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; width: 32px; height: 32px; border-radius: var(--radius-md); transition: all 0.2s; color: var(--text-muted); text-decoration: none; }
    .btn-icon .material-symbols-rounded { font-size: 20px; }
    .btn-view:hover { background: #eff6ff; color: var(--accent-hover); }
    .btn-edit:hover { background: #fffbeb; color: var(--warning-color); }
    .btn-delete:hover { background: #fef2f2; color: var(--danger-color); }
    .empty-row { text-align:center; color:var(--text-muted); padding:48px !important; }
    tr:hover td { background:#fafafa; }
  `]
})
export class ClientsListComponent implements OnInit {
  clients: Client[] = [];
  filteredClients: Client[] = [];
  searchTerm = '';
  showForm = false;
  editingClient: Client | null = null;
  formData: Client = { nom: '', email: '', telephone: '' };

  constructor(private clientService: ClientService) {}

  ngOnInit(): void { this.loadClients(); }

  loadClients(): void {
    this.clientService.getAll().subscribe(data => {
      this.clients = data;
      this.filteredClients = data;
    });
  }

  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredClients = this.clients.filter(c =>
      c.nom.toLowerCase().includes(term) || c.email.toLowerCase().includes(term)
    );
  }

  editClient(client: Client): void {
    this.editingClient = client;
    this.formData = { ...client };
    this.showForm = true;
  }

  saveClient(): void {
    if (!this.formData.nom || !this.formData.email) return;
    const op = this.editingClient
      ? this.clientService.update(this.editingClient.id!, this.formData)
      : this.clientService.create(this.formData);
    op.subscribe(() => { this.loadClients(); this.cancelForm(); });
  }

  deleteClient(id: number): void {
    if (confirm('Supprimer ce client ?')) {
      this.clientService.delete(id).subscribe(() => this.loadClients());
    }
  }

  cancelForm(): void {
    this.showForm = false;
    this.editingClient = null;
    this.formData = { nom: '', email: '', telephone: '' };
  }
}
