package com.semillero.ecosistema.services;

import com.semillero.ecosistema.entities.Image;
import org.springframework.http.ResponseEntity;

import java.util.Optional;

public interface ImageService {

    ResponseEntity<?> delete(Long id);

    Optional<Image> getById(Long id);

    boolean exists(Long id);
}
