package com.maae.app.dto;

public class PapelTrabajoDTO {
    private Integer id;
    private String nombre;
    private String objetivoControl;
    private Integer cgtiId;       // ID del CGTI relacionado (requerido para crear/actualizar)
    private Integer normaId;      // ID de la Norma relacionada
    private Integer tipoFactorId; // ID del TipoFactor

    public PapelTrabajoDTO() {} // Constructor vacío
    public PapelTrabajoDTO(Integer id, String nombre, Integer cgtiId) {
        this.id = id;
        this.nombre = nombre;
        this.cgtiId = cgtiId;
    }
        
    // Contrusctor de Formato 1
    public PapelTrabajoDTO(Integer id, String nombre, String objetivoControl) {
        this.id = id;
        this.nombre = nombre;
        this.objetivoControl = objetivoControl;
    }
    
    //Contructor para Formato 2
    public PapelTrabajoDTO(Integer id, String nombre, String objetivoControl, Integer cgtiId, 
                            Integer normaId, Integer tipoFactorId) {
        this.id = id;
        this.nombre = nombre;
        this.objetivoControl = objetivoControl;
        this.cgtiId = cgtiId;
        this.normaId = normaId;
        this.tipoFactorId = tipoFactorId;
    }

    public PapelTrabajoDTO(String nombre, Integer cgtiId, Integer normaId) {
        this.nombre = nombre;
        this.cgtiId = cgtiId;
        this.normaId = normaId;
    }

    // Getters y setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getObjetivoControl() {
        return objetivoControl;
    }

    public void setObjetivoControl(String objetivoControl) {
        this.objetivoControl = objetivoControl;
    }

    public Integer getCgtiId() {
        return cgtiId;
    }

    public void setCgtiId(Integer cgtiId) {
        this.cgtiId = cgtiId;
    }

    public Integer getNormaId() {
        return normaId;
    }

    public void setNormaId(Integer normaId) {
        this.normaId = normaId;
    }

    public Integer getTipoFactorId(){
        return tipoFactorId;
    }

    public void setTipoFactorId(Integer tipoFactorId){
        this.tipoFactorId = tipoFactorId;
    }
}
