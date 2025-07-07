package com.maae.app.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "cgtis")
public class Cgti {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "link_documentacion")
    private String linkDocumentacion;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "anio")
    private Integer anio;

    @OneToMany(mappedBy = "cgti", cascade = CascadeType.ALL)
    private List<PapelTrabajo> papelesTrabajo;

    // Getters y Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Integer getAnio() {
        return anio;
    }

    public void setAnio(Integer anio) {
        this.anio = anio;
    }

    public List<PapelTrabajo> getPapelesTrabajo() {
        return papelesTrabajo;
    }

    public void setPapelesTrabajo(List<PapelTrabajo> papelesTrabajo) {
        this.papelesTrabajo = papelesTrabajo;
    }
}