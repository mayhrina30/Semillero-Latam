package com.semillero.ecosistema.services;

import com.semillero.ecosistema.DTO.PublicationDTO;
import org.springframework.http.ResponseEntity;

import java.net.URISyntaxException;

public interface IPublicationService {

    ResponseEntity<?> getPublications();

    ResponseEntity<?> getPublicationsActives();

    ResponseEntity<?> getPublication(Long id);

    ResponseEntity<?> createPublication(PublicationDTO publicationDto, String email) throws URISyntaxException;

    ResponseEntity<?> updatePublication(PublicationDTO publicationDto);

    ResponseEntity<?> deletedPublication(Long id);

    ResponseEntity<?> updateViews (Long id);

}
