package com.maae.app.service.inter;

import com.maae.app.dto.Formato3DTO;

public interface Formato3Service {
    Formato3DTO obtenerFormato3(Integer papelId);
    Formato3DTO crearFormato3(Integer papelId, Formato3DTO formato3DTO);
    Formato3DTO actualizarFormato3(Integer papelId, Formato3DTO formato3DTO);
    void eliminarFormato3(Integer papelId);
}