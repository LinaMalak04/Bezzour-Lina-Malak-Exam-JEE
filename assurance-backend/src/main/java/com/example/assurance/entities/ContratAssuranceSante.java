package com.example.assurance.entities;

import com.example.assurance.enums.NiveauCouvertureSante;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

@Entity
@DiscriminatorValue("SANTE")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ContratAssuranceSante extends ContratAssurance {
    @Enumerated(EnumType.STRING)
    private NiveauCouvertureSante niveauCouverture;

    private Integer nombrePersonnesCouvertes;
}