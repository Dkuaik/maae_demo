package com.maae.app.controller;

import com.maae.app.dto.Formato2DTO;
import com.maae.app.dto.FactorDTO;
import com.maae.app.service.inter.Formato2Service;

import jakarta.validation.Valid;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api")
public class Formato2Controller {

    private final Formato2Service formato2Service;

    public Formato2Controller(Formato2Service formato2Service) {
        this.formato2Service = formato2Service;
    }
    
    // --- Formato2 CRUD ---

    @GetMapping("/papel-trabajo/{papelId}/formato2")
    public ResponseEntity<Formato2DTO> obtenerFormato2(@PathVariable Integer papelId) {
        return ResponseEntity.ok(formato2Service.obtenerFormato2(papelId));
    }

    @PostMapping("/papel-trabajo/{papelId}/formato2")
    public ResponseEntity<Formato2DTO> crearFormato2(
            @PathVariable Integer papelId,
            @Valid @RequestBody Formato2DTO dto) {
        Formato2DTO creado = formato2Service.crearFormato2(papelId, dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @PutMapping("/papel-trabajo/{papelId}/formato2")
    public ResponseEntity<Formato2DTO> actualizarFormato2(
            @PathVariable Integer papelId,
            @Valid @RequestBody Formato2DTO dto) {
        return ResponseEntity.ok(formato2Service.actualizarFormato2(papelId, dto));
    }

    @DeleteMapping("/papel-trabajo/{papelId}/formato2")
    public ResponseEntity<Void> eliminarFormato2(@PathVariable Integer papelId) {
        formato2Service.eliminarFormato2(papelId);
        return ResponseEntity.noContent().build();
    }

    // --- Factores CRUD ---

    @GetMapping("/papel-trabajo/{papelId}/formato2/factores")
    public ResponseEntity<List<FactorDTO>> listarFactores(@PathVariable Integer papelId) {
        return ResponseEntity.ok(formato2Service.listarFactores(papelId));
    }

    @PostMapping("/papel-trabajo/{papelId}/formato2/factores")
    public ResponseEntity<FactorDTO> crearFactor(
            @PathVariable Integer papelId,
            @Valid @RequestBody FactorDTO dto) {
        FactorDTO creado = formato2Service.crearFactor(papelId, dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @PutMapping("/papel-trabajo/{papelId}/formato2/factores/{factorId}")
    public ResponseEntity<FactorDTO> actualizarFactor(
            @PathVariable Integer papelId,
            @PathVariable Integer factorId,
            @Valid @RequestBody FactorDTO dto) {
        return ResponseEntity.ok(formato2Service.actualizarFactor(papelId, factorId, dto));
    }

    @DeleteMapping("/papel-trabajo/{papelId}/formato2/factores/{factorId}")
    public ResponseEntity<Void> eliminarFactor(
            @PathVariable Integer papelId,
            @PathVariable Integer factorId) {
        formato2Service.eliminarFactor(papelId, factorId);
        return ResponseEntity.noContent().build();
    }
}
