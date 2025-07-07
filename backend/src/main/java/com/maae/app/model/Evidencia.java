package com.maae.app.model;

import jakarta.persistence.*;

@Entity
@Table(name = "evidencias")
public class Evidencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "actividad_control_id")
    private ActividadControl actividadControl;

    @Column(name = "comentarios")
    private String comentarios;

    @Column(name = "resultado")
    private String resultado;

    // Getters y Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public ActividadControl getActividadControl() {
        return actividadControl;
    }

    public void setActividadControl(ActividadControl actividadControl) {
        this.actividadControl = actividadControl;
    }

    public String getComentarios() {
        return comentarios;
    }

    public void setComentarios(String comentarios) {
        this.comentarios = comentarios;
    }

    public String getResultado(){
        return resultado;
    }

    public void setResultado(String resultado){
        this.resultado = resultado;
    }
}
