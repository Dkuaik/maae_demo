package com.maae.app.controller;

import com.maae.app.dto.Formato1DTO;
import com.exception.ResourceNotFoundException;
import com.maae.app.service.inter.Formato1Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/papel-trabajo/{papelId}/formato1")
public class Formato1Controller {

    private final Formato1Service formato1Service;

    public Formato1Controller(Formato1Service formato1Service) {
        this.formato1Service = formato1Service;
    }

    @GetMapping
    public ResponseEntity<List<Formato1DTO>> getFormatos1(@PathVariable int papelId) {
        List<Formato1DTO> formato = formato1Service.obtenerFormatos1(papelId);
        return ResponseEntity.ok(formato);
    }

    @PostMapping
    public ResponseEntity<Formato1DTO> createFormato1(
            @PathVariable int papelId,
            @RequestBody Formato1DTO formato1DTO) {
        Formato1DTO created = formato1Service.crearFormato1(papelId, formato1DTO);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/{formatoId}")
    public ResponseEntity<?> updateFormato1(
            @PathVariable int papelId,
            @PathVariable Long formatoId,
            @RequestBody Formato1DTO formato1DTO) {
        try {
            Formato1DTO updated = formato1Service.actualizarFormato1(papelId, formatoId, formato1DTO);
            return ResponseEntity.ok(updated);
        } catch (ResourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error interno");
        }
    }

    @DeleteMapping("/{formatoId}")
    public ResponseEntity<Void> deleteFormato1(
            @PathVariable int papelId,
            @PathVariable Long formatoId) {
        formato1Service.eliminarFormato1(papelId, formatoId);
        return ResponseEntity.noContent().build();
    }
}