package com.maae.app.dto;

import java.util.List;

public class Formato2DTO {
    private String nombreCgti;
    private String nombreNorma;
    private List<FactorDTO> factores;

    public Formato2DTO() { }

    public Formato2DTO(String nombreCgti, String nombreNorma, List<FactorDTO> factores) {
        this.nombreCgti = nombreCgti;
        this.nombreNorma = nombreNorma;
        this.factores = factores;
    }

    public String getNombreCgti() { return nombreCgti; }
    public void setNombreCgti(String nombreCgti) { this.nombreCgti = nombreCgti; }

    public String getNombreNorma() { return nombreNorma; }
    public void setNombreNorma(String nombreNorma) { this.nombreNorma = nombreNorma; }

    public List<FactorDTO> getFactores() { return factores; }
    public void setFactores(List<FactorDTO> factores) { this.factores = factores; }
}
