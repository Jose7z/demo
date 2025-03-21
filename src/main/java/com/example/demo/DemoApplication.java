package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import com.example.demo.repository.EnvanterRepository;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(DemoApplication.class, args);
        
        EnvanterRepository envanterRepository = context.getBean(EnvanterRepository.class);
        
        // Tüm envanter kayıtlarını çek ve göster
        System.out.println("Envanter Listesi:");
        envanterRepository.findAll().forEach(envanter -> {
            System.out.println("Etiket No: " + envanter.getEtiketno());
            System.out.println("Ürün: " + envanter.getUrunailesi());
            System.out.println("Model: " + envanter.getModeladi());
            System.out.println("Durum: " + envanter.getDurum());
            System.out.println("Lokasyon: " + envanter.getLokasyonadi());
            System.out.println("--------------------");
        });
    }
}