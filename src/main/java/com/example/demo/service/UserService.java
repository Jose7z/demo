package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class UserService {
    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;
    
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public ResponseEntity<?> registerUser(User user) {
        try {
            if (userRepository.findByUsername(user.getUsername()).isPresent()) {
                logger.warn("Registration failed: username already exists - {}", user.getUsername());
                return ResponseEntity.badRequest()
                    .body(Map.of("message", "Bu kullanıcı adı zaten kullanımda"));
            }

            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User savedUser = userRepository.save(user);
            logger.info("User registered successfully: {}", savedUser.getUsername());
            
            Map<String, Object> response = new HashMap<>();
            response.put("id", savedUser.getId());
            response.put("username", savedUser.getUsername());
            response.put("email", savedUser.getEmail());
            response.put("message", "Kayıt başarılı");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            logger.error("Registration error: {}", e.getMessage());
            return ResponseEntity.badRequest()
                .body(Map.of("message", "Kayıt işlemi başarısız: " + e.getMessage()));
        }
    }

    public ResponseEntity<?> loginUser(User user) {
        try {
            logger.info("Attempting login for user: {}", user.getUsername());
            return userRepository.findByUsername(user.getUsername())
                .map(u -> {
                    if (passwordEncoder.matches(user.getPassword(), u.getPassword())) {
                        logger.info("Login successful for user: {}", u.getUsername());
                        Map<String, Object> response = new HashMap<>();
                        response.put("id", u.getId());
                        response.put("username", u.getUsername());
                        response.put("message", "Giriş başarılı");
                        return ResponseEntity.ok(response);
                    } else {
                        logger.warn("Login failed: incorrect password for user {}", u.getUsername());
                        return ResponseEntity.badRequest()
                            .body(Map.of("message", "Kullanıcı adı veya şifre hatalı"));
                    }
                })
                .orElseGet(() -> {
                    logger.warn("Login failed: user not found - {}", user.getUsername());
                    return ResponseEntity.badRequest()
                        .body(Map.of("message", "Kullanıcı adı veya şifre hatalı"));
                });
        } catch (Exception e) {
            logger.error("Login error for user {}: {}", user.getUsername(), e.getMessage());
            return ResponseEntity.badRequest()
                .body(Map.of("message", "Giriş işlemi başarısız: " + e.getMessage()));
        }
    }
}