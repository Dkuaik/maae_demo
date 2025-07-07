package com.maae.app.service.impl;

import com.maae.app.dto.Formato1DTO;
import com.exception.ResourceNotFoundException;
import com.maae.app.model.PapelTrabajo;
import com.maae.app.repository.PapelTrabajoRepository;
import com.maae.app.repository.CgtiRepository;
import com.maae.app.service.inter.Formato1Service;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class Formato1ServiceImpl implements Formato1Service {

    private final PapelTrabajoRepository papelTrabajoRepository;

    public Formato1ServiceImpl(PapelTrabajoRepository papelTrabajoRepository,
                             CgtiRepository cgtiRepository) {
        this.papelTrabajoRepository = papelTrabajoRepository;
        // this.cgtiRepository = cgtiRepository;
    }

    @Override
    public List<Formato1DTO> obtenerFormatos1(int papelTrabajoId) {
        PapelTrabajo papel = papelTrabajoRepository.findByIdWithCgti(papelTrabajoId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Papel de trabajo no encontrado con ID: " + papelTrabajoId));

        List<Formato1DTO> resultado = new ArrayList<>();
        resultado.add(new Formato1DTO(
                papel.getId().longValue(),
                papel.getCgti().getNombre(),
                papel.getErrorTolerable(),
                papel.getDescripcionMuestra(),
                papel.getDescripcionUniverso()
        ));

        return resultado;
    }

    @Override
    public Formato1DTO crearFormato1(int papelTrabajoId, Formato1DTO formato1DTO) {
        PapelTrabajo papel = papelTrabajoRepository.findByIdWithCgti(papelTrabajoId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Papel de trabajo no encontrado con ID: " + papelTrabajoId));

        papel.setErrorTolerable(formato1DTO.getErrorTolerable());
        papel.setDescripcionMuestra(formato1DTO.getDescripcionMuestra());
        papel.setDescripcionUniverso(formato1DTO.getDescripcionUniverso());

        PapelTrabajo updated = papelTrabajoRepository.save(papel);

        String nombreCgti = updated.getCgti().getNombre();

        return new Formato1DTO(
                updated.getId().longValue(),
                nombreCgti,
                updated.getErrorTolerable(),
                updated.getDescripcionMuestra(),
                updated.getDescripcionUniverso()
        );
    }

    @Override
    public Formato1DTO actualizarFormato1(int papelId, Long formatoId, Formato1DTO formato1DTO) {
        PapelTrabajo papel = papelTrabajoRepository.findByIdWithCgti(papelId)
                .orElseThrow(() -> new ResourceNotFoundException("Papel no encontrado: " + papelId));

        if (formatoId != papel.getId().longValue()) {
            throw new ResourceNotFoundException("Formato1 no encontrado");
        }

        papel.setErrorTolerable(formato1DTO.getErrorTolerable());
        papel.setDescripcionMuestra(formato1DTO.getDescripcionMuestra());
        papel.setDescripcionUniverso(formato1DTO.getDescripcionUniverso());

        PapelTrabajo updated = papelTrabajoRepository.save(papel);

        String nombreCgti = updated.getCgti().getNombre();

        return new Formato1DTO(
                updated.getId().longValue(),
                nombreCgti,
                updated.getErrorTolerable(),
                updated.getDescripcionMuestra(),
                updated.getDescripcionUniverso()
        );
    }

    @Override
    public void eliminarFormato1(int papelTrabajoId, Long formatoId) {
        PapelTrabajo papel = papelTrabajoRepository.findById(papelTrabajoId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Papel de trabajo no encontrado con ID: " + papelTrabajoId));

        if (formatoId != papel.getId().longValue()) {
            throw new ResourceNotFoundException("El Formato1 no pertenece al Papel de trabajo");
        }

        papel.setErrorTolerable(null);
        papel.setDescripcionMuestra(null);
        papel.setDescripcionUniverso(null);

        papelTrabajoRepository.save(papel);
    }
}