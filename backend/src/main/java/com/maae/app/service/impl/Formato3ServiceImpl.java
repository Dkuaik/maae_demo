package com.maae.app.service.impl;

import com.maae.app.dto.Formato3DTO;
import com.maae.app.model.*;
import com.maae.app.repository.*;
import com.maae.app.service.inter.Formato3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class Formato3ServiceImpl implements Formato3Service {

    private final PapelTrabajoRepository papelTrabajoRepository;
    private final ActividadControlRepository actividadControlRepository;
    private final EvidenciaRepository evidenciaRepository;
    private final CampoComplementarioRepository campoComplementarioRepository;

    @Autowired
    public Formato3ServiceImpl(
            PapelTrabajoRepository papelTrabajoRepository,
            ActividadControlRepository actividadControlRepository,
            EvidenciaRepository evidenciaRepository,
            CampoComplementarioRepository campoComplementarioRepository) {
        this.papelTrabajoRepository = papelTrabajoRepository;
        this.actividadControlRepository = actividadControlRepository;
        this.evidenciaRepository = evidenciaRepository;
        this.campoComplementarioRepository = campoComplementarioRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public Formato3DTO obtenerFormato3(Integer papelId) {
        PapelTrabajo papelTrabajo = papelTrabajoRepository.findById(papelId)
                .orElseThrow(() -> new RuntimeException("PapelTrabajo no encontrado con ID: " + papelId));

        List<ActividadControl> actividadesControl = actividadControlRepository.findAllByPapelTrabajoId(papelId);

        return mapToFormato3DTO(papelTrabajo, actividadesControl);
    }

    @Override
    @Transactional
    public Formato3DTO crearFormato3(Integer papelId, Formato3DTO formato3DTO) {
        PapelTrabajo papelTrabajo = papelTrabajoRepository.findById(papelId)
                .orElseThrow(() -> new RuntimeException("PapelTrabajo no encontrado con ID: " + papelId));

        List<ActividadControl> actividadesControl = formato3DTO.getActividadesControl().stream()
                .map(actividadDTO -> {
                    ActividadControl actividad = new ActividadControl();
                    actividad.setDescripcion(actividadDTO.getNombre());
                    actividad.setPapelTrabajoId(papelId);
                    ActividadControl actividadGuardada = actividadControlRepository.save(actividad);

                    actividadDTO.getEvidencias().forEach(evidenciaDTO -> {
                        Evidencia evidencia = new Evidencia();
                        evidencia.setResultado(evidenciaDTO.getResultado());
                        evidencia.setComentarios(evidenciaDTO.getComentarios());
                        evidencia.setActividadControl(actividadGuardada);
                        Evidencia evidenciaGuardada = evidenciaRepository.save(evidencia);

                        evidenciaDTO.getCamposComplementarios().forEach(campoDTO -> {
                            CampoComplementario campo = new CampoComplementario();
                            campo.setNombreCampo(campoDTO.getNombreCampo());
                            campo.setContenidoCc(campoDTO.getContenido());
                            campo.setEvidencia(evidenciaGuardada);
                            campoComplementarioRepository.save(campo);
                        });
                    });

                    return actividadGuardada;
                })
                .collect(Collectors.toList());

        return mapToFormato3DTO(papelTrabajo, actividadesControl);
    }

    @Override
    @Transactional
    public Formato3DTO actualizarFormato3(Integer papelId, Formato3DTO formato3DTO) {
        // Primero eliminamos todo lo existente
        eliminarFormato3(papelId);
        
        // Luego creamos todo como nuevo
        return crearFormato3(papelId, formato3DTO);
    }

    @Override
    @Transactional
    public void eliminarFormato3(Integer papelId) {
        List<ActividadControl> actividades = actividadControlRepository.findAllByPapelTrabajoId(papelId);
        
        actividades.forEach(actividad -> {
            List<Evidencia> evidencias = evidenciaRepository.findByActividadControlId(actividad.getId());
            
            evidencias.forEach(evidencia -> {
                campoComplementarioRepository.deleteByEvidenciaId(evidencia.getId());
                evidenciaRepository.delete(evidencia);
            });
            
            actividadControlRepository.delete(actividad);
        });
    }

    private Formato3DTO mapToFormato3DTO(PapelTrabajo papelTrabajo, List<ActividadControl> actividadesControl) {
        Formato3DTO dto = new Formato3DTO();
        dto.setNombreCgti(papelTrabajo.getCgti().getNombre());
        dto.setPeriodoRevision(papelTrabajo.getPeriodoRevision());

        List<Formato3DTO.ActividadControlDTO> actividadesDTO = actividadesControl.stream()
                .map(actividad -> {
                    Formato3DTO.ActividadControlDTO actividadDTO = new Formato3DTO.ActividadControlDTO();
                    actividadDTO.setId(actividad.getId());
                    actividadDTO.setNombre(actividad.getDescripcion());

                    List<Evidencia> evidencias = evidenciaRepository.findByActividadControlId(actividad.getId());

                    List<Formato3DTO.EvidenciaDTO> evidenciasDTO = evidencias.stream()
                            .map(evidencia -> {
                                Formato3DTO.EvidenciaDTO evidenciaDTO = new Formato3DTO.EvidenciaDTO();
                                evidenciaDTO.setId(evidencia.getId());
                                evidenciaDTO.setResultado(evidencia.getResultado());
                                evidenciaDTO.setComentarios(evidencia.getComentarios());

                                List<CampoComplementario> campos = campoComplementarioRepository.findByEvidenciaId(evidencia.getId());
                                evidenciaDTO.setCamposComplementarios(
                                    campos.stream().map(campo -> {
                                        Formato3DTO.CampoComplementarioDTO campoDTO = new Formato3DTO.CampoComplementarioDTO();
                                        campoDTO.setNombreCampo(campo.getNombreCampo());
                                        campoDTO.setContenido(campo.getContenidoCc());
                                        return campoDTO;
                                    }).collect(Collectors.toList())
                                );

                                return evidenciaDTO;
                            })
                            .collect(Collectors.toList());

                    actividadDTO.setEvidencias(evidenciasDTO);
                    return actividadDTO;
                })
                .collect(Collectors.toList());

        dto.setActividadesControl(actividadesDTO);
        return dto;
    }

    private String convertirPeriodoRevision(Integer periodo) {
        if (periodo == null) return "No especificado";
        return periodo == 1 ? "enero-septiembre" : "octubre-diciembre";
    }
}