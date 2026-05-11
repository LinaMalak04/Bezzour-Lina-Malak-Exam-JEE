package com.malak.insurance.services;

import com.malak.insurance.dtos.*;
import com.malak.insurance.entities.enums.StatutContrat;

import java.util.List;
import java.util.Map;

public interface IContratService {

    // CRUD Contrats génériques
    ContratDTO getContratById(Long id);
    List<ContratDTO> getAllContrats();
    List<ContratDTO> getContratsByClientId(Long clientId);
    List<ContratDTO> getContratsByStatut(StatutContrat statut);
    void deleteContrat(Long id);
    ContratDTO validerContrat(Long id);
    ContratDTO resilierContrat(Long id);

    // Automobile
    ContratAutomobileDTO createContratAutomobile(ContratAutomobileDTO dto);
    ContratAutomobileDTO updateContratAutomobile(Long id, ContratAutomobileDTO dto);
    List<ContratAutomobileDTO> getAllContratsAutomobile();

    // Habitation
    ContratHabitationDTO createContratHabitation(ContratHabitationDTO dto);
    ContratHabitationDTO updateContratHabitation(Long id, ContratHabitationDTO dto);
    List<ContratHabitationDTO> getAllContratsHabitation();

    // Santé
    ContratSanteDTO createContratSante(ContratSanteDTO dto);
    ContratSanteDTO updateContratSante(Long id, ContratSanteDTO dto);
    List<ContratSanteDTO> getAllContratsSante();

    // Statistiques
    Map<String, Long> getStatistiquesParType();
    Map<String, Long> getStatistiquesParStatut();
}
