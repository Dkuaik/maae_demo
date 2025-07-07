package com.maae.app.model;

import jakarta.persistence.*;

@Entity
@Table(name = "actividades_control")
public class ActividadControl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "comentarios")
    private String comentarios;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "papel_trabajo_id")
    private Integer papelTrabajoId;

    @Column(name = "ponderacion")
    private Double ponderacion;

    @Column(name = "tipo")
    private String tipo;

    @Column(name = "ejecucion")
    private String ejecucion;

    @Column(name = "frecuencia")
    private String frecuencia;

    @Column(name = "area_responsable")
    private String areaResponsable;

    @Column(name = "descripcion_universo")
    private String descripcionUniverso;

    @Column(name = "descripcion_muestra")
    private String descripcionMuestra;

    @Column(name = "porcentaje_efectividad")
    private Double porcentajeEfectividad;

    @Column(name = "ejecucuion")
    private String ejecucuion;

    @ManyToOne
    @JoinColumn(name = "riesgo_id")
    private Riesgo riesgo;

    // Getters y Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getComentarios() {
        return comentarios;
    }

    public void setComentarios(String comentarios) {
        this.comentarios = comentarios;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Integer getPapelTrabajoId() {
        return papelTrabajoId;
    }

    public void setPapelTrabajoId(Integer papelTrabajoId) {
        this.papelTrabajoId = papelTrabajoId;
    }

    public Double getPonderacion() {
        return ponderacion;
    }

    public void setPonderacion(Double ponderacion) {
        this.ponderacion = ponderacion;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getEjecucion() {
        return ejecucion;
    }

    public void setEjecucion(String ejecucion) {
        this.ejecucion = ejecucion;
    }

    public String getFrecuencia() {
        return frecuencia;
    }

    public void setFrecuencia(String frecuencia) {
        this.frecuencia = frecuencia;
    }

    public String getAreaResponsable() {
        return areaResponsable;
    }

    public void setAreaResponsable(String areaResponsable) {
        this.areaResponsable = areaResponsable;
    }

    public String getDescripcionUniverso() {
        return descripcionUniverso;
    }

    public void setDescripcionUniverso(String descripcionUniverso) {
        this.descripcionUniverso = descripcionUniverso;
    }

    public String getDescripcionMuestra() {
        return descripcionMuestra;
    }

    public void setDescripcionMuestra(String descripcionMuestra) {
        this.descripcionMuestra = descripcionMuestra;
    }

    public Double getPorcentajeEfectividad() {
        return porcentajeEfectividad;
    }

    public void setPorcentajeEfectividad(Double porcentajeEfectividad) {
        this.porcentajeEfectividad = porcentajeEfectividad;
    }

    public String getEjecucuion() {
        return ejecucuion;
    }

    public void setEjecucuion(String ejecucuion) {
        this.ejecucuion = ejecucuion;
    }

    public Riesgo getRiesgo() {
        return riesgo;
    }

    public void setRiesgo(Riesgo riesgo) {
        this.riesgo = riesgo;
    }
}
