package com.malak.insurance.entities;

import com.malak.insurance.entities.enums.TypeLogement;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@DiscriminatorValue("HABITATION")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
@ToString(callSuper = true)
public class ContratHabitation extends Contrat {

    @Enumerated(EnumType.STRING)
    @Column(name = "type_logement")
    private TypeLogement typeLogement;

    @Column(name = "adresse_logement")
    private String adresseLogement;

    @Column(name = "superficie", precision = 8, scale = 2)
    private BigDecimal superficie; // en m²
}
