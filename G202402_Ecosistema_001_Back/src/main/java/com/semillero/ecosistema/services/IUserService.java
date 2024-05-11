package com.semillero.ecosistema.services;

import org.springframework.http.ResponseEntity;

public interface IUserService {

    ResponseEntity<?> deleteUser(Long id);

    ResponseEntity<?> getUser(String email);
    ResponseEntity<?> saveUser(String token);

    ResponseEntity<?> loginUser(String email);

    String[] findAllUsersEmail();

}
