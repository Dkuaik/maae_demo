package com.maae.app.dto;

public class Formato1DTO {
    private Long id;
    private String nombreCgti;
    private Double errorTolerable;
    private String descripcionMuestra;
    private String descripcionUniverso;

    // Constructores
    public Formato1DTO() {}

    public Formato1DTO(Long id, String nombreCgti, Double errorTolerable, 
                     String descripcionMuestra, String descripcionUniverso) {
        this.id = id;
        this.nombreCgti = nombreCgti;
        this.errorTolerable = errorTolerable;
        this.descripcionMuestra = descripcionMuestra;
        this.descripcionUniverso = descripcionUniverso;
    }

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getNombreCgti() { return nombreCgti; }
    public void setNombreCgti(String nombreCgti) { this.nombreCgti = nombreCgti; }
    public Double getErrorTolerable() { return errorTolerable; }
    public void setErrorTolerable(Double errorTolerable) { this.errorTolerable = errorTolerable; }
    public String getDescripcionMuestra() { return descripcionMuestra; }
    public void setDescripcionMuestra(String descripcionMuestra) { this.descripcionMuestra = descripcionMuestra; }
    public String getDescripcionUniverso() { return descripcionUniverso; }
    public void setDescripcionUniverso(String descripcionUniverso) { this.descripcionUniverso = descripcionUniverso; }
}