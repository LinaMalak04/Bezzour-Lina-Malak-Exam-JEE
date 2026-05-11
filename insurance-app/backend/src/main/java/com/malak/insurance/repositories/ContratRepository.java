package com.malak.insurance.repositories;

import com.malak.insurance.entities.Contrat;
import com.malak.insurance.entities.enums.StatutContrat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ContratRepository extends JpaRepository<Contrat, Long> {

    List<Contrat> findByClientId(Long clientId);
    List<Contrat> findByStatut(StatutContrat statut);

    @Query("SELECT c FROM Contrat c WHERE c.client.id = :clientId AND c.statut = :statut")
    List<Contrat> findByClientIdAndStatut(@Param("clientId") Long clientId,
                                           @Param("statut") StatutContrat statut);

    @Query("SELECT c FROM Contrat c WHERE c.dateSouscription BETWEEN :debut AND :fin")
    List<Contrat> findByDateSouscriptionBetween(@Param("debut") LocalDate debut,
                                                 @Param("fin") LocalDate fin);

    @Query("SELECT COUNT(c) FROM Contrat c WHERE c.statut = :statut")
    Long countByStatut(@Param("statut") StatutContrat statut);

    @Query("SELECT TYPE(c), COUNT(c) FROM Contrat c GROUP BY TYPE(c)")
    List<Object[]> countByType();
}
