package com.example.demo.model;

public class AssignmentRequest {
    private Integer etiketno;
    private String sorumluluksicil;
    private String action;

    // Getters and Setters
    public Integer getEtiketno() {  
        return etiketno;
    }

    public void setEtiketno(Integer etiketno) {  
        this.etiketno = etiketno;
    }

    public String getSorumluluksicil() {
        return sorumluluksicil;
    }

    public void setSorumluluksicil(String sorumluluksicil) {
        this.sorumluluksicil = sorumluluksicil;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }
}