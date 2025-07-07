package com.maae.app.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "papeles_trabajo")
public class PapelTrabajo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "nombre")
    private String nombre;

    @ManyToOne
    @JoinColumn(name = "cgti_id", referencedColumnName = "id")
    private Cgti cgti;

    @Column(name = "error_tolerable")
    private Double errorTolerable;

    @Column(name = "objetivo_control")
    private String objetivoControl;

    @OneToMany(mappedBy = "papelTrabajo", cascade = CascadeType.ALL)
    private List<Riesgo> riesgos;

    @Column(name = "descripcion_universo")
    private String descripcionUniverso;

    @Column(name = "porcentaje_efectividad")
    private Double porcentajeEfectividad;

    @Column(name = "norma_id")
    private Integer normaId;

    @Column(name = "descripcion_muestra")
    private String descripcionMuestra;

    @Column(name = "periodo_revision")
    private String periodoRevision;

    @ManyToOne
    @JoinColumn(name = "riesgo_id")
    private Riesgo riesgo;


    // Getters and Setters
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

    public Cgti getCgti() {
        return cgti;
    }

    public void setCgti(Cgti cgti) {
        this.cgti = cgti;
    }

    public Double getErrorTolerable() {
        return errorTolerable;
    }

    public void setErrorTolerable(Double errorTolerable) {
        this.errorTolerable = errorTolerable;
    }

    public String getObjetivoControl() {
        return objetivoControl;
    }

    public void setObjetivoControl(String objetivoControl) {
        this.objetivoControl = objetivoControl;
    }

    public List<Riesgo> getRiesgos() {
        return riesgos;
    }

    public void setRiesgos(List<Riesgo> riesgos) {
        this.riesgos = riesgos;
    }

    public String getDescripcionUniverso() {
        return descripcionUniverso;
    }

    public void setDescripcionUniverso(String descripcionUniverso) {
        this.descripcionUniverso = descripcionUniverso;
    }

    public Double getPorcentajeEfectividad() {
        return porcentajeEfectividad;
    }

    public void setPorcentajeEfectividad(Double porcentajeEfectividad) {
        this.porcentajeEfectividad = porcentajeEfectividad;
    }

    public Integer getNormaId() {
        return normaId;
    }

    public void setNormaId(Integer normaId) {
        this.normaId = normaId;
    }

    public String getDescripcionMuestra() {
        return descripcionMuestra;
    }

    public void setDescripcionMuestra(String descripcionMuestra) {
        this.descripcionMuestra = descripcionMuestra;
    }


    public String getPeriodoRevision(){
        return periodoRevision;
    }

    public void setPeriodoRevision(String periodoRevision){
        this.periodoRevision = periodoRevision;
    }

    public Riesgo getRiesgo() {
        return riesgo;
    }

    public void setRiesgo(Riesgo riesgo) {
        this.riesgo = riesgo;

    }
}