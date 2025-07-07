// ------------------------------
// src/main/java/com/maae/app/service/impl/Formato2ServiceImpl.java
// ------------------------------
package com.maae.app.service.impl;

import com.maae.app.dto.Formato2DTO;
import com.maae.app.dto.FactorDTO;
import com.maae.app.model.PapelTrabajo;
import com.maae.app.model.Norma;
import com.maae.app.model.TipoFactor;
import com.maae.app.repository.PapelTrabajoRepository;
import com.maae.app.repository.NormaRepository;
import com.maae.app.repository.TipoFactorRepository;
import com.maae.app.service.inter.Formato2Service;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class Formato2ServiceImpl implements Formato2Service {

    private final PapelTrabajoRepository papelRepo;
    private final NormaRepository normaRepo;
    private final TipoFactorRepository tipoRepo;

    public Formato2ServiceImpl(PapelTrabajoRepository papelRepo,
                               NormaRepository normaRepo,
                               TipoFactorRepository tipoRepo) {
        this.papelRepo = papelRepo;
        this.normaRepo = normaRepo;
        this.tipoRepo = tipoRepo;
    }

    // --- Formato2 principal ---

    @Override
    public Formato2DTO obtenerFormato2(Integer papelId) {
        PapelTrabajo papel = papelRepo.findByIdWithCgti(papelId)
            .orElseThrow(() -> new RuntimeException("Papel de trabajo no encontrado"));
        String nombreCgti = papel.getCgti().getNombre();
        Norma norma = normaRepo.findById(papel.getNormaId())
            .orElseThrow(() -> new RuntimeException("Norma no encontrada"));
        String nombreNorma = norma.getNombre();

        List<FactorDTO> factores = tipoRepo.findAll().stream()
            .map(tf -> new FactorDTO(
                tf.getId(),
                tf.getDescripcion(),
                tf.getPonderacion() * 100,
                tf.getResultado()
            ))
            .collect(Collectors.toList());

        return new Formato2DTO(nombreCgti, nombreNorma, factores);
    }

    @Override
    public Formato2DTO crearFormato2(Integer papelId, Formato2DTO dto) {
        // Lógica de creación si fuera necesario… (p.ej. actualizar norma, etc.)
        return obtenerFormato2(papelId);
    }

    @Override
    public Formato2DTO actualizarFormato2(Integer papelId, Formato2DTO dto) {
        // P.ej. actualizar nombreNorma en la entidad Norma
        Norma norma = normaRepo.findById(papelRepo.findById(papelId)
                .orElseThrow(() -> new RuntimeException("Papel no existe"))
                .getNormaId())
            .orElseThrow(() -> new RuntimeException("Norma no encontrada"));
        norma.setNombre(dto.getNombreNorma());
        normaRepo.save(norma);
        return obtenerFormato2(papelId);
    }

    @Override
    public void eliminarFormato2(Integer papelId) {
        // Si quisieras borrar la relación o entidad, aquí iría
        // Por defecto no borramos papeles.
    }

    // --- CRUD Factores (tipos_factor) ---

    @Override
    public List<FactorDTO> listarFactores(Integer papelId) {
        // ignoramos papelId aquí, devolvemos todos para el Formato2
        return tipoRepo.findAll().stream()
            .map(tf -> new FactorDTO(
                tf.getId(),
                tf.getDescripcion(),
                tf.getPonderacion() * 100,
                tf.getResultado()
            ))
            .collect(Collectors.toList());
    }

    @Override
    public FactorDTO crearFactor(Integer papelId, FactorDTO dto) {
        TipoFactor tf = new TipoFactor();
        tf.setDescripcion(dto.getTipoFactor());
        tf.setPonderacion(dto.getPonderacion() / 100);
        tf.setResultado(dto.getResultado());
        TipoFactor saved = tipoRepo.save(tf);
        return new FactorDTO(
            saved.getId(),
            saved.getDescripcion(),
            saved.getPonderacion() * 100,
            saved.getResultado()
        );
    }

    @Override
    public FactorDTO actualizarFactor(Integer papelId, Integer factorId, FactorDTO dto) {
        TipoFactor tf = tipoRepo.findById(factorId)
            .orElseThrow(() -> new RuntimeException("Factor no encontrado"));
        tf.setDescripcion(dto.getTipoFactor());
        tf.setPonderacion(dto.getPonderacion() / 100);
        tf.setResultado(dto.getResultado());
        TipoFactor updated = tipoRepo.save(tf);
        return new FactorDTO(
            updated.getId(),
            updated.getDescripcion(),
            updated.getPonderacion() * 100,
            updated.getResultado()
        );
    }

    @Override
    public void eliminarFactor(Integer papelId, Integer factorId) {
        tipoRepo.deleteById(factorId);
    }
}
