package com.maae.app.controller;

import org.springframework.web.bind.annotation.*;
import com.maae.app.dto.Formato4DTO;
import com.maae.app.service.inter.Formato4Service;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Autowired;



@RestController
@RequestMapping("/api/papel-trabajo/{papelId}/formato4")
public class Formato4Controller {


    @Autowired
    private Formato4Service formato4Service;

    @GetMapping
    public ResponseEntity<Formato4DTO> obtenerFormato4(@PathVariable int papelId) {
        Formato4DTO formato = formato4Service.obtenerFormato4(papelId);
        return ResponseEntity.ok(formato);
    }

    @PostMapping
    public ResponseEntity<Formato4DTO> crearFormato4(@PathVariable int papelId, @RequestBody Formato4DTO formato4DTO) {
        Formato4DTO creado = formato4Service.crearFormato4(papelId, formato4DTO);
        return ResponseEntity.ok(creado);
    }

    @PutMapping("/{formatoId}")
    public ResponseEntity<Formato4DTO> actualizarFormato4(@PathVariable int papelId, @PathVariable Long formatoId, @RequestBody Formato4DTO formato4DTO) {
        Formato4DTO actualizado = formato4Service.actualizarFormato4(papelId, formatoId, formato4DTO);
        return ResponseEntity.ok(actualizado);
    }

    @DeleteMapping("/{formatoId}")
    public ResponseEntity<Void> eliminarFormato4(@PathVariable int papelId, @PathVariable Long formatoId) {
        formato4Service.eliminarFormato4(papelId, formatoId);
        return ResponseEntity.noContent().build();
    }
}