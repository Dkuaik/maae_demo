package com.maae.app.repository;

import com.maae.app.model.ActividadControl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ActividadControlRepository extends JpaRepository<ActividadControl, Integer> {
    List<ActividadControl> findAllByPapelTrabajoId(Integer papelTrabajoId);
    void deleteByPapelTrabajoId(Integer papelTrabajoId);
    List<ActividadControl> findByRiesgoId(Integer riesgoId);
}
