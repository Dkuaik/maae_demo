package com.maae.app.dto;

import java.util.List;

public class MatrizDTO {
    private Integer cgti_id;
    private String cgti_nombre;
    private Integer cgti_anio;
    private String link_documentacion;
    private List<PapelTrabajo> papeles_trabajo;

    // Getters and Setters
    public Integer getCgti_id() {
        return cgti_id;
    }

    public void setCgti_id(Integer cgti_id) {
        this.cgti_id = cgti_id;
    }

    public String getCgti_nombre() {
        return cgti_nombre;
    }

    public void setCgti_nombre(String cgti_nombre) {
        this.cgti_nombre = cgti_nombre;
    }

    public Integer getCgti_anio() {
        return cgti_anio;
    }

    public void setCgti_anio(Integer cgti_anio) {
        this.cgti_anio = cgti_anio;
    }

    public String getLink_documentacion() {
        return link_documentacion;
    }

    public void setLink_documentacion(String link_documentacion) {
        this.link_documentacion = link_documentacion;
    }

    public List<PapelTrabajo> getPapeles_trabajo() {
        return papeles_trabajo;
    }

    public void setPapeles_trabajo(List<PapelTrabajo> papeles_trabajo) {
        this.papeles_trabajo = papeles_trabajo;
    }

    // Nested class for PapelTrabajo
    public static class PapelTrabajo {
        private Integer id;
        private String title;
        private String description;
        private String objetivo_control;
        private String resultado_diseño;
        private String Efectividad_operativa;
        private String promedio_efectividad;
        private List<Riesgo> riesgos;

        // Getters and Setters
        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public String getObjetivo_control() {
            return objetivo_control;
        }

        public void setObjetivo_control(String objetivo_control) {
            this.objetivo_control = objetivo_control;
        }

        public String getResultado_diseño() {
            return resultado_diseño;
        }

        public void setResultado_diseño(String resultado_diseño) {
            this.resultado_diseño = resultado_diseño;
        }

        public String getEfectividad_operativa() {
            return Efectividad_operativa;
        }

        public void setEfectividad_operativa(String efectividad_operativa) {
            this.Efectividad_operativa = efectividad_operativa;
        }

        public String getPromedio_efectividad() {
            return promedio_efectividad;
        }

        public void setPromedio_efectividad(String promedio_efectividad) {
            this.promedio_efectividad = promedio_efectividad;
        }

        public List<Riesgo> getRiesgos() {
            return riesgos;
        }

        public void setRiesgos(List<Riesgo> riesgos) {
            this.riesgos = riesgos;
        }
    }

    // Nested class for Riesgo
    public static class Riesgo {
        private Integer id;
        private String factores;
        private String riesgos;
        private String impacto;
        private String probabilidad;
        private String tratamiento_riesgo;
        private List<ActividadControl> actividades_control;
        private String respuesta_riesgo;
        private String area_responsable;

        // Getters and Setters
        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public String getFactores() {
            return factores;
        }

        public void setFactores(String factores) {
            this.factores = factores;
        }

        public String getRiesgos() {
            return riesgos;
        }

        public void setRiesgos(String riesgos) {
            this.riesgos = riesgos;
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

        public String getTratamiento_riesgo() {
            return tratamiento_riesgo;
        }

        public void setTratamiento_riesgo(String tratamiento_riesgo) {
            this.tratamiento_riesgo = tratamiento_riesgo;
        }

        public List<ActividadControl> getActividades_control() {
            return actividades_control;
        }

        public void setActividades_control(List<ActividadControl> actividades_control) {
            this.actividades_control = actividades_control;
        }

        public String getRespuesta_riesgo() {
            return respuesta_riesgo;
        }

        public void setRespuesta_riesgo(String respuesta_riesgo) {
            this.respuesta_riesgo = respuesta_riesgo;
        }

        public String getArea_responsable() {
            return area_responsable;
        }

        public void setArea_responsable(String area_responsable) {
            this.area_responsable = area_responsable;
        }
    }

    // Nested class for ActividadControl
    public static class ActividadControl {
        private Integer id;
        private String descripcion_actividad_control;
        private String tipo_control;
        private String ejecucion_control;
        private String frecuencia_control;

        // Getters and Setters
        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public String getDescripcion_actividad_control() {
            return descripcion_actividad_control;
        }

        public void setDescripcion_actividad_control(String descripcion_actividad_control) {
            this.descripcion_actividad_control = descripcion_actividad_control;
        }

        public String getTipo_control() {
            return tipo_control;
        }

        public void setTipo_control(String tipo_control) {
            this.tipo_control = tipo_control;
        }

        public String getEjecucion_control() {
            return ejecucion_control;
        }

        public void setEjecucion_control(String ejecucion_control) {
            this.ejecucion_control = ejecucion_control;
        }

        public String getFrecuencia_control() {
            return frecuencia_control;
        }

        public void setFrecuencia_control(String frecuencia_control) {
            this.frecuencia_control = frecuencia_control;
        }
    }
}