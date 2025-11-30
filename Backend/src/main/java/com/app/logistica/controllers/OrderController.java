package com.app.logistica.controllers;

import com.app.logistica.dtos.order.OrderRequest;
import com.app.logistica.dtos.order.OrderResponse;
import com.app.logistica.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class OrderController {

    private final OrderService orderService;

    // =========================================================
    // 🔹 LISTAR TODAS LAS ÓRDENES
    // =========================================================
    @GetMapping("/orders")
    public ResponseEntity<List<OrderResponse>> listAll() {
        List<OrderResponse> list = orderService.listByCustomer(null); // o orderService.listAll()
        return ResponseEntity.ok(list);
    }

    // =========================================================
    // 🔹 LISTAR ÓRDENES POR CUSTOMER
    // =========================================================
    @GetMapping("/customers/{customerId}/orders")
    public ResponseEntity<List<OrderResponse>> listByCustomer(@PathVariable Long customerId) {
        List<OrderResponse> list = orderService.listByCustomer(customerId);
        return ResponseEntity.ok(list);
    }

    // =========================================================
    // 🔹 OBTENER UNA ORDEN POR ID
    // =========================================================
    @GetMapping("/orders/{orderId}")
    public ResponseEntity<OrderResponse> getById(@PathVariable Long orderId) {
        OrderResponse order = orderService.getById(orderId);
        return ResponseEntity.ok(order);
    }

    // =========================================================
    // 🔹 CREAR UNA NUEVA ORDEN
    // =========================================================
    @PostMapping("/orders")
    public ResponseEntity<OrderResponse> createOrder(@RequestBody OrderRequest orderRequest) {
        if (orderRequest.getCustomerId() == null) {
            return ResponseEntity.badRequest().build();
        }
        OrderResponse created = orderService.createOrder(orderRequest.getCustomerId(), orderRequest);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    // =========================================================
    // 🔹 ACTUALIZAR UNA ORDEN EXISTENTE
    // =========================================================
    @PutMapping("/orders/{orderId}")
    public ResponseEntity<OrderResponse> updateOrder(
            @PathVariable Long orderId,
            @RequestBody OrderRequest orderRequest
    ) {
        if (orderRequest.getCustomerId() == null) {
            return ResponseEntity.badRequest().build();
        }
        OrderResponse updated = orderService.update(orderId, orderRequest);
        return ResponseEntity.ok(updated);
    }

    // =========================================================
    // 🔹 ELIMINAR UNA ORDEN
    // =========================================================
    @DeleteMapping("/orders/{orderId}")
    public ResponseEntity<String> deleteOrder(
            @PathVariable Long orderId,
            @RequestParam(required = false) Long customerId
    ) {
        // 👈 aquí estaba al revés en tu código
        if (customerId != null) {
            // borrar asegurando que la orden pertenece a ese customer
            orderService.remove(customerId, orderId);
        } else {
            // borrar solo por id
            orderService.deleteById(orderId);
        }
        return ResponseEntity.ok("Order deleted successfully");
    }
}
