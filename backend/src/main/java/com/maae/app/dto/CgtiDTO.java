package com.maae.app.dto;

public class CgtiDTO {
    private Integer cgtiId;
    private String nombreCgti;
    private String descripcion;
    private String linkDocumentacion;
    private Integer anio;

    public CgtiDTO() {}

    public CgtiDTO(Integer cgtiId, String nombreCgti, String descripcion, String linkDocumentacion, Integer anio) {
        this.cgtiId = cgtiId;
        this.nombreCgti = nombreCgti;
        this.descripcion = descripcion;
        this.linkDocumentacion = linkDocumentacion;
        this.anio = anio;
    }

    public Integer getCgtiId() {
        return cgtiId;
    }

    public void setCgtiId(Integer cgtiId) {
        this.cgtiId = cgtiId;
    }

    public String getNombreCgti() {
        return nombreCgti;
    }

    public void setNombreCgti(String nombreCgti) {
        this.nombreCgti = nombreCgti;
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

    public Integer getAnio() {
        return anio;
    }

    public void setAnio(Integer anio) {
        this.anio = anio;
    }
}