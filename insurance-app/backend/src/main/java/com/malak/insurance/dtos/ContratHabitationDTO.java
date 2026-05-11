package com.malak.insurance.dtos;

import com.malak.insurance.entities.enums.TypeLogement;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
public class ContratHabitationDTO extends ContratDTO {

    @NotNull(message = "Le type de logement est obligatoire")
    private TypeLogement typeLogement;

    @NotBlank(message = "L'adresse est obligatoire")
    private String adresseLogement;

    private BigDecimal superficie;
}
