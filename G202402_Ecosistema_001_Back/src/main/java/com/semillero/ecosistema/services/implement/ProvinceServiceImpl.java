package com.semillero.ecosistema.services.implement;

import com.semillero.ecosistema.DTO.ProvinceDTO;
import com.semillero.ecosistema.entities.Country;
import com.semillero.ecosistema.entities.Province;
import com.semillero.ecosistema.mapper.ProvinceMapper;
import com.semillero.ecosistema.repositories.CountryRepository;
import com.semillero.ecosistema.repositories.ProvinceRepository;
import com.semillero.ecosistema.services.ProvinceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProvinceServiceImpl implements ProvinceService {

    @Autowired
    private ProvinceRepository provinceRepository;

    @Autowired
    private CountryRepository countryRepository;

    @Autowired
    private ProvinceMapper provinceMapper;

    @Override
    public ResponseEntity<?> createProvince(ProvinceDTO province) {
        Optional<Country> country = countryRepository.findById(province.getCountryId());
        if (country.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        Province province1 = provinceMapper.toEntity(province);
        Province province2 = provinceRepository.save( province1);
        ProvinceDTO provinceDTO = provinceMapper.toDTO(province2);
        return ResponseEntity.ok(provinceDTO);

    }

    @Override
    public ResponseEntity<?> updateProvince(ProvinceDTO province) {
        Optional<Province> optionalProvince = provinceRepository.findById(province.getId());
        Optional<Country> country = countryRepository.findById(province.getCountryId());
        if (optionalProvince.isEmpty() || country.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Province province1 = provinceMapper.toEntity(province);
        Province province2 =
                provinceRepository.save(province1);
        ProvinceDTO provinceDTO = provinceMapper.toDTO(province2);
        return ResponseEntity.ok(provinceDTO);
    }

    @Override
    public ResponseEntity<?> deleteProvince(Long id) {
        try {
            provinceRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @Override
    public ResponseEntity<?> getAll() {
        List<ProvinceDTO> provinces = provinceRepository.findAll()
                .stream().map(province -> provinceMapper.toDTO(province)).toList();
        return ResponseEntity.ok(provinces);
    }

    @Override
    public ResponseEntity<?> getProvinceById(Long id) {
        Optional<Province> optionalProvince = provinceRepository.findById(id);

        if (optionalProvince.isPresent()) {
            ProvinceDTO provinceDTO = provinceMapper.toDTO(optionalProvince.get());
            return ResponseEntity.ok(provinceDTO);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
