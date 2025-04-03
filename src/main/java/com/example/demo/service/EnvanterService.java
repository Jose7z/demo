package com.example.demo.service;

import com.example.demo.entity.Envanter;
import com.example.demo.repository.EnvanterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EnvanterService {
    
    @Autowired
    private EnvanterRepository envanterRepository ;
    public List<Envanter> searchEnvanter(
            Integer etiketno, 
            String urunailesi, 
            String modeladi, 
            String durum,
            String lokasyonadi,
            String lokasyonkodu, 
            String lokasyontipi,
            String sorumluluksicil, 
            String sorumluluk, 
            String sinif,
            String irsaliyetarihi) {
        
        return envanterRepository.findAll().stream()
                .filter(envanter -> 
                    (etiketno == null || envanter.getEtiketno().equals(etiketno)) &&
                    (urunailesi == null || urunailesi.isEmpty() || envanter.getUrunailesi().toLowerCase().contains(urunailesi.toLowerCase())) &&
                    (modeladi == null || modeladi.isEmpty() || envanter.getModeladi().toLowerCase().contains(modeladi.toLowerCase())) &&
                    (durum == null || durum.isEmpty() || envanter.getDurum().toLowerCase().contains(durum.toLowerCase())) &&
                    (lokasyonadi == null || lokasyonadi.isEmpty() || envanter.getLokasyonadi().toLowerCase().contains(lokasyonadi.toLowerCase())) &&
                    (lokasyonkodu == null || lokasyonkodu.isEmpty() || envanter.getLokasyonkodu().toLowerCase().contains(lokasyonkodu.toLowerCase())) &&
                    (lokasyontipi == null || lokasyontipi.isEmpty() || envanter.getLokasyontipi().toLowerCase().contains(lokasyontipi.toLowerCase())) &&
                    (sorumluluksicil == null || sorumluluksicil.isEmpty() || envanter.getSorumluluksicil().toLowerCase().contains(sorumluluksicil.toLowerCase())) &&
                    (sorumluluk == null || sorumluluk.isEmpty() || envanter.getSorumluluk().toLowerCase().contains(sorumluluk.toLowerCase())) &&
                    (sinif == null || sinif.isEmpty() || envanter.getSinif().toLowerCase().contains(sinif.toLowerCase())) &&
                    (irsaliyetarihi == null || irsaliyetarihi.isEmpty() || envanter.getIrsaliyetarihi().toString().contains(irsaliyetarihi))
                )
                .collect(Collectors.toList());
    }
    
    public List<Envanter> getAllEnvanter() {
        System.out.println("EnvanterService: Fetching all records");
        List<Envanter> result = envanterRepository.findAll();
        System.out.println("EnvanterService: Found " + result.size() + " records");
        if (!result.isEmpty()) {
            System.out.println("EnvanterService: First record: " + result.get(0));
        }
        return result;
    }
    
    public Optional<Envanter> getEnvanterById(Integer etiketNo) {
        return envanterRepository.findById(etiketNo);
    }
    
    public Envanter saveEnvanter(Envanter envanter) {
        return envanterRepository.save(envanter);
    }
    
    public void deleteEnvanter(Integer etiketNo) {
        envanterRepository.deleteById(etiketNo);
    }
    public Envanter findByEtiketno(Integer etiketno) {
        return envanterRepository.findByEtiketno(etiketno);
    }

    public Envanter save(Envanter envanter) {
        return envanterRepository.save(envanter);
    }

}