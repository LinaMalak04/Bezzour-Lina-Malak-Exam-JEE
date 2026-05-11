package com.malak.insurance.config;

import com.malak.insurance.entities.*;
import com.malak.insurance.entities.enums.*;
import com.malak.insurance.repositories.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DataInitializer.class);

    @Autowired private ClientRepository clientRepository;
    @Autowired private ContratAutomobileRepository autoRepo;
    @Autowired private ContratHabitationRepository habitationRepo;
    @Autowired private ContratSanteRepository santeRepo;
    @Autowired private PaiementRepository paiementRepo;
    @Autowired private AppUserRepository userRepo;
    @Autowired private AppRoleRepository roleRepo;
    @Autowired private PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) {
        log.info("=== Initialisation des données de test ===");

        // Rôles
        AppRole roleAdmin   = createRole("ROLE_ADMIN");
        AppRole roleEmploye = createRole("ROLE_EMPLOYE");
        AppRole roleClient  = createRole("ROLE_CLIENT");

        // Utilisateurs
        createUser("admin",   "admin@insurance.ma",   "Admin123!",  "Administrateur",  roleAdmin);
        createUser("employe", "employe@insurance.ma", "Employe123!", "Ahmed Benali",   roleEmploye);
        createUser("client1", "client1@gmail.com",    "Client123!", "Youssef Alami",   roleClient);

        // Clients
        Client c1 = clientRepository.save(Client.builder()
                .nom("Youssef Alami").email("youssef.alami@gmail.com").telephone("0661234567").build());
        Client c2 = clientRepository.save(Client.builder()
                .nom("Fatima Zahra Benali").email("fatima.benali@gmail.com").telephone("0677654321").build());
        Client c3 = clientRepository.save(Client.builder()
                .nom("Mohamed Chraibi").email("m.chraibi@hotmail.com").telephone("0655443322").build());
        Client c4 = clientRepository.save(Client.builder()
                .nom("Salma Idrissi").email("salma.idrissi@yahoo.fr").telephone("0688776655").build());

        // Contrats Automobile
        ContratAutomobile ca1 = new ContratAutomobile();
        ca1.setDateSouscription(LocalDate.of(2024, 1, 15));
        ca1.setStatut(StatutContrat.VALIDE);
        ca1.setDateValidation(LocalDate.of(2024, 1, 20));
        ca1.setMontantCotisation(new BigDecimal("450.00"));
        ca1.setDureeContrat(12);
        ca1.setTauxCouverture(new BigDecimal("80.00"));
        ca1.setClient(c1);
        ca1.setNumeroImmatriculation("123456-A-7");
        ca1.setMarqueVehicule("Toyota");
        ca1.setModeleVehicule("Yaris");
        autoRepo.save(ca1);

        ContratAutomobile ca2 = new ContratAutomobile();
        ca2.setDateSouscription(LocalDate.of(2024, 3, 10));
        ca2.setStatut(StatutContrat.EN_COURS);
        ca2.setMontantCotisation(new BigDecimal("650.00"));
        ca2.setDureeContrat(24);
        ca2.setTauxCouverture(new BigDecimal("90.00"));
        ca2.setClient(c2);
        ca2.setNumeroImmatriculation("789012-B-3");
        ca2.setMarqueVehicule("Dacia");
        ca2.setModeleVehicule("Sandero");
        autoRepo.save(ca2);

        ContratAutomobile ca3 = new ContratAutomobile();
        ca3.setDateSouscription(LocalDate.of(2023, 6, 1));
        ca3.setStatut(StatutContrat.RESILIE);
        ca3.setMontantCotisation(new BigDecimal("800.00"));
        ca3.setDureeContrat(12);
        ca3.setTauxCouverture(new BigDecimal("95.00"));
        ca3.setClient(c3);
        ca3.setNumeroImmatriculation("345678-C-1");
        ca3.setMarqueVehicule("Renault");
        ca3.setModeleVehicule("Clio");
        autoRepo.save(ca3);

        // Contrats Habitation
        ContratHabitation ch1 = new ContratHabitation();
        ch1.setDateSouscription(LocalDate.of(2024, 2, 1));
        ch1.setStatut(StatutContrat.VALIDE);
        ch1.setDateValidation(LocalDate.of(2024, 2, 5));
        ch1.setMontantCotisation(new BigDecimal("300.00"));
        ch1.setDureeContrat(12);
        ch1.setTauxCouverture(new BigDecimal("75.00"));
        ch1.setClient(c1);
        ch1.setTypeLogement(TypeLogement.APPARTEMENT);
        ch1.setAdresseLogement("12 Rue Hassan II, Casablanca");
        ch1.setSuperficie(new BigDecimal("85.50"));
        habitationRepo.save(ch1);

        ContratHabitation ch2 = new ContratHabitation();
        ch2.setDateSouscription(LocalDate.of(2024, 4, 15));
        ch2.setStatut(StatutContrat.EN_COURS);
        ch2.setMontantCotisation(new BigDecimal("500.00"));
        ch2.setDureeContrat(24);
        ch2.setTauxCouverture(new BigDecimal("85.00"));
        ch2.setClient(c3);
        ch2.setTypeLogement(TypeLogement.MAISON);
        ch2.setAdresseLogement("5 Avenue Mohamed V, Rabat");
        ch2.setSuperficie(new BigDecimal("200.00"));
        habitationRepo.save(ch2);

        ContratHabitation ch3 = new ContratHabitation();
        ch3.setDateSouscription(LocalDate.of(2024, 5, 1));
        ch3.setStatut(StatutContrat.EN_COURS);
        ch3.setMontantCotisation(new BigDecimal("700.00"));
        ch3.setDureeContrat(12);
        ch3.setTauxCouverture(new BigDecimal("70.00"));
        ch3.setClient(c4);
        ch3.setTypeLogement(TypeLogement.LOCAL_COMMERCIAL);
        ch3.setAdresseLogement("30 Boulevard Zerktouni, Casablanca");
        ch3.setSuperficie(new BigDecimal("120.00"));
        habitationRepo.save(ch3);

        // Contrats Santé
        ContratSante cs1 = new ContratSante();
        cs1.setDateSouscription(LocalDate.of(2024, 1, 1));
        cs1.setStatut(StatutContrat.VALIDE);
        cs1.setDateValidation(LocalDate.of(2024, 1, 3));
        cs1.setMontantCotisation(new BigDecimal("250.00"));
        cs1.setDureeContrat(12);
        cs1.setTauxCouverture(new BigDecimal("70.00"));
        cs1.setClient(c2);
        cs1.setNiveauCouverture(NiveauCouverture.PREMIUM);
        cs1.setNbPersonnesCouvertes(4);
        santeRepo.save(cs1);

        ContratSante cs2 = new ContratSante();
        cs2.setDateSouscription(LocalDate.of(2024, 3, 15));
        cs2.setStatut(StatutContrat.EN_COURS);
        cs2.setMontantCotisation(new BigDecimal("150.00"));
        cs2.setDureeContrat(12);
        cs2.setTauxCouverture(new BigDecimal("60.00"));
        cs2.setClient(c4);
        cs2.setNiveauCouverture(NiveauCouverture.INTERMEDIAIRE);
        cs2.setNbPersonnesCouvertes(2);
        santeRepo.save(cs2);

        ContratSante cs3 = new ContratSante();
        cs3.setDateSouscription(LocalDate.of(2024, 6, 1));
        cs3.setStatut(StatutContrat.EN_COURS);
        cs3.setMontantCotisation(new BigDecimal("80.00"));
        cs3.setDureeContrat(6);
        cs3.setTauxCouverture(new BigDecimal("50.00"));
        cs3.setClient(c1);
        cs3.setNiveauCouverture(NiveauCouverture.BASIQUE);
        cs3.setNbPersonnesCouvertes(1);
        santeRepo.save(cs3);

        // Paiements
        savePaiement(ca1, LocalDate.of(2024, 1, 20), new BigDecimal("450.00"), TypePaiement.PAIEMENT_ANNUEL);
        savePaiement(ch1, LocalDate.of(2024, 2, 5),  new BigDecimal("300.00"), TypePaiement.PAIEMENT_ANNUEL);
        savePaiement(cs1, LocalDate.of(2024, 1, 3),  new BigDecimal("25.00"),  TypePaiement.MENSUALITE);
        savePaiement(cs1, LocalDate.of(2024, 2, 3),  new BigDecimal("25.00"),  TypePaiement.MENSUALITE);
        savePaiement(cs1, LocalDate.of(2024, 3, 3),  new BigDecimal("25.00"),  TypePaiement.MENSUALITE);
        savePaiement(ca2, LocalDate.of(2024, 3, 10), new BigDecimal("54.17"),  TypePaiement.MENSUALITE);
        savePaiement(ca2, LocalDate.of(2024, 4, 10), new BigDecimal("54.17"),  TypePaiement.MENSUALITE);
        savePaiement(ch2, LocalDate.of(2024, 4, 15), new BigDecimal("500.00"), TypePaiement.PAIEMENT_EXCEPTIONNEL);

        log.info("=== Données initialisées avec succès! ===");
        log.info("Utilisateurs: admin/Admin123! | employe/Employe123! | client1/Client123!");
        log.info("Swagger UI: http://localhost:8080/swagger-ui.html");
        log.info("H2 Console: http://localhost:8080/h2-console");
    }

    private AppRole createRole(String name) {
        return roleRepo.findByRoleName(name).orElseGet(() ->
                roleRepo.save(AppRole.builder().roleName(name).build()));
    }

    private void createUser(String username, String email, String password, String fullName, AppRole role) {
        if (!userRepo.existsByUsername(username)) {
            AppUser user = AppUser.builder()
                    .username(username).email(email)
                    .password(passwordEncoder.encode(password))
                    .fullName(fullName).build();
            user.getRoles().add(role);
            userRepo.save(user);
        }
    }

    private void savePaiement(Contrat contrat, LocalDate date, BigDecimal montant, TypePaiement type) {
        paiementRepo.save(Paiement.builder()
                .date(date).montant(montant).type(type).contrat(contrat).build());
    }
}
