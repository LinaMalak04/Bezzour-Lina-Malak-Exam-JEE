package com.malak.insurance.controllers;

import com.zakariae.insurance.dtos.*;
import com.zakariae.insurance.entities.enums.StatutContrat;
import com.zakariae.insurance.services.IContratService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/contrats")
@Tag(name = "Contrats", description = "Gestion des contrats d'assurance")
@SecurityRequirement(name = "bearerAuth")
public class ContratController {

    @Autowired
    private IContratService contratService;

    @GetMapping
    @Operation(summary = "Liste tous les contrats")
    @PreAuthorize("hasAnyRole('EMPLOYE', 'ADMIN')")
    public ResponseEntity<List<ContratDTO>> getAllContrats() {
        return ResponseEntity.ok(contratService.getAllContrats());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Récupérer un contrat par ID")
    @PreAuthorize("hasAnyRole('CLIENT', 'EMPLOYE', 'ADMIN')")
    public ResponseEntity<ContratDTO> getContratById(@PathVariable Long id) {
        return ResponseEntity.ok(contratService.getContratById(id));
    }

    @GetMapping("/client/{clientId}")
    @Operation(summary = "Contrats par client")
    @PreAuthorize("hasAnyRole('CLIENT', 'EMPLOYE', 'ADMIN')")
    public ResponseEntity<List<ContratDTO>> getContratsByClient(@PathVariable Long clientId) {
        return ResponseEntity.ok(contratService.getContratsByClientId(clientId));
    }

    @GetMapping("/statut/{statut}")
    @Operation(summary = "Contrats par statut")
    @PreAuthorize("hasAnyRole('EMPLOYE', 'ADMIN')")
    public ResponseEntity<List<ContratDTO>> getContratsByStatut(@PathVariable StatutContrat statut) {
        return ResponseEntity.ok(contratService.getContratsByStatut(statut));
    }

    @GetMapping("/statistiques/type")
    @Operation(summary = "Statistiques par type de contrat")
    @PreAuthorize("hasAnyRole('EMPLOYE', 'ADMIN')")
    public ResponseEntity<Map<String, Long>> getStatistiquesParType() {
        return ResponseEntity.ok(contratService.getStatistiquesParType());
    }

    @GetMapping("/statistiques/statut")
    @Operation(summary = "Statistiques par statut")
    @PreAuthorize("hasAnyRole('EMPLOYE', 'ADMIN')")
    public ResponseEntity<Map<String, Long>> getStatistiquesParStatut() {
        return ResponseEntity.ok(contratService.getStatistiquesParStatut());
    }

    // AUTOMOBILE
    @GetMapping("/automobile")
    @Operation(summary = "Liste les contrats automobile")
    @PreAuthorize("hasAnyRole('EMPLOYE', 'ADMIN')")
    public ResponseEntity<List<ContratAutomobileDTO>> getAllAutomobile() {
        return ResponseEntity.ok(contratService.getAllContratsAutomobile());
    }

    @PostMapping("/automobile")
    @Operation(summary = "Créer un contrat automobile")
    @PreAuthorize("hasAnyRole('EMPLOYE', 'ADMIN')")
    public ResponseEntity<ContratAutomobileDTO> createAutomobile(
            @Valid @RequestBody ContratAutomobileDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(contratService.createContratAutomobile(dto));
    }

    @PutMapping("/automobile/{id}")
    @Operation(summary = "Mettre à jour un contrat automobile")
    @PreAuthorize("hasAnyRole('EMPLOYE', 'ADMIN')")
    public ResponseEntity<ContratAutomobileDTO> updateAutomobile(
            @PathVariable Long id, @Valid @RequestBody ContratAutomobileDTO dto) {
        return ResponseEntity.ok(contratService.updateContratAutomobile(id, dto));
    }

    // HABITATION
    @GetMapping("/habitation")
    @Operation(summary = "Liste les contrats habitation")
    @PreAuthorize("hasAnyRole('EMPLOYE', 'ADMIN')")
    public ResponseEntity<List<ContratHabitationDTO>> getAllHabitation() {
        return ResponseEntity.ok(contratService.getAllContratsHabitation());
    }

    @PostMapping("/habitation")
    @Operation(summary = "Créer un contrat habitation")
    @PreAuthorize("hasAnyRole('EMPLOYE', 'ADMIN')")
    public ResponseEntity<ContratHabitationDTO> createHabitation(
            @Valid @RequestBody ContratHabitationDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(contratService.createContratHabitation(dto));
    }

    @PutMapping("/habitation/{id}")
    @Operation(summary = "Mettre à jour un contrat habitation")
    @PreAuthorize("hasAnyRole('EMPLOYE', 'ADMIN')")
    public ResponseEntity<ContratHabitationDTO> updateHabitation(
            @PathVariable Long id, @Valid @RequestBody ContratHabitationDTO dto) {
        return ResponseEntity.ok(contratService.updateContratHabitation(id, dto));
    }

    // SANTE
    @GetMapping("/sante")
    @Operation(summary = "Liste les contrats santé")
    @PreAuthorize("hasAnyRole('EMPLOYE', 'ADMIN')")
    public ResponseEntity<List<ContratSanteDTO>> getAllSante() {
        return ResponseEntity.ok(contratService.getAllContratsSante());
    }

    @PostMapping("/sante")
    @Operation(summary = "Créer un contrat santé")
    @PreAuthorize("hasAnyRole('EMPLOYE', 'ADMIN')")
    public ResponseEntity<ContratSanteDTO> createSante(
            @Valid @RequestBody ContratSanteDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(contratService.createContratSante(dto));
    }

    @PutMapping("/sante/{id}")
    @Operation(summary = "Mettre à jour un contrat santé")
    @PreAuthorize("hasAnyRole('EMPLOYE', 'ADMIN')")
    public ResponseEntity<ContratSanteDTO> updateSante(
            @PathVariable Long id, @Valid @RequestBody ContratSanteDTO dto) {
        return ResponseEntity.ok(contratService.updateContratSante(id, dto));
    }

    // Actions sur contrat
    @PatchMapping("/{id}/valider")
    @Operation(summary = "Valider un contrat")
    @PreAuthorize("hasAnyRole('EMPLOYE', 'ADMIN')")
    public ResponseEntity<ContratDTO> valider(@PathVariable Long id) {
        return ResponseEntity.ok(contratService.validerContrat(id));
    }

    @PatchMapping("/{id}/resilier")
    @Operation(summary = "Résilier un contrat")
    @PreAuthorize("hasAnyRole('EMPLOYE', 'ADMIN')")
    public ResponseEntity<ContratDTO> resilier(@PathVariable Long id) {
        return ResponseEntity.ok(contratService.resilierContrat(id));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Supprimer un contrat")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteContrat(@PathVariable Long id) {
        contratService.deleteContrat(id);
        return ResponseEntity.noContent().build();
    }
}
