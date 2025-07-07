package com.maae.app.repository;

import com.maae.app.model.CampoComplementario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CampoComplementarioRepository extends JpaRepository<CampoComplementario, Integer> {
    List<CampoComplementario> findByEvidenciaId(Integer evidenciaId);
    void deleteByEvidenciaId(Integer evidenciaId);
}
