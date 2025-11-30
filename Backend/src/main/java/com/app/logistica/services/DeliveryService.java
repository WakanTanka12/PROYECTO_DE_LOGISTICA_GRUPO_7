package com.app.logistica.services;

import com.app.logistica.dtos.delivery.DeliveryRequest;
import com.app.logistica.dtos.delivery.DeliveryResponse;

import java.util.List;

public interface DeliveryService {
    // 🔹 Listar todos los deliveries
    List<DeliveryResponse> listAll();

    // 🔹 Listar deliveries por conductor
    List<DeliveryResponse> listByDriver(Long driverId);

    // 🔹 Agregar delivery a un conductor
    DeliveryResponse addToDriver(Long driverId, DeliveryRequest dto);

    // 🔹 Obtener delivery por ID
    DeliveryResponse getById(Long deliveryId);

    // ===============================================================
// 🔹 Update delivery (by driver and delivery ID)
// ===============================================================
    DeliveryResponse update(Long deliveryId, DeliveryRequest dto);

    // 🔹 Eliminar delivery de un conductor
    void remove(Long deliveryId, Long driverId);

    // 🔹 Eliminar delivery por ID directo
    void deleteById(Long driverId);


}
