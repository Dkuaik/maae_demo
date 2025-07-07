package com.maae.app.repository;

import com.maae.app.model.Evidencia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface EvidenciaRepository extends JpaRepository<Evidencia, Integer> {
    List<Evidencia> findByActividadControlId(Integer actividadControlId);
}