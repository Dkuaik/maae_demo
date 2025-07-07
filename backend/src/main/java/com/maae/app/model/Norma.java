package com.maae.app.model;

import jakarta.persistence.*;

@Entity
@Table(name = "normas")
public class Norma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "tipo_factor_id")
    private Integer tipoFactorId;

    // Getters y Setters

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

    public Integer getTipoFactorId() {
        return tipoFactorId;
    }

    public void setTipoFactorId(Integer tipoFactorId) {
        this.tipoFactorId = tipoFactorId;
    }
}
