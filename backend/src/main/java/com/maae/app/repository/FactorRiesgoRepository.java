package com.maae.app.repository;

import com.maae.app.model.FactorRiesgo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FactorRiesgoRepository extends JpaRepository<FactorRiesgo, Integer> {
}
