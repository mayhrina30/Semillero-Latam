package com.semillero.ecosistema.controllers;

import com.semillero.ecosistema.jwt.JwtUtil;
import com.semillero.ecosistema.services.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private IUserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    public UserController(IUserService userService) {
        this.userService = userService;
    }


    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteUser(@RequestParam Long id) {

        return userService.deleteUser(id);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getUser(@RequestParam String email) {
        return userService.getUser(email);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestParam String token) {

        return userService.saveUser(token);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String email) {
        return userService.loginUser(email);
    }

    @GetMapping("/expiration")
    public boolean token(@RequestParam String token) {
        return jwtUtil.isTokenExpired(token);
    }
}

