package com.maae.app.controller;

import com.maae.app.dto.CgtiDTO;
import com.maae.app.dto.CgtiGroupDTO;
import com.maae.app.dto.CgtiAnioCreateDTO;
import com.maae.app.service.inter.CgtiService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cgti")
public class CgtiController {

    private final CgtiService cgtiService;

    public CgtiController(CgtiService cgtiService) {
        this.cgtiService = cgtiService;
    }

    @GetMapping
    public List<CgtiDTO> obtenerTodos() {
        return cgtiService.listarTodos();
    }

    @GetMapping("/{id}")
    public CgtiDTO obtenerPorId(@PathVariable Integer id) {
        return cgtiService.obtenerPorId(id);
    }

    @PostMapping
    public CgtiDTO crear(@RequestBody CgtiDTO dto) {
        return cgtiService.crear(dto);
    }

    @PutMapping("/{id}")
    public CgtiDTO actualizar(@PathVariable Integer id, @RequestBody CgtiDTO dto) {
        return cgtiService.actualizar(id, dto);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        cgtiService.eliminar(id);
    }

    @GetMapping("/agrupados")
    public List<CgtiGroupDTO> obtenerAgrupadosPorNombre() {
        return cgtiService.listarAgrupadosPorNombre();
    }

    @PostMapping("/anio")
    public CgtiDTO crearAnio(@RequestBody CgtiAnioCreateDTO dto) {
        return cgtiService.crearAnio(dto);
    }

    @DeleteMapping("/anio")
    public void eliminarAnio(@RequestParam String nombre, @RequestParam Integer anio) {
        cgtiService.eliminarAnio(nombre, anio);
    }
}
