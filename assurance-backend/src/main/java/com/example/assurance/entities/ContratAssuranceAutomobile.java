package com.example.assurance.entities;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;

@Entity
@DiscriminatorValue("AUTOMOBILE")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ContratAssuranceAutomobile extends ContratAssurance {
    private String numeroImmatriculation;
    private String marqueVehicule;
    private String modeleVehicule;
}