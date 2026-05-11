package com.malak.insurance.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ClientDTO {
    private Long id;

    @NotBlank(message = "Le nom est obligatoire")
    private String nom;

    @Email(message = "Format email invalide")
    @NotBlank(message = "L'email est obligatoire")
    private String email;

    private String telephone;
    private List<ContratSummaryDTO> contrats;
}
