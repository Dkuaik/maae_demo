package com.maae.app.controller;

import com.maae.app.dto.MatrizDTO;
import com.maae.app.service.inter.MatrizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/matriz")
public class MatrizController {
    
    @Autowired
    private MatrizService matrizService;

    @PostMapping
    public ResponseEntity<MatrizDTO> create(@RequestBody MatrizDTO matrizDTO) {
        return ResponseEntity.ok(matrizService.create(matrizDTO));
    }

    @PutMapping("/{anio}/{nombre}")
    public ResponseEntity<MatrizDTO> update(
            @PathVariable Integer anio,
            @PathVariable String nombre,
            @RequestBody MatrizDTO matrizDTO) {
        return ResponseEntity.ok(matrizService.update(anio, nombre, matrizDTO));
    }

    @DeleteMapping("/{anio}/{nombre}")
    public ResponseEntity<Void> delete(
            @PathVariable Integer anio,
            @PathVariable String nombre) {
        matrizService.delete(anio, nombre);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{anio}/{nombre}")
    public ResponseEntity<MatrizDTO> findByAnioAndNombre(
            @PathVariable Integer anio,
            @PathVariable String nombre) {
        return ResponseEntity.ok(matrizService.findByAnioAndNombre(anio, nombre));
    }

    @GetMapping
    public ResponseEntity<List<MatrizDTO>> findAll() {
        return ResponseEntity.ok(matrizService.findAll());
    }
}
