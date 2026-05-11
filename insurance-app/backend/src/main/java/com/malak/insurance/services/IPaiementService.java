package com.malak.insurance.services;

import com.malak.insurance.dtos.PaiementDTO;

import java.math.BigDecimal;
import java.util.List;

public interface IPaiementService {
    PaiementDTO createPaiement(PaiementDTO dto);
    PaiementDTO getPaiementById(Long id);
    List<PaiementDTO> getPaiementsByContratId(Long contratId);
    List<PaiementDTO> getAllPaiements();
    void deletePaiement(Long id);
    BigDecimal getTotalPaiementsByContrat(Long contratId);
}
