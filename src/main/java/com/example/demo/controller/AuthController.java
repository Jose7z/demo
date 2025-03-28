package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.demo.security.JwtTokenProvider; 
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST})
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        logger.info("Register attempt for user: {}", user.getUsername());
        
        if (user.getUsername() == null || user.getUsername().trim().isEmpty() ||
            user.getPassword() == null || user.getPassword().trim().isEmpty() ||
            user.getEmail() == null || user.getEmail().trim().isEmpty()) {
            logger.warn("Registration failed: empty fields");
            return ResponseEntity.badRequest().body("Tüm alanlar zorunludur");
        }
        try {
            return userService.registerUser(user);
        } catch (Exception e) {
            logger.error("Registration error for user {}: {}", user.getUsername(), e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("message", "Kayıt işlemi sırasında bir hata oluştu"));
        }
    }

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        logger.info("Login attempt received with data: {}", user);
        
        try {
            if (user.getUsername() == null || user.getUsername().trim().isEmpty() ||
                user.getPassword() == null || user.getPassword().trim().isEmpty()) {
                logger.warn("Login failed: empty credentials");
                return ResponseEntity.badRequest().body(Map.of(
                    "message", "Kullanıcı adı ve şifre zorunludur",
                    "status", "error"
                ));
            }
            
            ResponseEntity<?> response = userService.loginUser(user);
            if (response.getStatusCode().is2xxSuccessful()) {
                String token = jwtTokenProvider.createToken(user.getUsername());
                return ResponseEntity.ok(Map.of(
                    "token", token,
                    "username", user.getUsername(),
                    "message", "Login successful"
                ));
            }
            return response;
        } catch (Exception e) {
            logger.error("Login error for user {}: {}", user.getUsername(), e.getMessage());
            return ResponseEntity.badRequest().body(Map.of(
                "message", "Giriş işlemi sırasında bir hata oluştu",
                "status", "error"
            ));
        }
    }
}