package com.semillero.ecosistema.controllers;

import com.semillero.ecosistema.DTO.CountryDTO;
import com.semillero.ecosistema.services.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/country")
public class CountryController {

@Autowired
    private CountryService countryService;

    @GetMapping("/all")
    public ResponseEntity<?> getAll() {
        return countryService.getAll();
    }

    @PostMapping("/create")
    public ResponseEntity<?> createCountry(@RequestBody CountryDTO country) {
        return countryService.createCountry(country);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateCountry(@RequestParam Long id, @RequestBody CountryDTO country) {
        return countryService.updateCountry(id, country);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteCountry(@RequestParam Long id) {
        return countryService.deleteCountry(id);
    }

    @GetMapping("/get")
    public ResponseEntity<?> getCountryById(@RequestParam Long id) {
        return countryService.getCountryById(id);
    }

}

