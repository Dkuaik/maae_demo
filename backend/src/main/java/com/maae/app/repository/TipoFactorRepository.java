package com.maae.app.repository;

import com.maae.app.model.TipoFactor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoFactorRepository extends JpaRepository<TipoFactor, Integer> {
    
}
