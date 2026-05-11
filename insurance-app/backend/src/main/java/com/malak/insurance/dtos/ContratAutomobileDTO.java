package com.malak.insurance.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
public class ContratAutomobileDTO extends ContratDTO {

    @NotBlank(message = "Le numéro d'immatriculation est obligatoire")
    private String numeroImmatriculation;

    @NotBlank(message = "La marque est obligatoire")
    private String marqueVehicule;

    @NotBlank(message = "Le modèle est obligatoire")
    private String modeleVehicule;
}
