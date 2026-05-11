package com.zakariae.insurance.repositories;

import com.zakariae.insurance.entities.ContratAutomobile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContratAutomobileRepository extends JpaRepository<ContratAutomobile, Long> {
    Optional<ContratAutomobile> findByNumeroImmatriculation(String numeroImmatriculation);
    List<ContratAutomobile> findByMarqueVehiculeIgnoreCase(String marque);
}
