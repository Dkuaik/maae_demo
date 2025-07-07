package com.maae.app.repository;

import com.maae.app.model.PapelTrabajo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PapelTrabajoRepository extends JpaRepository<PapelTrabajo, Integer> {

    Optional<PapelTrabajo> findByCgti_IdAndId(Integer cgtiId, Integer id);

    @Query("SELECT p FROM PapelTrabajo p JOIN FETCH p.cgti WHERE p.id = :papelId")
    Optional<PapelTrabajo> findByIdWithCgti(@Param("papelId") Integer papelId);

    // Elimina los métodos que hacían referencia a "anio" y "nombre"
    // Mantén sólo este para buscar por CGTI:
    List<PapelTrabajo> findByCgti_Id(Integer cgtiId);

    // Si necesitas buscar por la entidad completa:
    // List<PapelTrabajo> findByCgti(Cgti cgti);
}