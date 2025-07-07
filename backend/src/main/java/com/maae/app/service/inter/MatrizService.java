package com.maae.app.service.inter;

import com.maae.app.dto.MatrizDTO;
import java.util.List;

public interface MatrizService {
    MatrizDTO findByAnioAndNombre(Integer anio, String nombre);
    MatrizDTO create(MatrizDTO matrizDTO);
    MatrizDTO update(Integer anio, String nombre, MatrizDTO matrizDTO);
    void delete(Integer anio, String nombre);
    List<MatrizDTO> findAll();
}
