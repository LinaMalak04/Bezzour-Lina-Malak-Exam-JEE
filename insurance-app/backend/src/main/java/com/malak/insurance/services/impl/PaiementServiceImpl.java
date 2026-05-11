package com.malak.insurance.services.impl;

import com.malak.insurance.dtos.PaiementDTO;
import com.malak.insurance.entities.Contrat;
import com.malak.insurance.entities.Paiement;
import com.malak.insurance.repositories.ContratRepository;
import com.malak.insurance.repositories.PaiementRepository;
import com.malak.insurance.services.IPaiementService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PaiementServiceImpl implements IPaiementService {

    @Autowired
    private PaiementRepository paiementRepository;

    @Autowired
    private ContratRepository contratRepository;

    @Override
    public PaiementDTO createPaiement(PaiementDTO dto) {
        Contrat contrat = contratRepository.findById(dto.getContratId())
                .orElseThrow(() -> new EntityNotFoundException("Contrat non trouvé: " + dto.getContratId()));
        Paiement paiement = Paiement.builder()
                .date(dto.getDate())
                .montant(dto.getMontant())
                .type(dto.getType())
                .contrat(contrat)
                .build();
        return toDTO(paiementRepository.save(paiement));
    }

    @Override
    @Transactional(readOnly = true)
    public PaiementDTO getPaiementById(Long id) {
        return toDTO(paiementRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Paiement non trouvé: " + id)));
    }

    @Override
    @Transactional(readOnly = true)
    public List<PaiementDTO> getPaiementsByContratId(Long contratId) {
        return paiementRepository.findByContratId(contratId).stream()
                .map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<PaiementDTO> getAllPaiements() {
        return paiementRepository.findAll().stream()
                .map(this::toDTO).collect(Collectors.toList());
    }

    @Override
    public void deletePaiement(Long id) {
        if (!paiementRepository.existsById(id))
            throw new EntityNotFoundException("Paiement non trouvé: " + id);
        paiementRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public BigDecimal getTotalPaiementsByContrat(Long contratId) {
        BigDecimal total = paiementRepository.sumMontantByContratId(contratId);
        return total != null ? total : BigDecimal.ZERO;
    }

    private PaiementDTO toDTO(Paiement p) {
        return PaiementDTO.builder()
                .id(p.getId())
                .date(p.getDate())
                .montant(p.getMontant())
                .type(p.getType())
                .contratId(p.getContrat().getId())
                .build();
    }
}
