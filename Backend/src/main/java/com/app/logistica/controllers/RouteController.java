package com.app.logistica.controllers;

import com.app.logistica.dtos.route.RouteRequest;
import com.app.logistica.dtos.route.RouteResponse;
import com.app.logistica.exceptions.ResourceNotFoundException;
import com.app.logistica.services.RouteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/routes")
public class RouteController {

    private final RouteService routeService;

    // 🔹 Crear nueva ruta
    @PostMapping
    public ResponseEntity<RouteResponse> createRoute(@RequestBody RouteRequest dto) {
        RouteResponse created = routeService.createRoute(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    // 🔹 Obtener todas las rutas
    @GetMapping
    public ResponseEntity<List<RouteResponse>> getAllRoutes() {
        List<RouteResponse> routes = routeService.getAllRoutes();
        return ResponseEntity.ok(routes);
    }

    // 🔹 Obtener ruta por ID
    @GetMapping("/{id}")
    public ResponseEntity<RouteResponse> getRoute(@PathVariable Long id) {
        RouteResponse route = routeService.getRoute(id);
        return ResponseEntity.ok(route);
    }

    // 🔹 Actualizar ruta existente
    @PutMapping("/{id}")
    public ResponseEntity<RouteResponse> updateRoute(
            @PathVariable Long id,
            @RequestBody RouteRequest dto
    ) {
        RouteResponse updated = routeService.updateRoute(id, dto);
        return ResponseEntity.ok(updated);
    }

    // 🔹 Eliminar ruta
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRoute(@PathVariable Long id) {
        String message = routeService.deleteRoute(id);
        return ResponseEntity.ok(message);
    }

    // ⚠️ Manejo de excepciones
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleNotFound(ResourceNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
}
