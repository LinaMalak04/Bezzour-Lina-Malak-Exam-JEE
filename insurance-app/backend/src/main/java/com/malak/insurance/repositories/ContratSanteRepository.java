package com.zakariae.insurance.repositories;

import com.zakariae.insurance.entities.ContratSante;
import com.zakariae.insurance.entities.enums.NiveauCouverture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContratSanteRepository extends JpaRepository<ContratSante, Long> {
    List<ContratSante> findByNiveauCouverture(NiveauCouverture niveauCouverture);
}
