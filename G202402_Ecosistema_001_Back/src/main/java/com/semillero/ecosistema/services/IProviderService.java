package com.semillero.ecosistema.services;

import com.semillero.ecosistema.DTO.DashboardInfo;
import com.semillero.ecosistema.DTO.ProviderCreateDTO;
import com.semillero.ecosistema.DTO.StateDto;
import com.semillero.ecosistema.entities.Provider;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IProviderService {

    ResponseEntity<?> updateState(Long id, StateDto stateDto);

    ResponseEntity<?> createProvider(ProviderCreateDTO providerDTO, String userName);

    ResponseEntity<?> updateProvider(ProviderCreateDTO providerDTO, String userName);

    ResponseEntity<?> getProvider(Long id);

    ResponseEntity<?> getAllProviders();

    ResponseEntity<?> getAccepted();

    ResponseEntity<?> getAcceptedProvidersByCategory(Long categoryId);

    ResponseEntity<?> searchProvidersByName(String name);

    List<Provider> findAll();

    DashboardInfo getDashboardInfo();

    ResponseEntity<?> getByLocation(String username);

}
