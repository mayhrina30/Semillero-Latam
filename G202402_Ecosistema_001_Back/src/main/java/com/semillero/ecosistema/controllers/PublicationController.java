package com.semillero.ecosistema.controllers;


import com.semillero.ecosistema.DTO.PublicationDTO;
import com.semillero.ecosistema.services.implement.PublicationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URISyntaxException;

@RestController
@RequestMapping(path = "/publication")
public class PublicationController {
    private final PublicationService publicationService;

    @Autowired
    public PublicationController(PublicationService publicationService){
        this.publicationService = publicationService;
    }

    @GetMapping("/get-all")
    public ResponseEntity<?> getPublications (){
        return publicationService.getPublications() ;
    }
    @GetMapping("/get")
    public ResponseEntity<?> getPublication(@RequestParam Long id){
        return publicationService.getPublication(id);
    }
    @GetMapping("/actives")
    public ResponseEntity<?> getPublicationsActives(){
        return publicationService.getPublicationsActives();
    }
    @PostMapping("/create")
    public ResponseEntity<?> createPublication(@RequestParam String email, @RequestBody PublicationDTO publicationDto) throws URISyntaxException {

        return publicationService.createPublication(publicationDto,email);
    }
    @PutMapping("/update")
    public ResponseEntity<?> updatePublication (@RequestBody PublicationDTO publicationDto){
        return publicationService.updatePublication(publicationDto);
    }
    @DeleteMapping("/delete")
    public ResponseEntity<?> deletePublication(@RequestParam Long id){
        return publicationService.deletedPublication(id);
    }
    @PutMapping("/update-view")
    public ResponseEntity<?> updateViews (@RequestParam Long id){
        return publicationService.updateViews(id);
    }
}
