package com.maae.app.dto;

import java.util.List;

public class CgtiGroupDTO {
    private String nombreCgti;
    private List<Integer> aniosDisponibles;

    public CgtiGroupDTO() {}

    public CgtiGroupDTO(String nombreCgti, List<Integer> aniosDisponibles) {
        this.nombreCgti = nombreCgti;
        this.aniosDisponibles = aniosDisponibles;
    }

    public String getNombreCgti() {
        return nombreCgti;
    }

    public void setNombreCgti(String nombreCgti) {
        this.nombreCgti = nombreCgti;
    }

    public List<Integer> getAniosDisponibles() {
        return aniosDisponibles;
    }

    public void setAniosDisponibles(List<Integer> aniosDisponibles) {
        this.aniosDisponibles = aniosDisponibles;
    }
}
