package com.semillero.ecosistema.controllers;

import com.semillero.ecosistema.DTO.ProvinceDTO;
import com.semillero.ecosistema.services.ProvinceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/province")
public class ProvinceController {

    @Autowired
    private ProvinceService provinceService;

    @GetMapping("/all")
    public ResponseEntity<?> getAll() {
        return provinceService.getAll();
    }

    @GetMapping("/get")
    public ResponseEntity<?> getProvinceById(@RequestParam Long id) {
        return provinceService.getProvinceById(id);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createProvince(@RequestBody ProvinceDTO province) {
        return provinceService.createProvince(province);
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@RequestBody ProvinceDTO provinceDTO) {
        return provinceService.updateProvince(provinceDTO);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteProvince(@RequestParam Long id) {
        return provinceService.deleteProvince(id);
    }
}

