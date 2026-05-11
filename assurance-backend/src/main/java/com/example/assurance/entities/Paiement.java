package com.example.assurance.entities;

import com.example.assurance.enums.TypePaiement;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Paiement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    @Column(precision = 12, scale = 2)
    private BigDecimal montant;

    @Enumerated(EnumType.STRING)
    private TypePaiement type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "contrat_id")
    private ContratAssurance contrat;
}