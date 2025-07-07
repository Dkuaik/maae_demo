package com.maae.app.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "riesgos")
public class Riesgo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "impacto")
    private String impacto;

    @Column(name = "probabilidad")
    private String probabilidad;

    @Column(name = "factor_id")
    private Integer factorId;

    @OneToOne(mappedBy = "riesgo", cascade = CascadeType.ALL)
    private FactorRiesgo factorRiesgo;

    @ManyToOne
    @JoinColumn(name = "papel_trabajo_id")
    private PapelTrabajo papelTrabajo;

    @OneToMany(mappedBy = "riesgo", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<ActividadControl> actividadesControl = new ArrayList<>();

    // Getters y Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getImpacto() {
        return impacto;
    }

    public void setImpacto(String impacto) {
        this.impacto = impacto;
    }

    public String getProbabilidad() {
        return probabilidad;
    }

    public void setProbabilidad(String probabilidad) {
        this.probabilidad = probabilidad;
    }

    public Integer getFactorId() {
        return factorId;
    }

    public void setFactorId(Integer factorId) {
        this.factorId = factorId;
    }

    public FactorRiesgo getFactorRiesgo() {
        return factorRiesgo;
    }

    public void setFactorRiesgo(FactorRiesgo factorRiesgo) {
        this.factorRiesgo = factorRiesgo;
        if (factorRiesgo != null) {
            this.factorId = factorRiesgo.getId();
        }
    }

    public PapelTrabajo getPapelTrabajo() {
        return papelTrabajo;
    }

    public void setPapelTrabajo(PapelTrabajo papelTrabajo) {
        this.papelTrabajo = papelTrabajo;
    }

    public List<ActividadControl> getActividadesControl() {
        return actividadesControl;
    }

    public void setActividadesControl(List<ActividadControl> actividadesControl) {
        this.actividadesControl = actividadesControl;
    }
}
