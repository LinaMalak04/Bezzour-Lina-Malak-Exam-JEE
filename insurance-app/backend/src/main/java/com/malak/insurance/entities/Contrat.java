package com.malak.insurance.entities;

import com.malak.insurance.entities.enums.StatutContrat;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "contrats")
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type_contrat", discriminatorType = DiscriminatorType.STRING)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Contrat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_souscription", nullable = false)
    private LocalDate dateSouscription;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private StatutContrat statut = StatutContrat.EN_COURS;

    @Column(name = "date_validation")
    private LocalDate dateValidation;

    @Column(name = "montant_cotisation", nullable = false, precision = 10, scale = 2)
    private BigDecimal montantCotisation;

    @Column(name = "duree_contrat", nullable = false)
    private Integer dureeContrat; // en mois

    @Column(name = "taux_couverture", nullable = false, precision = 5, scale = 2)
    private BigDecimal tauxCouverture; // en pourcentage

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id", nullable = false)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Client client;

    @OneToMany(mappedBy = "contrat", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @Builder.Default
    private List<Paiement> paiements = new ArrayList<>();
}
