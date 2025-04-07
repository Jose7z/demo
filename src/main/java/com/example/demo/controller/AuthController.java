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
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", 
    allowedHeaders = "*", 
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.OPTIONS},
    allowCredentials = "true",
    maxAge = 3600 )
    public class AuthController {
        private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private UserService userService;

    @GetMapping("/test")
    public ResponseEntity<?> testEndpoint() {
        logger.info("Test endpoint called");
        return ResponseEntity.ok(Map.of("message", "Test successful", "status", "ok"));
    }

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
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        try {
            logger.info("Login attempt for user: {}", loginRequest.get("username"));
            
            User user = userService.authenticateUser(
                loginRequest.get("username"),
                loginRequest.get("password")
            );

            String token = jwtTokenProvider.generateToken(user.getUsername());
            
            logger.info("Login successful for user: {}", user.getUsername());

            return ResponseEntity.ok(Map.of(
                "token", token,
                "username", user.getUsername()
            ));
            
        } catch (Exception e) {
            logger.error("Authentication failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "Invalid username or password"));
        }
    }
}