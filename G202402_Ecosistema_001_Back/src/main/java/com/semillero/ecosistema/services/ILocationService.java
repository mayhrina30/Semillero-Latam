package com.semillero.ecosistema.services;

import org.springframework.http.ResponseEntity;

import java.io.IOException;

public interface ILocationService {

    ResponseEntity<?> location(Double latitud, Double longitud, String userName)throws IOException;
}
