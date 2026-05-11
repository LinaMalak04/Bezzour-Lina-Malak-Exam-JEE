package com.malak.insurance.dtos;

import com.malak.insurance.entities.enums.StatutContrat;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
public class ContratDTO {
    private Long id;
    private String typeContrat; // AUTOMOBILE, HABITATION, SANTE

    @NotNull(message = "La date de souscription est obligatoire")
    private LocalDate dateSouscription;

    private StatutContrat statut;
    private LocalDate dateValidation;

    @NotNull(message = "Le montant de la cotisation est obligatoire")
    @DecimalMin(value = "0.01", message = "Le montant doit être positif")
    private BigDecimal montantCotisation;

    @NotNull(message = "La durée est obligatoire")
    @Min(value = 1, message = "La durée doit être au moins 1 mois")
    private Integer dureeContrat;

    @NotNull(message = "Le taux de couverture est obligatoire")
    private BigDecimal tauxCouverture;

    @NotNull(message = "Le client est obligatoire")
    private Long clientId;
    private String clientNom;

    private List<PaiementDTO> paiements;
}
