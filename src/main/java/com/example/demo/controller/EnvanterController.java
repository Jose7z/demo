package com.example.demo.controller;

import com.example.demo.entity.Envanter;
import com.example.demo.service.EnvanterService;

import org.springframework.http.MediaType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class EnvanterController {

    @Autowired
    private EnvanterService envanterService;

    @GetMapping("/envanter")
    public ResponseEntity<List<Envanter>> getAllEnvanter() {
        List<Envanter> envanterList = envanterService.getAllEnvanter();
        System.out.println("Returning envanter list, size: " + envanterList.size());
        return ResponseEntity.ok()
            .contentType(MediaType.APPLICATION_JSON)
            .body(envanterList);
    }
    

    @GetMapping("/envanter/{etiketNo}")
    public ResponseEntity<Envanter> getEnvanterById(@PathVariable Integer etiketNo) {
        return envanterService.getEnvanterById(etiketNo)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/envanter")
    public ResponseEntity<Envanter> createEnvanter(@RequestBody Envanter envanter) {
        try {
            System.out.println("Received envanter data: " + envanter); // Debug log
            if (envanter.getEtiketno() == null) {
                return ResponseEntity.badRequest().build();
            }
            Envanter savedEnvanter = envanterService.saveEnvanter(envanter);
            System.out.println("Saved envanter: " + savedEnvanter); // Debug log
            return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(savedEnvanter);
        } catch (Exception e) {
            System.err.println("Error saving envanter: " + e.getMessage()); // Error log
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/envanter/{etiketNo}")
    public ResponseEntity<Envanter> updateEnvanter(@PathVariable Integer etiketNo, 
                                                 @RequestBody Envanter envanter) {
        return envanterService.getEnvanterById(etiketNo)
                .map(existingEnvanter -> {
                    envanter.setEtiketno(etiketNo);
                    return ResponseEntity.ok(envanterService.saveEnvanter(envanter));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/envanter/{etiketNo}")
    public ResponseEntity<Void> deleteEnvanter(@PathVariable Integer etiketNo) {
        return envanterService.getEnvanterById(etiketNo)
                .map(envanter -> {
                    envanterService.deleteEnvanter(etiketNo);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}