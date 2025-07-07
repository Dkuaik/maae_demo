package com.maae.app.controller;

import com.maae.app.dto.Formato3DTO;
import com.maae.app.service.inter.Formato3Service;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/papel-trabajo/{papelId}/formato3")
public class Formato3Controller {

    private final Formato3Service formato3Service;

    @Autowired
    public Formato3Controller(Formato3Service formato3Service) {
        this.formato3Service = formato3Service;
    }

    @GetMapping
    public ResponseEntity<Formato3DTO> obtenerFormato3(@PathVariable Integer papelId) {
        Formato3DTO formato3 = formato3Service.obtenerFormato3(papelId);
        return ResponseEntity.ok(formato3);
    }

    @PostMapping
    public  ResponseEntity<Formato3DTO> crearFormato3(
        @PathVariable Integer papelId,
        @Valid @RequestBody Formato3DTO formato3DTO) {
        // Validar periodoRevision si es necesario
        if (formato3DTO.getPeriodoRevision() == null || formato3DTO.getPeriodoRevision().isEmpty()) {
            throw new IllegalArgumentException("El periodo de revisión es requerido");
        }
        
        Formato3DTO nuevoFormato3 = formato3Service.crearFormato3(papelId, formato3DTO);
        return ResponseEntity.ok(nuevoFormato3);
    }

    @PutMapping
    public ResponseEntity<Formato3DTO> actualizarFormato3(
            @PathVariable Integer papelId,
            @RequestBody Formato3DTO formato3DTO) {
        Formato3DTO formato3Actualizado = formato3Service.actualizarFormato3(papelId, formato3DTO);
        return ResponseEntity.ok(formato3Actualizado);
    }

    @DeleteMapping
    public ResponseEntity<Void> eliminarFormato3(@PathVariable Integer papelId) {
        formato3Service.eliminarFormato3(papelId);
        return ResponseEntity.noContent().build();
    }
}