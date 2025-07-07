package com.maae.app.model;

import jakarta.persistence.*;

@Entity
@Table(name = "campos_complementarios")
public class CampoComplementario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "evidencia_id")
    private Evidencia evidencia;

    @Column(name = "nombre_campo")
    private String nombreCampo;

    @Column(name = "contenido_cc")
    private String contenidoCc;

    // Getters y Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Evidencia getEvidencia() {
        return evidencia;
    }

    public void setEvidencia(Evidencia evidencia) {
        this.evidencia = evidencia;
    }
    
    public String getNombreCampo() {
        return nombreCampo;
    }

    public void setNombreCampo(String nombreCampo) {
        this.nombreCampo = nombreCampo;
    }

    public String getContenidoCc(){
        return contenidoCc;
    }

    public void setContenidoCc(String contenidoCc){
        this.contenidoCc = contenidoCc;
    }
}
