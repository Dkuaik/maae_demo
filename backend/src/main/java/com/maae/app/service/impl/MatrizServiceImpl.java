package com.maae.app.service.impl;

import com.maae.app.dto.MatrizDTO;
import com.maae.app.service.inter.MatrizService;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import com.maae.app.repository.*;
import com.maae.app.model.*;

@Service
public class MatrizServiceImpl implements MatrizService {

    @Autowired
    private PapelTrabajoRepository papelTrabajoRepository;

    @Autowired
    private ActividadControlRepository actividadControlRepository;

    @Autowired
    private RiesgoRepository riesgoRepository;

    @Autowired
    private FactorRiesgoRepository factorRiesgoRepository;

    @Autowired
    private CgtiRepository cgtiRepository;

    @Override
    public MatrizDTO findByAnioAndNombre(Integer anio, String nombre) {
        List<Cgti> posibles = cgtiRepository.findByNombreAndAnio(nombre, anio);
        Cgti cgti = posibles.stream()
                .findFirst()
                .orElseThrow(() -> new RuntimeException("CGTI no encontrado"));

        List<PapelTrabajo> papelesTrabajo = papelTrabajoRepository.findByCgti_Id(cgti.getId());
        return convertToDTO(cgti, papelesTrabajo, anio);
    }

    @Override
    public MatrizDTO create(MatrizDTO matrizDTO) {
        List<Cgti> posibles = cgtiRepository.findByNombreAndAnio(matrizDTO.getCgti_nombre(), matrizDTO.getCgti_anio());
        Cgti cgti = posibles.stream()
                .findFirst()
                .orElse(null);

        if (cgti == null) {
            cgti = new Cgti();
            cgti.setNombre(matrizDTO.getCgti_nombre());
            cgti.setDescripcion(matrizDTO.getLink_documentacion());
            cgti.setAnio(matrizDTO.getCgti_anio());
            cgti = cgtiRepository.save(cgti);
        }

        // Usar bucles for tradicionales para evitar problemas de variables en lambdas anidadas
        if (matrizDTO.getPapeles_trabajo() != null) {
            for (MatrizDTO.PapelTrabajo papelTrabajo : matrizDTO.getPapeles_trabajo()) {
                PapelTrabajo papelTrabajoEntity = convertPapelTrabajoToEntity(papelTrabajo);
                papelTrabajoEntity.setCgti(cgti);
                PapelTrabajo savedPapelTrabajo = papelTrabajoRepository.save(papelTrabajoEntity);

                if (papelTrabajo.getRiesgos() != null) {
                    for (MatrizDTO.Riesgo riesgo : papelTrabajo.getRiesgos()) {
                        Riesgo riesgoEntity = convertRiesgoToEntity(riesgo);
                        riesgoEntity.setPapelTrabajo(savedPapelTrabajo);

                        if (riesgo.getFactores() != null) {
                            FactorRiesgo factorRiesgo = convertFactorRiesgoToEntity(riesgo.getFactores());
                            factorRiesgo.setTratamiento(riesgo.getTratamiento_riesgo());
                            factorRiesgo.setRespuesta(riesgo.getRespuesta_riesgo());
                            factorRiesgo.setAreaResponsable(riesgo.getArea_responsable());

                            Riesgo savedRiesgo = riesgoRepository.save(riesgoEntity);
                            factorRiesgo.setRiesgo(savedRiesgo);
                            savedRiesgo.setFactorRiesgo(factorRiesgo);
                            factorRiesgoRepository.save(factorRiesgo);
                            riesgoRepository.save(savedRiesgo);
                        } else {
                            riesgoRepository.save(riesgoEntity);
                        }

                        if (riesgo.getActividades_control() != null) {
                            List<ActividadControl> actividadesControl = new ArrayList<>();

                            if (riesgo.getActividades_control() instanceof List) {
                                List<MatrizDTO.ActividadControl> actividadesList =
                                        (List<MatrizDTO.ActividadControl>) riesgo.getActividades_control();
                                for (MatrizDTO.ActividadControl actividadControlDTO : actividadesList) {
                                    ActividadControl actividadControl = convertActividadControlToEntity(actividadControlDTO);
                                    actividadControl.setRiesgo(riesgoEntity);
                                    actividadesControl.add(actividadControlRepository.save(actividadControl));
                                }
                            } else if (riesgo.getActividades_control() instanceof MatrizDTO.ActividadControl) {
                                ActividadControl actividadControl = convertActividadControlToEntity(
                                        (MatrizDTO.ActividadControl) riesgo.getActividades_control());
                                actividadControl.setRiesgo(riesgoEntity);
                                actividadesControl.add(actividadControlRepository.save(actividadControl));
                            }

                            riesgoEntity.setActividadesControl(actividadesControl);
                            riesgoRepository.save(riesgoEntity);
                        }
                    }
                }
            }
        }

        return findByAnioAndNombre(matrizDTO.getCgti_anio(), matrizDTO.getCgti_nombre());
    }

    @Override
    public MatrizDTO update(Integer anio, String nombre, MatrizDTO matrizDTO) {
        delete(anio, nombre);
        matrizDTO.setCgti_anio(anio);
        matrizDTO.setCgti_nombre(nombre);
        return create(matrizDTO);
    }

    @Override
    public void delete(Integer anio, String nombre) {
        cgtiRepository.deleteByNombreAndAnio(nombre, anio);
    }

    @Override
    public List<MatrizDTO> findAll() {
        List<MatrizDTO> matrices = new ArrayList<>();
        List<Cgti> cgtis = cgtiRepository.findAll();

        for (Cgti cgti : cgtis) {
            List<PapelTrabajo> papelesTrabajo = papelTrabajoRepository.findByCgti_Id(cgti.getId());
            matrices.add(convertToDTO(cgti, papelesTrabajo, cgti.getAnio()));
        }

        return matrices;
    }

    private MatrizDTO convertToDTO(Cgti cgti, List<PapelTrabajo> papelesTrabajo, Integer anio) {
        MatrizDTO matrizDTO = new MatrizDTO();
        matrizDTO.setCgti_id(cgti.getId());
        matrizDTO.setCgti_nombre(cgti.getNombre());
        matrizDTO.setCgti_anio(anio);
        matrizDTO.setLink_documentacion(cgti.getLinkDocumentacion());

        List<MatrizDTO.PapelTrabajo> papelesDTOs = papelesTrabajo.stream()
                .map(this::convertPapelTrabajoToDTO)
                .collect(Collectors.toList());
        matrizDTO.setPapeles_trabajo(papelesDTOs);
        return matrizDTO;
    }

    private MatrizDTO.PapelTrabajo convertPapelTrabajoToDTO(PapelTrabajo entity) {
        MatrizDTO.PapelTrabajo dto = new MatrizDTO.PapelTrabajo();
        dto.setId(entity.getId());
        dto.setTitle(entity.getNombre());
        dto.setObjetivo_control(entity.getObjetivoControl());
        if (entity.getPorcentajeEfectividad() != null) {
            dto.setPromedio_efectividad(String.valueOf(entity.getPorcentajeEfectividad()));
        }

        if (entity.getRiesgos() != null) {
            List<MatrizDTO.Riesgo> riesgosDTO = entity.getRiesgos().stream()
                    .map(this::convertRiesgoToDTO)
                    .collect(Collectors.toList());
            dto.setRiesgos(riesgosDTO);
        }

        return dto;
    }

    private MatrizDTO.Riesgo convertRiesgoToDTO(Riesgo entity) {
        MatrizDTO.Riesgo dto = new MatrizDTO.Riesgo();
        dto.setId(entity.getId());
        dto.setImpacto(entity.getImpacto());
        dto.setProbabilidad(entity.getProbabilidad());

        List<ActividadControl> actividades = entity.getActividadesControl();
        if (actividades != null && !actividades.isEmpty()) {
            List<MatrizDTO.ActividadControl> actividadesDTO = actividades.stream()
                    .map(this::convertActividadControlToDTO)
                    .collect(Collectors.toList());
            dto.setActividades_control(actividadesDTO);
        }

        FactorRiesgo factorRiesgo = entity.getFactorRiesgo();
        if (factorRiesgo != null) {
            dto.setFactores(factorRiesgo.getTratamiento());
            dto.setTratamiento_riesgo(factorRiesgo.getTratamiento());
            dto.setRespuesta_riesgo(factorRiesgo.getRespuesta());
            dto.setArea_responsable(factorRiesgo.getAreaResponsable());
        }

        return dto;
    }

    private MatrizDTO.ActividadControl convertActividadControlToDTO(ActividadControl entity) {
        MatrizDTO.ActividadControl dto = new MatrizDTO.ActividadControl();
        dto.setId(entity.getId());
        dto.setDescripcion_actividad_control(entity.getDescripcion());
        dto.setTipo_control(entity.getTipo());
        dto.setEjecucion_control(entity.getEjecucion());
        dto.setFrecuencia_control(entity.getFrecuencia());
        return dto;
    }

    private PapelTrabajo convertPapelTrabajoToEntity(MatrizDTO.PapelTrabajo dto) {
        PapelTrabajo entity = new PapelTrabajo();
        entity.setNombre(dto.getTitle());
        entity.setObjetivoControl(dto.getObjetivo_control());
        if (dto.getPromedio_efectividad() != null) {
            entity.setPorcentajeEfectividad(Double.parseDouble(dto.getPromedio_efectividad()));
        }
        return entity;
    }

    private ActividadControl convertActividadControlToEntity(MatrizDTO.ActividadControl dto) {
        ActividadControl entity = new ActividadControl();
        entity.setDescripcion(dto.getDescripcion_actividad_control());
        entity.setTipo(dto.getTipo_control());
        entity.setEjecucion(dto.getEjecucion_control());
        entity.setFrecuencia(dto.getFrecuencia_control());
        return entity;
    }

    private FactorRiesgo convertFactorRiesgoToEntity(String factores) {
        FactorRiesgo entity = new FactorRiesgo();
        entity.setTratamiento(factores);
        return entity;
    }

    private Riesgo convertRiesgoToEntity(MatrizDTO.Riesgo dto) {
        Riesgo entity = new Riesgo();
        entity.setId(dto.getId());
        entity.setImpacto(dto.getImpacto());
        entity.setProbabilidad(dto.getProbabilidad());
        return entity;
    }
}