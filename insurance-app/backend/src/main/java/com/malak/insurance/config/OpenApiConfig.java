package com.malak.insurance.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import org.springframework.context.annotation.Configuration;

@Configuration
@OpenAPIDefinition(
    info = @Info(
        title = "API Gestion des Contrats d'Assurance",
        version = "1.0.0",
        description = "Application de gestion des contrats d'assurance - Spring Boot + JWT",
        contact = @Contact(name = "malak", email = "malak@insurance.ma")
    )
)
@SecurityScheme(
    name = "bearerAuth",
    description = "JWT Authentication - Format: Bearer {token}",
    scheme = "bearer",
    type = SecuritySchemeType.HTTP,
    bearerFormat = "JWT",
    in = SecuritySchemeIn.HEADER
)
public class OpenApiConfig {
}
