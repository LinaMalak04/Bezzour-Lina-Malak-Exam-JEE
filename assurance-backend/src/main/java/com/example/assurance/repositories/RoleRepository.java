package com.example.assurance.repositories;

import com.example.assurance.entities.Role;
import com.example.assurance.enums.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName name);
}