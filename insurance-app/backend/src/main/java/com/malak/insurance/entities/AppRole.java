package com.malak.insurance.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "app_roles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AppRole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String roleName;
}
