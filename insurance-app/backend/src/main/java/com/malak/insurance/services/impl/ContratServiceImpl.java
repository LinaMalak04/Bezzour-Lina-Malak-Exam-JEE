package com.malak.insurance.services.impl;

import com.malak.insurance.dtos.*;
import com.malak.insurance.entities.*;
import com.malak.insurance.entities.enums.StatutContrat;
import com.malak.insurance.repositories.*;
import com.malak.insurance.services.IContratService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class ContratServiceImpl implements IContratService {

    @Autowired private ContratRepository contratRepository;
    @Autowired private ContratAutomobileRepository autoRepository;
    @Autowired private ContratHabitationRepository habitationRepository;
    @Autowired private ContratSanteRepository santeRepository;
    @Autowired private ClientRepository clientRepository;

    // ===== Generic =====

    @Override
    @Transactional(readOnly = true)
    public ContratDTO getContratById(Long id) {
        Contrat contrat = contratRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Contrat non trouvé: " + id));
        return toDTO(contrat);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ContratDTO> getAllContrats() {
        return contratRepository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ContratDTO> getContratsByClientId(Long clientId) {
        return contratRepository.findByClientId(clientId).stream()
                .map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ContratDTO> getContratsByStatut(StatutContrat statut) {
        return contratRepository.findByStatut(statut).stream()
                .map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public void deleteContrat(Long id) {
        if (!contratRepository.existsById(id))
            throw new EntityNotFoundException("Contrat non trouvé: " + id);
        contratRepository.deleteById(id);
    }

    @Override
    public ContratDTO validerContrat(Long id) {
        Contrat contrat = contratRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Contrat non trouvé: " + id));
        contrat.setStatut(StatutContrat.VALIDE);
        contrat.setDateValidation(LocalDate.now());
        return toDTO(contratRepository.save(contrat));
    }

    @Override
    public ContratDTO resilierContrat(Long id) {
        Contrat contrat = contratRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Contrat non trouvé: " + id));
        contrat.setStatut(StatutContrat.RESILIE);
        return toDTO(contratRepository.save(contrat));
    }

    // ===== Automobile =====

    @Override
    public ContratAutomobileDTO createContratAutomobile(ContratAutomobileDTO dto) {
        Client client = clientRepository.findById(dto.getClientId())
                .orElseThrow(() -> new EntityNotFoundException("Client non trouvé: " + dto.getClientId()));
        ContratAutomobile c = new ContratAutomobile();
        mapBaseFields(c, dto, client);
        c.setNumeroImmatriculation(dto.getNumeroImmatriculation());
        c.setMarqueVehicule(dto.getMarqueVehicule());
        c.setModeleVehicule(dto.getModeleVehicule());
        return toAutoDTO(autoRepository.save(c));
    }

    @Override
    public ContratAutomobileDTO updateContratAutomobile(Long id, ContratAutomobileDTO dto) {
        ContratAutomobile c = autoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Contrat automobile non trouvé: " + id));
        Client client = clientRepository.findById(dto.getClientId())
                .orElseThrow(() -> new EntityNotFoundException("Client non trouvé"));
        mapBaseFields(c, dto, client);
        c.setNumeroImmatriculation(dto.getNumeroImmatriculation());
        c.setMarqueVehicule(dto.getMarqueVehicule());
        c.setModeleVehicule(dto.getModeleVehicule());
        return toAutoDTO(autoRepository.save(c));
    }

    @Override
    @Transactional(readOnly = true)
    public List<ContratAutomobileDTO> getAllContratsAutomobile() {
        return autoRepository.findAll().stream().map(this::toAutoDTO).collect(Collectors.toList());
    }

    // ===== Habitation =====

    @Override
    public ContratHabitationDTO createContratHabitation(ContratHabitationDTO dto) {
        Client client = clientRepository.findById(dto.getClientId())
                .orElseThrow(() -> new EntityNotFoundException("Client non trouvé: " + dto.getClientId()));
        ContratHabitation c = new ContratHabitation();
        mapBaseFields(c, dto, client);
        c.setTypeLogement(dto.getTypeLogement());
        c.setAdresseLogement(dto.getAdresseLogement());
        c.setSuperficie(dto.getSuperficie());
        return toHabitationDTO(habitationRepository.save(c));
    }

    @Override
    public ContratHabitationDTO updateContratHabitation(Long id, ContratHabitationDTO dto) {
        ContratHabitation c = habitationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Contrat habitation non trouvé: " + id));
        Client client = clientRepository.findById(dto.getClientId())
                .orElseThrow(() -> new EntityNotFoundException("Client non trouvé"));
        mapBaseFields(c, dto, client);
        c.setTypeLogement(dto.getTypeLogement());
        c.setAdresseLogement(dto.getAdresseLogement());
        c.setSuperficie(dto.getSuperficie());
        return toHabitationDTO(habitationRepository.save(c));
    }

    @Override
    @Transactional(readOnly = true)
    public List<ContratHabitationDTO> getAllContratsHabitation() {
        return habitationRepository.findAll().stream().map(this::toHabitationDTO).collect(Collectors.toList());
    }

    // ===== Santé =====

    @Override
    public ContratSanteDTO createContratSante(ContratSanteDTO dto) {
        Client client = clientRepository.findById(dto.getClientId())
                .orElseThrow(() -> new EntityNotFoundException("Client non trouvé: " + dto.getClientId()));
        ContratSante c = new ContratSante();
        mapBaseFields(c, dto, client);
        c.setNiveauCouverture(dto.getNiveauCouverture());
        c.setNbPersonnesCouvertes(dto.getNbPersonnesCouvertes());
        return toSanteDTO(santeRepository.save(c));
    }

    @Override
    public ContratSanteDTO updateContratSante(Long id, ContratSanteDTO dto) {
        ContratSante c = santeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Contrat santé non trouvé: " + id));
        Client client = clientRepository.findById(dto.getClientId())
                .orElseThrow(() -> new EntityNotFoundException("Client non trouvé"));
        mapBaseFields(c, dto, client);
        c.setNiveauCouverture(dto.getNiveauCouverture());
        c.setNbPersonnesCouvertes(dto.getNbPersonnesCouvertes());
        return toSanteDTO(santeRepository.save(c));
    }

    @Override
    @Transactional(readOnly = true)
    public List<ContratSanteDTO> getAllContratsSante() {
        return santeRepository.findAll().stream().map(this::toSanteDTO).collect(Collectors.toList());
    }

    // ===== Statistiques =====

    @Override
    @Transactional(readOnly = true)
    public Map<String, Long> getStatistiquesParType() {
        Map<String, Long> stats = new LinkedHashMap<>();
        stats.put("AUTOMOBILE", (long) autoRepository.findAll().size());
        stats.put("HABITATION", (long) habitationRepository.findAll().size());
        stats.put("SANTE", (long) santeRepository.findAll().size());
        return stats;
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Long> getStatistiquesParStatut() {
        Map<String, Long> stats = new LinkedHashMap<>();
        for (StatutContrat statut : StatutContrat.values()) {
            stats.put(statut.name(), contratRepository.countByStatut(statut));
        }
        return stats;
    }

    // ===== Helpers =====

    private void mapBaseFields(Contrat c, ContratDTO dto, Client client) {
        c.setDateSouscription(dto.getDateSouscription());
        c.setStatut(dto.getStatut() != null ? dto.getStatut() : StatutContrat.EN_COURS);
        c.setDateValidation(dto.getDateValidation());
        c.setMontantCotisation(dto.getMontantCotisation());
        c.setDureeContrat(dto.getDureeContrat());
        c.setTauxCouverture(dto.getTauxCouverture());
        c.setClient(client);
    }

    private ContratDTO toDTO(Contrat c) {
        if (c instanceof ContratAutomobile) return toAutoDTO((ContratAutomobile) c);
        if (c instanceof ContratHabitation) return toHabitationDTO((ContratHabitation) c);
        if (c instanceof ContratSante) return toSanteDTO((ContratSante) c);
        return ContratDTO.builder()
                .id(c.getId()).dateSouscription(c.getDateSouscription())
                .statut(c.getStatut()).dateValidation(c.getDateValidation())
                .montantCotisation(c.getMontantCotisation()).dureeContrat(c.getDureeContrat())
                .tauxCouverture(c.getTauxCouverture()).clientId(c.getClient().getId())
                .clientNom(c.getClient().getNom()).build();
    }

    private ContratAutomobileDTO toAutoDTO(ContratAutomobile c) {
        ContratAutomobileDTO dto = new ContratAutomobileDTO();
        fillBase(dto, c);
        dto.setTypeContrat("AUTOMOBILE");
        dto.setNumeroImmatriculation(c.getNumeroImmatriculation());
        dto.setMarqueVehicule(c.getMarqueVehicule());
        dto.setModeleVehicule(c.getModeleVehicule());
        return dto;
    }

    private ContratHabitationDTO toHabitationDTO(ContratHabitation c) {
        ContratHabitationDTO dto = new ContratHabitationDTO();
        fillBase(dto, c);
        dto.setTypeContrat("HABITATION");
        dto.setTypeLogement(c.getTypeLogement());
        dto.setAdresseLogement(c.getAdresseLogement());
        dto.setSuperficie(c.getSuperficie());
        return dto;
    }

    private ContratSanteDTO toSanteDTO(ContratSante c) {
        ContratSanteDTO dto = new ContratSanteDTO();
        fillBase(dto, c);
        dto.setTypeContrat("SANTE");
        dto.setNiveauCouverture(c.getNiveauCouverture());
        dto.setNbPersonnesCouvertes(c.getNbPersonnesCouvertes());
        return dto;
    }

    private void fillBase(ContratDTO dto, Contrat c) {
        dto.setId(c.getId());
        dto.setDateSouscription(c.getDateSouscription());
        dto.setStatut(c.getStatut());
        dto.setDateValidation(c.getDateValidation());
        dto.setMontantCotisation(c.getMontantCotisation());
        dto.setDureeContrat(c.getDureeContrat());
        dto.setTauxCouverture(c.getTauxCouverture());
        dto.setClientId(c.getClient().getId());
        dto.setClientNom(c.getClient().getNom());
    }
}
