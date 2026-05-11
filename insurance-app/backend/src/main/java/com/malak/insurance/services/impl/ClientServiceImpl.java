package com.malak.insurance.services.impl;

import com.malak.insurance.dtos.ClientDTO;
import com.malak.insurance.dtos.ContratSummaryDTO;
import com.malak.insurance.entities.Client;
import com.malak.insurance.entities.Contrat;
import com.malak.insurance.repositories.ClientRepository;
import com.malak.insurance.services.IClientService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ClientServiceImpl implements IClientService {

    @Autowired
    private ClientRepository clientRepository;

    @Override
    public ClientDTO createClient(ClientDTO dto) {
        if (clientRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Un client avec cet email existe déjà: " + dto.getEmail());
        }
        Client client = Client.builder()
                .nom(dto.getNom())
                .email(dto.getEmail())
                .telephone(dto.getTelephone())
                .build();
        return toDTO(clientRepository.save(client));
    }

    @Override
    public ClientDTO updateClient(Long id, ClientDTO dto) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Client non trouvé: " + id));
        client.setNom(dto.getNom());
        client.setEmail(dto.getEmail());
        client.setTelephone(dto.getTelephone());
        return toDTO(clientRepository.save(client));
    }

    @Override
    @Transactional(readOnly = true)
    public ClientDTO getClientById(Long id) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Client non trouvé: " + id));
        return toDTO(client);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ClientDTO> getAllClients() {
        return clientRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ClientDTO> searchClientsByNom(String nom) {
        return clientRepository.findByNomContainingIgnoreCase(nom).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteClient(Long id) {
        if (!clientRepository.existsById(id)) {
            throw new EntityNotFoundException("Client non trouvé: " + id);
        }
        clientRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public ClientDTO getClientWithContrats(Long id) {
        Client client = clientRepository.findByIdWithContrats(id)
                .orElseThrow(() -> new EntityNotFoundException("Client non trouvé: " + id));
        ClientDTO dto = toDTO(client);
        dto.setContrats(client.getContrats().stream()
                .map(this::toContratSummary)
                .collect(Collectors.toList()));
        return dto;
    }

    private ClientDTO toDTO(Client client) {
        return ClientDTO.builder()
                .id(client.getId())
                .nom(client.getNom())
                .email(client.getEmail())
                .telephone(client.getTelephone())
                .build();
    }

    private ContratSummaryDTO toContratSummary(Contrat contrat) {
        return ContratSummaryDTO.builder()
                .id(contrat.getId())
                .typeContrat(contrat.getClass().getSimpleName().replace("Contrat", "").toUpperCase())
                .dateSouscription(contrat.getDateSouscription())
                .statut(contrat.getStatut())
                .montantCotisation(contrat.getMontantCotisation())
                .build();
    }
}
