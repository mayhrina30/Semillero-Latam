package com.semillero.ecosistema.services.implement;

import com.semillero.ecosistema.DTO.CountryDTO;
import com.semillero.ecosistema.DTO.ProvinceDTO;
import com.semillero.ecosistema.entities.Country;
import com.semillero.ecosistema.entities.Province;
import com.semillero.ecosistema.mapper.CountryMapper;
import com.semillero.ecosistema.mapper.ProvinceMapper;
import com.semillero.ecosistema.repositories.CountryRepository;
import com.semillero.ecosistema.services.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CountryServiceImpl implements CountryService {

    @Autowired
    private CountryRepository countryRepository;
    @Autowired
    private CountryMapper countryMapper;
    @Autowired
    private ProvinceMapper provinceMapper;

    @Override
    public ResponseEntity<?> createCountry(CountryDTO country) {
        Country country1 = countryMapper.toEntity(country);
        Country country2 = countryRepository.save(Country.builder()
                .name(country1.getName())
                .build());
        CountryDTO countryDTO = countryMapper.toDTO(country2);
        return ResponseEntity.ok().body(countryDTO);
    }

    @Override
    public ResponseEntity<?> updateCountry(Long id, CountryDTO country) {
        Optional<Country> country1 = countryRepository.findById(id);
        Country country2 = countryMapper.toEntity(country);
        if (country1.isPresent()) {
            Country country3 = countryRepository.save(Country.builder()
                    .id(id)
                    .name(country2.getName())
                    .build());
            CountryDTO countryDTO = countryMapper.toDTO(country3);
            return ResponseEntity.ok().body(countryDTO);
        }
        return ResponseEntity.notFound().build();
    }


    @Override
    public ResponseEntity<?> deleteCountry(Long id) {
        try {
            countryRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @Override
    public ResponseEntity<?> getAll() {
        List<Country> countries = countryRepository.findAll();
        List<CountryDTO> countryDTOS = countryMapper.listToDto(countries);
        countryDTOS.forEach(countryDTO -> {
            List<Province>provinces = countryRepository.findProvinceByCountryId(countryDTO.getId());
            List<ProvinceDTO> provinceDTOList = provinceMapper.toProvinceDTOList(provinces);
            countryDTO.setProvinces(provinceDTOList);
        });
        return ResponseEntity.ok().body(countryDTOS);
    }

    @Override
    public ResponseEntity<?> getCountryById(Long id) {
        Optional<Country> optionalCountry = countryRepository.findById(id);
        if (optionalCountry.isPresent()) {
            List<Province> provinces = countryRepository.findProvinceByCountryId(id);
            List<ProvinceDTO> provinceDTOList = provinceMapper.toProvinceDTOList(provinces);
            CountryDTO countryDTO = countryMapper.toDTO(optionalCountry.get());
            countryDTO.setProvinces(provinceDTOList);
            return ResponseEntity.ok(countryDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
