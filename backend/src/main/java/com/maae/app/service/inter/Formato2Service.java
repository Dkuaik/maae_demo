// ------------------------------
// src/main/java/com/maae/app/service/inter/Formato2Service.java
// ------------------------------
package com.maae.app.service.inter;

import com.maae.app.dto.Formato2DTO;
import com.maae.app.dto.FactorDTO;

import java.util.List;

public interface Formato2Service {
    // Formato2 principal
    Formato2DTO obtenerFormato2(Integer papelId);
    Formato2DTO crearFormato2(Integer papelId, Formato2DTO dto);
    Formato2DTO actualizarFormato2(Integer papelId, Formato2DTO dto);
    void eliminarFormato2(Integer papelId);

    // CRUD de factores (tipos_factor)
    List<FactorDTO> listarFactores(Integer papelId);
    FactorDTO crearFactor(Integer papelId, FactorDTO dto);
    FactorDTO actualizarFactor(Integer papelId, Integer factorId, FactorDTO dto);
    void eliminarFactor(Integer papelId, Integer factorId);
}
