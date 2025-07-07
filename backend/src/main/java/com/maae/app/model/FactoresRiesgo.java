package com.maae.app.model;

import jakarta.persistence.*;  // Usamos jakarta para mantener consistencia con tus otros modelos
import java.io.Serializable;

@Entity
@Table(name = "factores_riesgo")
public class FactoresRiesgo implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "tratamiento")
    private String tratamiento;

    @Column(name = "respuesta")
    private String respuesta;

    @Column(name = "area_responsable")
    private String areaResponsable;

    // --- Relaciones ---
    @ManyToOne
    @JoinColumn(name = "riesgo_id")
    private Riesgo riesgo;

    // --- Getters y Setters ---

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTratamiento() {
        return tratamiento;
    }

    public void setTratamiento(String tratamiento) {
        this.tratamiento = tratamiento;
    }

    public String getRespuesta() {
        return respuesta;
    }

    public void setRespuesta(String respuesta) {
        this.respuesta = respuesta;
    }

    public String getAreaResponsable() {
        return areaResponsable;
    }

    public void setAreaResponsable(String areaResponsable) {
        this.areaResponsable = areaResponsable;
    }

    public Riesgo getRiesgo() {
        return riesgo;
    }

    public void setRiesgo(Riesgo riesgo) {
        this.riesgo = riesgo;
    }
}
