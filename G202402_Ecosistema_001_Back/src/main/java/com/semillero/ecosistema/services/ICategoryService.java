package com.semillero.ecosistema.services;

import org.springframework.http.ResponseEntity;

public interface ICategoryService {

    ResponseEntity<?> getCategories();
}
