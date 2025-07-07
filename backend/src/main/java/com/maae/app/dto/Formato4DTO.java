package com.maae.app.dto;

import java.util.List;

public class Formato4DTO {
    private int id;
    private String nombreCgti;  // Corresponde a Cgti.nombre
    private String errorTolerable;  // Nuevo campo
    private List<ActividadControlDTO> actividadesControl;  // Lista de actividades de control

    // Constructor vacío
    public Formato4DTO() {}

    // Getters and Setters
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }

    public String getNombreCgti() {
        return nombreCgti;
    }
    public void setNombreCgti(String nombreCgti) {
        this.nombreCgti = nombreCgti;
    }

    public String getErrorTolerable() {
        return errorTolerable;
    }
    public void setErrorTolerable(String errorTolerable) {
        this.errorTolerable = errorTolerable;
    }

    public List<ActividadControlDTO> getActividadesControl() {
        return actividadesControl;
    }
    public void setActividadesControl(List<ActividadControlDTO> actividadesControl) {
        this.actividadesControl = actividadesControl;
    }

    // Clase anidada para representar cada actividad de control
    public static class ActividadControlDTO {
        private Integer id;
        private String comentarios;
        private String descripcion;
        private Integer papelTrabajoId;
        private Double ponderacion;
        private String tipo;
        private String ejecucion;   // Se conserva solo este campo y se elimina "ejecucuion"
        private String frecuencia;
        private String areaResponsable;
        private String descripcionUniverso;
        private String descripcionMuestra;
        private Double porcentajeEfectividad;

        // Constructor vacío
        public ActividadControlDTO() {}

        // Getters and Setters
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
    }
}
