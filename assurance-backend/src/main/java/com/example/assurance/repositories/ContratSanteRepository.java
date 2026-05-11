package com.example.assurance.repositories;

import com.example.assurance.entities.ContratAssuranceSante;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContratSanteRepository extends JpaRepository<ContratAssuranceSante, Long> {
}