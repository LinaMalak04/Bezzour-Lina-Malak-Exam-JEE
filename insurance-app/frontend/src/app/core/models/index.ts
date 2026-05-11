// models/client.model.ts
export interface Client {
  id?: number;
  nom: string;
  email: string;
  telephone?: string;
  contrats?: ContratSummary[];
}

export interface ContratSummary {
  id: number;
  typeContrat: string;
  dateSouscription: string;
  statut: StatutContrat;
  montantCotisation: number;
}

// models/contrat.model.ts
export type StatutContrat = 'EN_COURS' | 'VALIDE' | 'RESILIE';
export type TypeContrat = 'AUTOMOBILE' | 'HABITATION' | 'SANTE';
export type TypeLogement = 'APPARTEMENT' | 'MAISON' | 'LOCAL_COMMERCIAL';
export type NiveauCouverture = 'BASIQUE' | 'INTERMEDIAIRE' | 'PREMIUM';
export type TypePaiement = 'MENSUALITE' | 'PAIEMENT_ANNUEL' | 'PAIEMENT_EXCEPTIONNEL';

export interface Contrat {
  id?: number;
  typeContrat?: TypeContrat;
  dateSouscription: string;
  statut?: StatutContrat;
  dateValidation?: string;
  montantCotisation: number;
  dureeContrat: number;
  tauxCouverture: number;
  clientId: number;
  clientNom?: string;
  paiements?: Paiement[];
}

export interface ContratAutomobile extends Contrat {
  numeroImmatriculation: string;
  marqueVehicule: string;
  modeleVehicule: string;
}

export interface ContratHabitation extends Contrat {
  typeLogement: TypeLogement;
  adresseLogement: string;
  superficie?: number;
}

export interface ContratSante extends Contrat {
  niveauCouverture: NiveauCouverture;
  nbPersonnesCouvertes: number;
}

// models/paiement.model.ts
export interface Paiement {
  id?: number;
  date: string;
  montant: number;
  type: TypePaiement;
  contratId: number;
}

// models/auth.model.ts
export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  tokenType: string;
  username: string;
  email: string;
  roles: string[];
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  fullName?: string;
  role?: string;
}
