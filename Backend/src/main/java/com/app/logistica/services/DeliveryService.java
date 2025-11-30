package com.app.logistica.services;

import com.app.logistica.dtos.delivery.DeliveryRequest;
import com.app.logistica.dtos.delivery.DeliveryResponse; // ✅ Importante

import java.util.List;

public interface DeliveryService {

    // ✅ Todos retornan DeliveryResponse
    List<DeliveryResponse> listAll();

    List<DeliveryResponse> listByDriver(Long driverId);

    DeliveryResponse addToDriver(Long driverId, DeliveryRequest dto);

    DeliveryResponse getById(Long deliveryId);

    DeliveryResponse update(Long deliveryId, DeliveryRequest dto);

    void remove(Long deliveryId, Long driverId); // Para borrar desde la vista del chofer

    void deleteById(Long deliveryId); // Para borrar directo por ID
}