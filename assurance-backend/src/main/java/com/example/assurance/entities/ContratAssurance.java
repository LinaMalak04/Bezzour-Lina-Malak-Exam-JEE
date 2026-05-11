package com.example.assurance.entities;

import com.example.assurance.enums.StatutContrat;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "TYPE")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public abstract class ContratAssurance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate dateSouscription;

    @Enumerated(EnumType.STRING)
    private StatutContrat statut;

    private LocalDate dateValidation;

    @Column(precision = 12, scale = 2)
    private BigDecimal montantCotisation;

    private Integer dureeContrat;

    private Double tauxCouverture;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    private Client client;

    @OneToMany(mappedBy = "contrat", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Paiement> paiements = new ArrayList<>();
}