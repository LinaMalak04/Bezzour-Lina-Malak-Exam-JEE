package com.malak.insurance.dtos;

import com.malak.insurance.entities.enums.NiveauCouverture;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
public class ContratSanteDTO extends ContratDTO {

    @NotNull(message = "Le niveau de couverture est obligatoire")
    private NiveauCouverture niveauCouverture;

    @NotNull
    @Min(value = 1, message = "Au moins 1 personne couverte")
    private Integer nbPersonnesCouvertes;
}
