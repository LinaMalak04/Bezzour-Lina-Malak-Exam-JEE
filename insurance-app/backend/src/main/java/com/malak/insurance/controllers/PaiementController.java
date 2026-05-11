package com.malak.insurance.controllers;

import com.malak.insurance.dtos.PaiementDTO;
import com.malak.insurance.services.IPaiementService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/paiements")
@Tag(name = "Paiements", description = "Gestion des paiements")
@SecurityRequirement(name = "bearerAuth")
public class PaiementController {

    @Autowired
    private IPaiementService paiementService;

    @GetMapping
    @Operation(summary = "Liste tous les paiements")
    @PreAuthorize("hasAnyRole('EMPLOYE', 'ADMIN')")
    public ResponseEntity<List<PaiementDTO>> getAllPaiements() {
        return ResponseEntity.ok(paiementService.getAllPaiements());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Récupérer un paiement par ID")
    @PreAuthorize("hasAnyRole('CLIENT', 'EMPLOYE', 'ADMIN')")
    public ResponseEntity<PaiementDTO> getPaiementById(@PathVariable Long id) {
        return ResponseEntity.ok(paiementService.getPaiementById(id));
    }

    @GetMapping("/contrat/{contratId}")
    @Operation(summary = "Paiements par contrat")
    @PreAuthorize("hasAnyRole('CLIENT', 'EMPLOYE', 'ADMIN')")
    public ResponseEntity<List<PaiementDTO>> getPaiementsByContrat(@PathVariable Long contratId) {
        return ResponseEntity.ok(paiementService.getPaiementsByContratId(contratId));
    }

    @GetMapping("/contrat/{contratId}/total")
    @Operation(summary = "Total des paiements d'un contrat")
    @PreAuthorize("hasAnyRole('CLIENT', 'EMPLOYE', 'ADMIN')")
    public ResponseEntity<BigDecimal> getTotalByContrat(@PathVariable Long contratId) {
        return ResponseEntity.ok(paiementService.getTotalPaiementsByContrat(contratId));
    }

    @PostMapping
    @Operation(summary = "Créer un paiement")
    @PreAuthorize("hasAnyRole('EMPLOYE', 'ADMIN')")
    public ResponseEntity<PaiementDTO> createPaiement(@Valid @RequestBody PaiementDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(paiementService.createPaiement(dto));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Supprimer un paiement")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deletePaiement(@PathVariable Long id) {
        paiementService.deletePaiement(id);
        return ResponseEntity.noContent().build();
    }
}
