package com.malak.insurance.controllers;

import com.malak.insurance.dtos.ClientDTO;
import com.malak.insurance.services.IClientService;
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

@RestController
@RequestMapping("/api/clients")
@Tag(name = "Clients", description = "Gestion des clients")
@SecurityRequirement(name = "bearerAuth")
public class ClientController {

    @Autowired
    private IClientService clientService;

    @GetMapping
    @Operation(summary = "Liste tous les clients")
    @PreAuthorize("hasAnyRole('EMPLOYE', 'ADMIN')")
    public ResponseEntity<List<ClientDTO>> getAllClients() {
        return ResponseEntity.ok(clientService.getAllClients());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Récupérer un client par ID")
    @PreAuthorize("hasAnyRole('CLIENT', 'EMPLOYE', 'ADMIN')")
    public ResponseEntity<ClientDTO> getClientById(@PathVariable Long id) {
        return ResponseEntity.ok(clientService.getClientById(id));
    }

    @GetMapping("/{id}/contrats")
    @Operation(summary = "Récupérer un client avec ses contrats")
    @PreAuthorize("hasAnyRole('CLIENT', 'EMPLOYE', 'ADMIN')")
    public ResponseEntity<ClientDTO> getClientWithContrats(@PathVariable Long id) {
        return ResponseEntity.ok(clientService.getClientWithContrats(id));
    }

    @GetMapping("/search")
    @Operation(summary = "Rechercher des clients par nom")
    @PreAuthorize("hasAnyRole('EMPLOYE', 'ADMIN')")
    public ResponseEntity<List<ClientDTO>> searchClients(@RequestParam String nom) {
        return ResponseEntity.ok(clientService.searchClientsByNom(nom));
    }

    @PostMapping
    @Operation(summary = "Créer un nouveau client")
    @PreAuthorize("hasAnyRole('EMPLOYE', 'ADMIN')")
    public ResponseEntity<ClientDTO> createClient(@Valid @RequestBody ClientDTO clientDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(clientService.createClient(clientDTO));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Mettre à jour un client")
    @PreAuthorize("hasAnyRole('EMPLOYE', 'ADMIN')")
    public ResponseEntity<ClientDTO> updateClient(@PathVariable Long id,
                                                   @Valid @RequestBody ClientDTO clientDTO) {
        return ResponseEntity.ok(clientService.updateClient(id, clientDTO));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Supprimer un client")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteClient(@PathVariable Long id) {
        clientService.deleteClient(id);
        return ResponseEntity.noContent().build();
    }
}
