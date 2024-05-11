package com.semillero.ecosistema.services;

import com.semillero.ecosistema.DTO.CountryDTO;
import org.springframework.http.ResponseEntity;



public interface CountryService {

    ResponseEntity<?> createCountry(CountryDTO country);

    ResponseEntity<?> updateCountry(Long id, CountryDTO country);

    ResponseEntity<?> deleteCountry(Long id);

    ResponseEntity<?> getAll();

    ResponseEntity<?> getCountryById(Long id);
}
