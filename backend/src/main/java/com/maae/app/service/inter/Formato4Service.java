package com.maae.app.service.inter;

import com.maae.app.dto.Formato4DTO;
import java.util.List;

public interface Formato4Service {
    Formato4DTO obtenerFormato4(int papelTrabajoId);
    Formato4DTO crearFormato4(int papelTrabajoId, Formato4DTO formato4DTO);
    Formato4DTO actualizarFormato4(int papelId, Long formatoId, Formato4DTO formato4DTO);
    void eliminarFormato4(int papelTrabajoId, Long formatoId);
}