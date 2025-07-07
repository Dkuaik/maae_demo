package com.maae.app.service.impl;

import com.exception.ResourceNotFoundException;
import com.maae.app.dto.PapelTrabajoDTO;
import com.maae.app.model.Cgti;
import com.maae.app.model.PapelTrabajo;
import com.maae.app.repository.CgtiRepository;
import com.maae.app.repository.PapelTrabajoRepository;
import com.maae.app.service.inter.PapelTrabajoService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PapelTrabajoServiceImpl implements PapelTrabajoService {

    private final PapelTrabajoRepository repository;
    private final CgtiRepository cgtiRepository;

    public PapelTrabajoServiceImpl(PapelTrabajoRepository repository, CgtiRepository cgtiRepository) {
        this.repository = repository;
        this.cgtiRepository = cgtiRepository;
    }

    @Override
    public List<PapelTrabajoDTO> listarPorCgtiYAnio(String nombreCgti, Integer anio) {
        // Buscar CGTI con nombre y año específicos
        List<Cgti> cgtis = cgtiRepository.findByNombreAndAnio(nombreCgti, anio);
        // Obtener papeles de trabajo de cada CGTI encontrado
        List<PapelTrabajo> lista = cgtis.stream()
                .flatMap(cgti -> repository.findByCgti_Id(cgti.getId()).stream())
                .collect(Collectors.toList());
        return lista.stream()
                .map(p -> new PapelTrabajoDTO(p.getId(), p.getNombre(), p.getObjetivoControl()))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public PapelTrabajoDTO crearPapelTrabajo(PapelTrabajoDTO dto) {
        Cgti cgti = cgtiRepository.findById(dto.getCgtiId().longValue())
                .orElseThrow(() -> new ResourceNotFoundException("CGTI no encontrado"));

        PapelTrabajo papel = new PapelTrabajo();
        papel.setNombre(dto.getNombre());
        papel.setCgti(cgti);
        PapelTrabajo saved = repository.save(papel);

        return new PapelTrabajoDTO(saved.getId(), saved.getNombre(), saved.getCgti().getId());
    }

    @Override
    public PapelTrabajoDTO obtenerPorId(Integer id) {
        return repository.findById(id)
                .map(p -> new PapelTrabajoDTO(p.getId(), p.getNombre(), p.getCgti().getId()))
                .orElseThrow(() -> new ResourceNotFoundException("Papel de trabajo no encontrado"));
    }

    @Override
    @Transactional
    public PapelTrabajoDTO actualizarPapelTrabajo(Integer id, PapelTrabajoDTO dto) {
        PapelTrabajo papel = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Papel de trabajo no encontrado"));
        
        Cgti cgti = cgtiRepository.findById(dto.getCgtiId().longValue())
                .orElseThrow(() -> new ResourceNotFoundException("CGTI no encontrado"));

        papel.setNombre(dto.getNombre());
        papel.setCgti(cgti);
        PapelTrabajo updated = repository.save(papel);
        
        return new PapelTrabajoDTO(updated.getId(), updated.getNombre(), updated.getCgti().getId());
    }

    @Override
    @Transactional
    public void eliminarPapelTrabajo(Integer id) {
        PapelTrabajo papel = repository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Papel de trabajo no encontrado"));
        repository.delete(papel);
    }

    @Override
    public List<PapelTrabajoDTO> listarTodos() {
        return repository.findAll().stream()
                .map(p -> new PapelTrabajoDTO(p.getId(), p.getNombre(), p.getCgti().getId()))
                .collect(Collectors.toList());
    }
}