package com.maae.app.service.impl;

import com.maae.app.dto.CgtiDTO;
import com.maae.app.dto.CgtiGroupDTO;
import com.maae.app.dto.CgtiAnioCreateDTO;
import com.maae.app.model.Cgti;
import com.maae.app.repository.CgtiRepository;
import com.maae.app.service.inter.CgtiService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CgtiServiceImpl implements CgtiService {

    private final CgtiRepository repository;

    public CgtiServiceImpl(CgtiRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<CgtiDTO> listarTodos() {
        List<Cgti> cgtis = repository.findAll();

        return cgtis.stream()
            .map(cgti -> new CgtiDTO(
                cgti.getId(),
                cgti.getNombre(),
                cgti.getDescripcion(),
                cgti.getLinkDocumentacion(),
                cgti.getAnio()
            ))
            .collect(Collectors.toList());
    }

    @Override
    public CgtiDTO obtenerPorId(Integer id) {
        Cgti cgti = repository.findById(id.longValue())
            .orElseThrow(() -> new RuntimeException("CGTI no encontrado"));
        return new CgtiDTO(
            cgti.getId(),
            cgti.getNombre(),
            cgti.getDescripcion(),
            cgti.getLinkDocumentacion(),
            cgti.getAnio()
        );
    }

    @Override
    public CgtiDTO crear(CgtiDTO dto) {
        Cgti cgti = new Cgti();
        cgti.setNombre(dto.getNombreCgti());
        cgti.setDescripcion(dto.getDescripcion());
        cgti.setLinkDocumentacion(dto.getLinkDocumentacion());
        cgti.setAnio(dto.getAnio());
        cgti = repository.save(cgti);
        return new CgtiDTO(
            cgti.getId(),
            cgti.getNombre(),
            cgti.getDescripcion(),
            cgti.getLinkDocumentacion(),
            cgti.getAnio()
        );
    }

    @Override
    public CgtiDTO actualizar(Integer id, CgtiDTO dto) {
        Cgti cgti = repository.findById(id.longValue())
            .orElseThrow(() -> new RuntimeException("CGTI no encontrado"));
        cgti.setNombre(dto.getNombreCgti());
        cgti.setDescripcion(dto.getDescripcion());
        cgti.setLinkDocumentacion(dto.getLinkDocumentacion());
        cgti.setAnio(dto.getAnio());
        cgti = repository.save(cgti);
        return new CgtiDTO(
            cgti.getId(),
            cgti.getNombre(),
            cgti.getDescripcion(),
            cgti.getLinkDocumentacion(),
            cgti.getAnio()
        );
    }

    @Override
    public void eliminar(Integer id) {
        repository.deleteById(id.longValue());
    }

    @Override
    public List<CgtiGroupDTO> listarAgrupadosPorNombre() {
        List<Cgti> todosCgtis = repository.findAll();
        
        Map<String, List<Integer>> agrupados = todosCgtis.stream()
            .filter(cgti -> cgti.getAnio() != null)
            .collect(Collectors.groupingBy(
                Cgti::getNombre,
                Collectors.mapping(Cgti::getAnio, Collectors.toList())
            ));
        
        return agrupados.entrySet().stream()
            .map(entry -> new CgtiGroupDTO(entry.getKey(), entry.getValue()))
            .collect(Collectors.toList());
    }

    @Override
    public CgtiDTO crearAnio(CgtiAnioCreateDTO dto) {
        Cgti cgti = new Cgti();
        cgti.setNombre(dto.getNombreCgti());
        cgti.setAnio(dto.getAnio());
        cgti.setDescripcion(dto.getDescripcion());
        cgti.setLinkDocumentacion(dto.getLinkDocumentacion());
        cgti = repository.save(cgti);
        return new CgtiDTO(
            cgti.getId(),
            cgti.getNombre(),
            cgti.getDescripcion(),
            cgti.getLinkDocumentacion(),
            cgti.getAnio()
        );
    }

    @Override
    public void eliminarAnio(String nombre, Integer anio) {
        repository.deleteByNombreAndAnio(nombre, anio);
    }
}