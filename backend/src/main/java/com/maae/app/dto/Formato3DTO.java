package com.maae.app.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class Formato3DTO {
    @JsonProperty("nombre_cgti")
    private String nombreCgti;
    private String periodoRevision;
    @JsonProperty("actividadesControl")
    private List<ActividadControlDTO> actividadesControl;

    // Getters y Setters para Formato3DTO
    public String getNombreCgti() {
        return nombreCgti;
    }

    public void setNombreCgti(String nombreCgti) {
        this.nombreCgti = nombreCgti;
    }

    public String getPeriodoRevision() {
        return periodoRevision;
    }

    public void setPeriodoRevision(String periodoRevision) {
        this.periodoRevision = periodoRevision;
    }

    public List<ActividadControlDTO> getActividadesControl() {
        return actividadesControl;
    }

    public void setActividadesControl(List<ActividadControlDTO> actividadesControl) {
        this.actividadesControl = actividadesControl;
    }

    // --- Clases anidadas ---

    public static class ActividadControlDTO {
        private Integer id; // ID de la actividad en la BD
        private String nombre;
        private List<EvidenciaDTO> evidencias;

        // Getters y Setters para ActividadControlDTO
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

        public List<EvidenciaDTO> getEvidencias() {
            return evidencias;
        }

        public void setEvidencias(List<EvidenciaDTO> evidencias) {
            this.evidencias = evidencias;
        }
    }

    public static class EvidenciaDTO {
        private Integer id; // ID de la evidencia en la BD
        private String resultado;
        private String comentarios;
        @JsonProperty("campos_complementarios")
        private List<CampoComplementarioDTO> camposComplementarios;

        // Getters y Setters para EvidenciaDTO
        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public String getResultado() {
            return resultado;
        }

        public void setResultado(String resultado) {
            this.resultado = resultado;
        }

        public String getComentarios() {
            return comentarios;
        }

        public void setComentarios(String comentarios) {
            this.comentarios = comentarios;
        }

        public List<CampoComplementarioDTO> getCamposComplementarios() {
            return camposComplementarios;
        }

        public void setCamposComplementarios(List<CampoComplementarioDTO> camposComplementarios) {
            this.camposComplementarios = camposComplementarios;
        }
    }

    public static class CampoComplementarioDTO {
        private Integer id; // <--- ¡CAMBIO AQUÍ! AÑADIDO EL ID DEL CAMPO COMPLEMENTARIO
        @JsonProperty("nombre_campo")
        private String nombreCampo;
        private String contenido;

        // Getters y Setters para CampoComplementarioDTO
        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public String getNombreCampo() {
            return nombreCampo;
        }

        public void setNombreCampo(String nombreCampo) {
            this.nombreCampo = nombreCampo;
        }

        public String getContenido() {
            return contenido;
        }

        public void setContenido(String contenido) {
            this.contenido = contenido;
        }
    }
}