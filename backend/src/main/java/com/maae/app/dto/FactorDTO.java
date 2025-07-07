package com.maae.app.dto;

public class FactorDTO {
    private Integer id;
    private String tipoFactor;
    private Double ponderacion;
    private Double resultado;

    public FactorDTO() { }

    public FactorDTO(Integer id, String tipoFactor, Double ponderacion, Double resultado) {
        this.id = id;
        this.tipoFactor = tipoFactor;
        this.ponderacion = ponderacion;
        this.resultado = resultado;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getTipoFactor() { return tipoFactor; }
    public void setTipoFactor(String tipoFactor) { this.tipoFactor = tipoFactor; }

    public Double getPonderacion() { return ponderacion; }
    public void setPonderacion(Double ponderacion) { this.ponderacion = ponderacion; }

    public Double getResultado() { return resultado; }
    public void setResultado(Double resultado) { this.resultado = resultado; }
}
