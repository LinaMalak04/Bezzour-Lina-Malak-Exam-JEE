package com.malak.insurance.controllers;

import com.malak.insurance.dtos.AuthResponseDTO;
import com.malak.insurance.dtos.LoginRequestDTO;
import com.malak.insurance.dtos.RegisterRequestDTO;
import com.malak.insurance.entities.AppRole;
import com.malak.insurance.entities.AppUser;
import com.malak.insurance.repositories.AppRoleRepository;
import com.malak.insurance.repositories.AppUserRepository;
import com.malak.insurance.security.jwt.JwtUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentification", description = "API d'authentification JWT")
public class AuthController {

    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private AppUserRepository userRepository;
    @Autowired private AppRoleRepository roleRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private JwtUtils jwtUtils;

    @PostMapping("/login")
    @Operation(summary = "Connexion utilisateur", description = "Authentifie un utilisateur et retourne un JWT token")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDTO loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        AppUser user = userRepository.findByUsername(userDetails.getUsername()).orElseThrow();

        return ResponseEntity.ok(AuthResponseDTO.builder()
                .token(jwt)
                .tokenType("Bearer")
                .username(userDetails.getUsername())
                .email(user.getEmail())
                .roles(roles)
                .build());
    }

    @PostMapping("/register")
    @Operation(summary = "Inscription utilisateur")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequestDTO registerRequest) {
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            return ResponseEntity.badRequest().body("Nom d'utilisateur déjà utilisé");
        }
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            return ResponseEntity.badRequest().body("Email déjà utilisé");
        }

        String roleName = registerRequest.getRole() != null ? registerRequest.getRole() : "ROLE_CLIENT";
        AppRole role = roleRepository.findByRoleName(roleName)
                .orElseThrow(() -> new RuntimeException("Rôle non trouvé: " + roleName));

        AppUser user = AppUser.builder()
                .username(registerRequest.getUsername())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .fullName(registerRequest.getFullName())
                .build();
        user.getRoles().add(role);

        userRepository.save(user);
        return ResponseEntity.ok("Utilisateur enregistré avec succès");
    }
}
