package com.example.demo.service;

import com.example.demo.entity.Envanter;
import com.example.demo.repository.EnvanterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnvanterService {
    
    @Autowired
    private EnvanterRepository envanterRepository;
    
    public List<Envanter> getAllEnvanter() {
        return envanterRepository.findAll();
    }
    
    public Optional<Envanter> getEnvanterById(String etiketNo) {
        return envanterRepository.findById(etiketNo);
    }
    
    public Envanter saveEnvanter(Envanter envanter) {
        return envanterRepository.save(envanter);
    }
    
    public void deleteEnvanter(String etiketNo) {
        envanterRepository.deleteById(etiketNo);
    }
}