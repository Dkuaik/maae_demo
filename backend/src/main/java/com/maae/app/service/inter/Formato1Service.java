package com.maae.app.service.inter;

import com.maae.app.dto.Formato1DTO;
import java.util.List;

public interface Formato1Service {
    List<Formato1DTO> obtenerFormatos1(int papelTrabajoId);
    Formato1DTO crearFormato1(int papelTrabajoId, Formato1DTO formato1DTO);
    Formato1DTO actualizarFormato1(int papelTrabajoId, Long formatoId, Formato1DTO formato1DTO);
    void eliminarFormato1(int papelTrabajoId, Long formatoId);
}