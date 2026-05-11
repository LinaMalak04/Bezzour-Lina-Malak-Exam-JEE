package com.zakariae.insurance.repositories;

import com.zakariae.insurance.entities.Paiement;
import com.zakariae.insurance.entities.enums.TypePaiement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface PaiementRepository extends JpaRepository<Paiement, Long> {
    List<Paiement> findByContratId(Long contratId);
    List<Paiement> findByType(TypePaiement type);

    @Query("SELECT SUM(p.montant) FROM Paiement p WHERE p.contrat.id = :contratId")
    BigDecimal sumMontantByContratId(@Param("contratId") Long contratId);

    @Query("SELECT p FROM Paiement p WHERE p.date BETWEEN :debut AND :fin")
    List<Paiement> findByDateBetween(@Param("debut") LocalDate debut,
                                      @Param("fin") LocalDate fin);
}
