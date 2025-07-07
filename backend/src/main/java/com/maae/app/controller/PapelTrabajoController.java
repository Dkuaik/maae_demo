package com.maae.app.controller;

import com.maae.app.dto.PapelTrabajoDTO;
import com.maae.app.service.inter.PapelTrabajoService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cgti")
public class PapelTrabajoController {

    private final PapelTrabajoService service;

    public PapelTrabajoController(PapelTrabajoService service) {
        this.service = service;
    }

    @GetMapping("/{anio}/{nombre}/papel-trabajo")
    public ResponseEntity<List<PapelTrabajoDTO>> obtenerPapelesDeTrabajo(
            @PathVariable Integer anio,
            @PathVariable String nombre
    ) {
        List<PapelTrabajoDTO> lista = service.listarPorCgtiYAnio(nombre, anio);
        return ResponseEntity.ok(lista);
    }
    // Nuevos endpoints
    @PostMapping("/papel-trabajo")
    public ResponseEntity<PapelTrabajoDTO> crearPapelTrabajo(@RequestBody PapelTrabajoDTO dto) {
        if (dto.getNombre() == null || dto.getNombre().trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre del papel es requerido");
        }
        
        if (dto.getCgtiId() == null) {
            throw new IllegalArgumentException("El ID de CGTI es requerido");
        }
        
        PapelTrabajoDTO creado = service.crearPapelTrabajo(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @GetMapping("/papel-trabajo/{id}")
    public ResponseEntity<PapelTrabajoDTO> obtenerPorId(@PathVariable Integer id) {
        PapelTrabajoDTO dto = service.obtenerPorId(id);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/papel-trabajo/{id}")
    public ResponseEntity<PapelTrabajoDTO> actualizarPapelTrabajo(
            @PathVariable Integer id, 
            @RequestBody PapelTrabajoDTO dto) {
        PapelTrabajoDTO actualizado = service.actualizarPapelTrabajo(id, dto);
        return ResponseEntity.ok(actualizado);
    }

    @DeleteMapping("/papel-trabajo/{id}")
    public ResponseEntity<Void> eliminarPapelTrabajo(@PathVariable Integer id) {
        service.eliminarPapelTrabajo(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/papel-trabajo")
    public ResponseEntity<List<PapelTrabajoDTO>> listarTodos() {
        List<PapelTrabajoDTO> lista = service.listarTodos();
        return ResponseEntity.ok(lista);
    }
}
