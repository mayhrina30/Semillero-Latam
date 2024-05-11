package com.semillero.ecosistema.services;

import com.semillero.ecosistema.DTO.ProvinceDTO;
import org.springframework.http.ResponseEntity;

public interface ProvinceService {

    ResponseEntity<?> createProvince(ProvinceDTO province);

    ResponseEntity<?> updateProvince(ProvinceDTO province);

    ResponseEntity<?> deleteProvince(Long id);

    ResponseEntity<?> getAll();

    ResponseEntity<?> getProvinceById(Long id);
}
