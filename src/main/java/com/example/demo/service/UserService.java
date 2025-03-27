package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public ResponseEntity<?> registerUser(User user) {
        try {
            if (userRepository.findByUsername(user.getUsername()).isPresent()) {
                return ResponseEntity.badRequest()
                    .body(Map.of("message", "Bu kullanıcı adı zaten kullanımda"));
            }

            user.setPassword(passwordEncoder.encode(user.getPassword()));
            User savedUser = userRepository.save(user);
            
            Map<String, Object> response = new HashMap<>();
            response.put("id", savedUser.getId());
            response.put("username", savedUser.getUsername());
            response.put("email", savedUser.getEmail());
            response.put("message", "Kayıt başarılı");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("message", "Kayıt işlemi başarısız: " + e.getMessage()));
        }
    }

    public ResponseEntity<?> loginUser(User user) {
        try {
            return userRepository.findByUsername(user.getUsername())
                .filter(u -> passwordEncoder.matches(user.getPassword(), u.getPassword()))
                .map(u -> {
                    Map<String, Object> response = new HashMap<>();
                    response.put("id", u.getId());
                    response.put("username", u.getUsername());
                    response.put("message", "Giriş başarılı");
                    return ResponseEntity.ok(response);
                })
                .orElseGet(() -> ResponseEntity.badRequest()
                    .body(Map.of("message", "Kullanıcı adı veya şifre hatalı")));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(Map.of("message", "Giriş işlemi başarısız: " + e.getMessage()));
        }
    }
}