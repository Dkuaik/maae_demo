package com.maae.app.dto;

public class CgtiAnioCreateDTO {
    private String nombreCgti;
    private Integer anio;
    private String descripcion;
    private String linkDocumentacion;

    public CgtiAnioCreateDTO() {}

    public CgtiAnioCreateDTO(String nombreCgti, Integer anio, String descripcion, String linkDocumentacion) {
        this.nombreCgti = nombreCgti;
        this.anio = anio;
        this.descripcion = descripcion;
        this.linkDocumentacion = linkDocumentacion;
    }

    public String getNombreCgti() {
        return nombreCgti;
    }

    public void setNombreCgti(String nombreCgti) {
        this.nombreCgti = nombreCgti;
    }

    public Integer getAnio() {
        return anio;
    }

    public void setAnio(Integer anio) {
        this.anio = anio;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getLinkDocumentacion() {
        return linkDocumentacion;
    }

    public void setLinkDocumentacion(String linkDocumentacion) {
        this.linkDocumentacion = linkDocumentacion;
    }
}
