package com.semillero.ecosistema.controllers;

import com.semillero.ecosistema.services.ILocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/location")
public class LocationController {

    @Autowired
    private ILocationService locationService;

    @PostMapping()
    public ResponseEntity<?> location(@RequestParam Double latitude, @RequestParam Double length,@RequestParam String email) throws IOException {
        return locationService.location(latitude,length,email);
    }
}
