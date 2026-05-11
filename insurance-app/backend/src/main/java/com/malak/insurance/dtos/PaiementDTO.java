package com.malak.insurance.dtos;

import com.malak.insurance.entities.enums.TypePaiement;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaiementDTO {
    private Long id;

    @NotNull(message = "La date est obligatoire")
    private LocalDate date;

    @NotNull
    @DecimalMin(value = "0.01", message = "Le montant doit être positif")
    private BigDecimal montant;

    @NotNull(message = "Le type de paiement est obligatoire")
    private TypePaiement type;

    @NotNull(message = "Le contrat est obligatoire")
    private Long contratId;
}
