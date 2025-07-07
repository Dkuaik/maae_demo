package com.maae.app.service.inter;

import com.maae.app.dto.CgtiDTO;
import com.maae.app.dto.CgtiGroupDTO;
import com.maae.app.dto.CgtiAnioCreateDTO;
import java.util.List;

public interface CgtiService {
    List<CgtiDTO> listarTodos();
    CgtiDTO obtenerPorId(Integer id);
    CgtiDTO crear(CgtiDTO dto);
    CgtiDTO actualizar(Integer id, CgtiDTO dto);
    void eliminar(Integer id);
    
    // Nuevos métodos para manejo por años
    List<CgtiGroupDTO> listarAgrupadosPorNombre();
    CgtiDTO crearAnio(CgtiAnioCreateDTO dto);
    void eliminarAnio(String nombre, Integer anio);
}