package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "envanter") // Veritabanındaki gerçek tablo adını buraya yazın
public class Envanter {
    @Id
    @Column(name = "etiketno") // Veritabanındaki kolon adını yazın
    private String etiketno;
    
    @Column(name = "urunailesi")
    private String urunailesi;
    
    @Column(name = "sinif")
    private String sinif;
    
    @Column(name = "serialnumber")
    private String serialnumber;
    
    @Column(name = "durum")
    private String durum;
    
    @Column(name = "modeladi")
    private String modeladi;

    @Column(name = "lokasyonkodu")
    private String lokasyonkodu;
    
    @Column(name = "lokasyonadi")
    private String lokasyonadi;
    
    @Column(name = "lokasyontipi")
    private String lokasyontipi;

    @Column(name = "sorumluluksicil")
    private String sorumluluksicil;

    @Column(name = "irsaliyetarihi")
    private LocalDate irsaliyetarihi;


}