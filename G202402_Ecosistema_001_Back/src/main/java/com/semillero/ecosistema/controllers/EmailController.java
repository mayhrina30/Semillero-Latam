package com.semillero.ecosistema.controllers;

import com.semillero.ecosistema.services.IEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/email")
@EnableScheduling
public class EmailController {

    @Autowired
    private IEmailService emailService;


    @PostMapping("/sendHTML")
    @Scheduled(cron = "@weekly")
    public ResponseEntity<?> receiveRequestEmailHTML() throws Exception {

        emailService.sendHTMLEmail();

        return ResponseEntity.ok().build();
    }


}
