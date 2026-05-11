import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Contrat, ContratAutomobile, ContratHabitation, ContratSante, StatutContrat } from '../models';

@Injectable({ providedIn: 'root' })
export class ContratService {
  private apiUrl = `${environment.apiUrl}/contrats`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Contrat[]> {
    return this.http.get<Contrat[]>(this.apiUrl);
  }

  getAllContrats(): Observable<Contrat[]> {
    return this.getAll();
  }

  getById(id: number): Observable<Contrat> {
    return this.http.get<Contrat>(`${this.apiUrl}/${id}`);
  }

  getByClientId(clientId: number): Observable<Contrat[]> {
    return this.http.get<Contrat[]>(`${this.apiUrl}/client/${clientId}`);
  }

  getByStatut(statut: StatutContrat): Observable<Contrat[]> {
    return this.http.get<Contrat[]>(`${this.apiUrl}/statut/${statut}`);
  }

  getStatistiquesParType(): Observable<Record<string, number>> {
    return this.http.get<Record<string, number>>(`${this.apiUrl}/statistiques/type`);
  }

  getStatistiquesParStatut(): Observable<Record<string, number>> {
    return this.http.get<Record<string, number>>(`${this.apiUrl}/statistiques/statut`);
  }

  // Automobile
  getAllAutomobile(): Observable<ContratAutomobile[]> {
    return this.http.get<ContratAutomobile[]>(`${this.apiUrl}/automobile`);
  }
  createAutomobile(c: ContratAutomobile): Observable<ContratAutomobile> {
    return this.http.post<ContratAutomobile>(`${this.apiUrl}/automobile`, c);
  }
  updateAutomobile(id: number, c: ContratAutomobile): Observable<ContratAutomobile> {
    return this.http.put<ContratAutomobile>(`${this.apiUrl}/automobile/${id}`, c);
  }

  // Habitation
  getAllHabitation(): Observable<ContratHabitation[]> {
    return this.http.get<ContratHabitation[]>(`${this.apiUrl}/habitation`);
  }
  createHabitation(c: ContratHabitation): Observable<ContratHabitation> {
    return this.http.post<ContratHabitation>(`${this.apiUrl}/habitation`, c);
  }
  updateHabitation(id: number, c: ContratHabitation): Observable<ContratHabitation> {
    return this.http.put<ContratHabitation>(`${this.apiUrl}/habitation/${id}`, c);
  }

  // Santé
  getAllSante(): Observable<ContratSante[]> {
    return this.http.get<ContratSante[]>(`${this.apiUrl}/sante`);
  }
  createSante(c: ContratSante): Observable<ContratSante> {
    return this.http.post<ContratSante>(`${this.apiUrl}/sante`, c);
  }
  updateSante(id: number, c: ContratSante): Observable<ContratSante> {
    return this.http.put<ContratSante>(`${this.apiUrl}/sante/${id}`, c);
  }

  valider(id: number): Observable<Contrat> {
    return this.http.patch<Contrat>(`${this.apiUrl}/${id}/valider`, {});
  }

  validerContrat(id: number): Observable<Contrat> {
    return this.valider(id);
  }

  resilier(id: number): Observable<Contrat> {
    return this.http.patch<Contrat>(`${this.apiUrl}/${id}/resilier`, {});
  }

  resilierContrat(id: number): Observable<Contrat> {
    return this.resilier(id);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
