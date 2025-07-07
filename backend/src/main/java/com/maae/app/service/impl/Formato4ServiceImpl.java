package com.maae.app.service.impl;

import com.maae.app.dto.Formato4DTO;
import com.maae.app.model.PapelTrabajo;
import com.maae.app.model.ActividadControl;
import com.maae.app.repository.PapelTrabajoRepository;
import com.maae.app.repository.ActividadControlRepository;
import com.exception.ResourceNotFoundException;
import com.maae.app.service.inter.Formato4Service;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
// import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class Formato4ServiceImpl implements Formato4Service {

    private final PapelTrabajoRepository papelTrabajoRepository;
    private final ActividadControlRepository actividadControlRepository;

    public Formato4ServiceImpl(PapelTrabajoRepository papelTrabajoRepository, 
                             ActividadControlRepository actividadControlRepository) {
        this.papelTrabajoRepository = papelTrabajoRepository;
        this.actividadControlRepository = actividadControlRepository;
    }

    @Override
    public Formato4DTO obtenerFormato4(int papelTrabajoId) {
        PapelTrabajo papel = papelTrabajoRepository.findByIdWithCgti(papelTrabajoId)
            .orElseThrow(() -> new ResourceNotFoundException("Papel de trabajo no encontrado con ID: " + papelTrabajoId));

        Formato4DTO formato4DTO = new Formato4DTO();
        formato4DTO.setId(papel.getId()); 
        formato4DTO.setNombreCgti(papel.getCgti().getNombre());
        formato4DTO.setErrorTolerable(String.valueOf(papel.getErrorTolerable()));
        
        // Fetch activities for this papel trabajo
        List<ActividadControl> actividades = actividadControlRepository.findAllByPapelTrabajoId(papelTrabajoId);
        
        // Convert ActividadControl to ActividadControlDTO with all fields
        List<Formato4DTO.ActividadControlDTO> actividadesDTO = actividades.stream()
            .map(actividad -> {
                Formato4DTO.ActividadControlDTO dto = new Formato4DTO.ActividadControlDTO();
                dto.setId(actividad.getId());
                dto.setComentarios(actividad.getComentarios());
                dto.setDescripcion(actividad.getDescripcion());
                dto.setPapelTrabajoId(actividad.getPapelTrabajoId());
                dto.setPonderacion(actividad.getPonderacion());
                dto.setTipo(actividad.getTipo());
                dto.setEjecucion(actividad.getEjecucion());
                dto.setFrecuencia(actividad.getFrecuencia());
                dto.setAreaResponsable(actividad.getAreaResponsable());
                dto.setDescripcionUniverso(actividad.getDescripcionUniverso());
                dto.setDescripcionMuestra(actividad.getDescripcionMuestra());
                dto.setPorcentajeEfectividad(actividad.getPorcentajeEfectividad());
                dto.setEjecucion(actividad.getEjecucion());
                return dto;
            })
            .collect(Collectors.toList());
            
        formato4DTO.setActividadesControl(actividadesDTO);

        return formato4DTO;
    }

    @Override
    public Formato4DTO crearFormato4(int papelTrabajoId, Formato4DTO formato4DTO) {
        // Verificar que existe el papel de trabajo
        PapelTrabajo papel = papelTrabajoRepository.findByIdWithCgti(papelTrabajoId)
            .orElseThrow(() -> new ResourceNotFoundException("Papel de trabajo no encontrado con ID: " + papelTrabajoId));

        // Crear las actividades de control
        List<ActividadControl> nuevasActividades = formato4DTO.getActividadesControl().stream()
            .map(actividadDTO -> {
                ActividadControl actividad = new ActividadControl();
                actividad.setPapelTrabajoId(papelTrabajoId);
                actividad.setComentarios(actividadDTO.getComentarios());
                actividad.setDescripcion(actividadDTO.getDescripcion());
                actividad.setPonderacion(actividadDTO.getPonderacion());
                actividad.setTipo(actividadDTO.getTipo());
                actividad.setEjecucion(actividadDTO.getEjecucion());
                actividad.setFrecuencia(actividadDTO.getFrecuencia());
                actividad.setAreaResponsable(actividadDTO.getAreaResponsable());
                actividad.setDescripcionUniverso(actividadDTO.getDescripcionUniverso());
                actividad.setDescripcionMuestra(actividadDTO.getDescripcionMuestra());
                actividad.setPorcentajeEfectividad(actividadDTO.getPorcentajeEfectividad());
                actividad.setEjecucion(actividadDTO.getEjecucion());
                return actividadControlRepository.save(actividad);
            })
            .collect(Collectors.toList());

        // Crear el DTO de respuesta
        Formato4DTO respuestaDTO = new Formato4DTO();
        respuestaDTO.setId(papel.getId());
        respuestaDTO.setNombreCgti(papel.getCgti().getNombre());
        respuestaDTO.setErrorTolerable(String.valueOf(papel.getErrorTolerable()));
        
        // Convertir las actividades creadas a DTOs
        List<Formato4DTO.ActividadControlDTO> actividadesDTO = nuevasActividades.stream()
            .map(actividad -> {
                Formato4DTO.ActividadControlDTO dto = new Formato4DTO.ActividadControlDTO();
                dto.setId(actividad.getId());
                dto.setComentarios(actividad.getComentarios());
                dto.setDescripcion(actividad.getDescripcion());
                dto.setPapelTrabajoId(actividad.getPapelTrabajoId());
                dto.setPonderacion(actividad.getPonderacion());
                dto.setTipo(actividad.getTipo());
                dto.setEjecucion(actividad.getEjecucion());
                dto.setFrecuencia(actividad.getFrecuencia());
                dto.setAreaResponsable(actividad.getAreaResponsable());
                dto.setDescripcionUniverso(actividad.getDescripcionUniverso());
                dto.setDescripcionMuestra(actividad.getDescripcionMuestra());
                dto.setPorcentajeEfectividad(actividad.getPorcentajeEfectividad());
                dto.setEjecucion(actividad.getEjecucion());
                return dto;
            })
            .collect(Collectors.toList());
        
        respuestaDTO.setActividadesControl(actividadesDTO);
        return respuestaDTO;
    }

    @Override
@Transactional
public Formato4DTO actualizarFormato4(int papelId, Long formatoId, Formato4DTO formato4DTO) {
    // Verificar la existencia del papel de trabajo
    PapelTrabajo papel = papelTrabajoRepository.findByIdWithCgti(papelId)
            .orElseThrow(() -> new ResourceNotFoundException("Papel de trabajo no encontrado con ID: " + papelId));

    // Obtener la lista actual de IDs de actividades asociadas al papel
    List<Integer> idsActuales = actividadControlRepository.findAllByPapelTrabajoId(papelId)
            .stream().map(ActividadControl::getId)
            .collect(Collectors.toList());
    
    // Recoger los IDs enviados en el DTO
    List<Integer> idsEnviados = formato4DTO.getActividadesControl().stream()
            .filter(dto -> dto.getId() != null)
            .map(dto -> dto.getId())
            .collect(Collectors.toList());
            
    // Determinar cuáles deben eliminarse
    List<Integer> idsAEliminar = idsActuales.stream()
            .filter(id -> !idsEnviados.contains(id))
            .collect(Collectors.toList());
    
    if (!idsAEliminar.isEmpty()) {
        actividadControlRepository.deleteAllById(idsAEliminar);
    }

    // Procesar actividades: actualizar o crear según corresponda
    List<ActividadControl> actividadesActualizadas = formato4DTO.getActividadesControl().stream()
        .map(actividadDTO -> {
            ActividadControl actividad;
            if (actividadDTO.getId() != null) {
                actividad = actividadControlRepository.findById(actividadDTO.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Actividad de control no encontrada con ID: " + actividadDTO.getId()));
            } else {
                actividad = new ActividadControl();
            }
            
            actividad.setPapelTrabajoId(papelId);
            actividad.setComentarios(actividadDTO.getComentarios());
            actividad.setDescripcion(actividadDTO.getDescripcion());
            actividad.setPonderacion(actividadDTO.getPonderacion());
            actividad.setTipo(actividadDTO.getTipo());
            actividad.setEjecucion(actividadDTO.getEjecucion());
            actividad.setFrecuencia(actividadDTO.getFrecuencia());
            actividad.setAreaResponsable(actividadDTO.getAreaResponsable());
            actividad.setDescripcionUniverso(actividadDTO.getDescripcionUniverso());
            actividad.setDescripcionMuestra(actividadDTO.getDescripcionMuestra());
            actividad.setPorcentajeEfectividad(actividadDTO.getPorcentajeEfectividad());
            // Asegúrate de remover configuraciones con el campo duplicado "ejecucuion"
            return actividadControlRepository.save(actividad);
        })
        .collect(Collectors.toList());

    // Armar el DTO de respuesta
    Formato4DTO respuestaDTO = new Formato4DTO();
    respuestaDTO.setId(papel.getId());
    respuestaDTO.setNombreCgti(papel.getCgti().getNombre());
    respuestaDTO.setErrorTolerable(String.valueOf(papel.getErrorTolerable()));
    
    List<Formato4DTO.ActividadControlDTO> actividadesDTO = actividadesActualizadas.stream()
        .map(actividad -> {
            Formato4DTO.ActividadControlDTO dto = new Formato4DTO.ActividadControlDTO();
            dto.setId(actividad.getId());
            dto.setComentarios(actividad.getComentarios());
            dto.setDescripcion(actividad.getDescripcion());
            dto.setPapelTrabajoId(actividad.getPapelTrabajoId());
            dto.setPonderacion(actividad.getPonderacion());
            dto.setTipo(actividad.getTipo());
            dto.setEjecucion(actividad.getEjecucion());
            dto.setFrecuencia(actividad.getFrecuencia());
            dto.setAreaResponsable(actividad.getAreaResponsable());
            dto.setDescripcionUniverso(actividad.getDescripcionUniverso());
            dto.setDescripcionMuestra(actividad.getDescripcionMuestra());
            dto.setPorcentajeEfectividad(actividad.getPorcentajeEfectividad());
            return dto;
        })
        .collect(Collectors.toList());
    
    respuestaDTO.setActividadesControl(actividadesDTO);
    return respuestaDTO;
}

    @Override
    public void eliminarFormato4(int papelTrabajoId, Long formatoId) {
        // Verificar que existe el papel de trabajo
        papelTrabajoRepository.findByIdWithCgti(papelTrabajoId)
            .orElseThrow(() -> new ResourceNotFoundException("Papel de trabajo no encontrado con ID: " + papelTrabajoId));

        // Eliminar todas las actividades de control asociadas al papel de trabajo
        List<ActividadControl> actividades = actividadControlRepository.findAllByPapelTrabajoId(papelTrabajoId);
        actividadControlRepository.deleteAll(actividades);
    }
}