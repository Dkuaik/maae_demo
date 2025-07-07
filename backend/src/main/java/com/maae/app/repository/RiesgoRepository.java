package com.maae.app.repository;

import com.maae.app.model.Riesgo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RiesgoRepository extends JpaRepository<Riesgo, Integer> {
    @Query("SELECT r FROM Riesgo r WHERE r.papelTrabajo.id = :papelTrabajoId")
    List<Riesgo> findByPapelTrabajoId(@Param("papelTrabajoId") Integer papelTrabajoId);
}
