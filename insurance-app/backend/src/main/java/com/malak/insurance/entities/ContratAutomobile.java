package com.malak.insurance.entities;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;

@Entity
@DiscriminatorValue("AUTOMOBILE")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class ContratAutomobile extends Contrat {

    @Column(name = "numero_immatriculation")
    private String numeroImmatriculation;

    @Column(name = "marque_vehicule")
    private String marqueVehicule;

    @Column(name = "modele_vehicule")
    private String modeleVehicule;
}
