package com.maae.app.service.inter;

import com.maae.app.dto.PapelTrabajoDTO;
import java.util.List;

public interface PapelTrabajoService {
    List<PapelTrabajoDTO> listarPorCgtiYAnio(String nombreCgti, Integer anio);
    PapelTrabajoDTO crearPapelTrabajo(PapelTrabajoDTO dto);
    PapelTrabajoDTO obtenerPorId(Integer id);
    PapelTrabajoDTO actualizarPapelTrabajo(Integer id, PapelTrabajoDTO dto);
    void eliminarPapelTrabajo(Integer id);
    List<PapelTrabajoDTO> listarTodos();
}
