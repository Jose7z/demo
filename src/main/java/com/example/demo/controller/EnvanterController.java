package com.example.demo.controller;

import com.example.demo.entity.Envanter;
import com.example.demo.service.EnvanterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/envanter")
public class EnvanterController {

    @Autowired
    private EnvanterService envanterService;

    @GetMapping
    public List<Envanter> getAllEnvanter() {
        return envanterService.getAllEnvanter();
    }

    @GetMapping("/{etiketNo}")
    public ResponseEntity<Envanter> getEnvanterById(@PathVariable String etiketNo) {
        return envanterService.getEnvanterById(etiketNo)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Envanter createEnvanter(@RequestBody Envanter envanter) {
        return envanterService.saveEnvanter(envanter);
    }

    @PutMapping("/{etiketNo}")
    public ResponseEntity<Envanter> updateEnvanter(@PathVariable String etiketNo, 
                                                 @RequestBody Envanter envanter) {
        return envanterService.getEnvanterById(etiketNo)
                .map(existingEnvanter -> {
                    envanter.setEtiketno(etiketNo);
                    return ResponseEntity.ok(envanterService.saveEnvanter(envanter));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{etiketNo}")
    public ResponseEntity<Void> deleteEnvanter(@PathVariable String etiketNo) {
        return envanterService.getEnvanterById(etiketNo)
                .map(envanter -> {
                    envanterService.deleteEnvanter(etiketNo);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}