package com.zakariae.insurance.repositories;

import com.zakariae.insurance.entities.ContratHabitation;
import com.zakariae.insurance.entities.enums.TypeLogement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContratHabitationRepository extends JpaRepository<ContratHabitation, Long> {
    List<ContratHabitation> findByTypeLogement(TypeLogement typeLogement);
}
