package com.maae.app.repository;

import com.maae.app.model.Cgti;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
public interface CgtiRepository extends JpaRepository<Cgti, Long> {
    List<Cgti> findByNombre(String nombre); 
    List<Cgti> findByNombreIgnoreCase(String nombre); 
    List<Cgti> findByNombreAndAnio(String nombre, Integer anio);
    
    @Transactional
    void deleteByNombreAndAnio(String nombre, Integer anio);
}