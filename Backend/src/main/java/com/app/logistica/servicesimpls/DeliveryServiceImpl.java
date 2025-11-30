package com.app.logistica.servicesimpls;

import com.app.logistica.dtos.delivery.DeliveryRequest;
import com.app.logistica.dtos.delivery.DeliveryResponse;
import com.app.logistica.entities.Delivery;
import com.app.logistica.entities.Driver;
import com.app.logistica.entities.Order;
import com.app.logistica.entities.Route;
import com.app.logistica.exceptions.ResourceNotFoundException;
import com.app.logistica.mapperdtos.DeliveryMapper;
import com.app.logistica.repositories.DeliveryRepository;
import com.app.logistica.repositories.DriverRepository;
import com.app.logistica.repositories.OrderRepository;
import com.app.logistica.repositories.RouteRepository;
import com.app.logistica.services.DeliveryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class DeliveryServiceImpl implements DeliveryService {

    private final DeliveryRepository deliveryRepository;
    private final DriverRepository driverRepository;
    private final OrderRepository orderRepository;
    private final RouteRepository routeRepository;

    // ✅ Inyección del Mapper (clave para que funcione @Mapper(componentModel = "spring"))
    private final DeliveryMapper deliveryMapper;

    @Override
    @Transactional(readOnly = true)
    public List<DeliveryResponse> listAll() {
        return deliveryRepository.findAll()
                .stream()
                .map(deliveryMapper::toResponse) // ✅ Usa la instancia inyectada
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<DeliveryResponse> listByDriver(Long driverId) {
        if (driverId == null) return listAll();

        // Verificar que el chofer exista
        if (!driverRepository.existsById(driverId)) {
            throw new ResourceNotFoundException("Driver not found with id: " + driverId);
        }

        return deliveryRepository.findByDriverId(driverId)
                .stream()
                .map(deliveryMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public DeliveryResponse addToDriver(Long driverId, DeliveryRequest dto) {
        // 1. Obtener Entidades Relacionadas
        Driver driver = driverRepository.findById(driverId)
                .orElseThrow(() -> new ResourceNotFoundException("Driver not found with id: " + driverId));

        Order order = orderRepository.findById(dto.getOrderId())
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id: " + dto.getOrderId()));

        Route route = null;
        if (dto.getRouteId() != null) {
            route = routeRepository.findById(dto.getRouteId())
                    .orElseThrow(() -> new ResourceNotFoundException("Route not found with id: " + dto.getRouteId()));
        }

        // 2. Crear la entidad base desde el DTO
        Delivery delivery = deliveryMapper.toEntity(dto);

        // 3. Asignar relaciones manualmente (ya que el mapper es una interfaz simple)
        delivery.setDriver(driver);
        delivery.setOrder(order);
        delivery.setRoute(route);

        // 4. Guardar y responder
        Delivery saved = deliveryRepository.save(delivery);
        return deliveryMapper.toResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public DeliveryResponse getById(Long deliveryId) {
        Delivery delivery = deliveryRepository.findById(deliveryId)
                .orElseThrow(() -> new ResourceNotFoundException("Delivery not found with id: " + deliveryId));
        return deliveryMapper.toResponse(delivery);
    }

    @Override
    public DeliveryResponse update(Long deliveryId, DeliveryRequest dto) {
        // 1. Buscar la entrega existente
        Delivery delivery = deliveryRepository.findById(deliveryId)
                .orElseThrow(() -> new ResourceNotFoundException("Delivery not found with id: " + deliveryId));

        // 2. Actualizar campos simples
        delivery.setDeliveryDate(dto.getDeliveryDate());
        delivery.setStatus(dto.getStatus());

        // 3. Actualizar Driver si cambió
        if (dto.getDriverId() != null) {
            if (delivery.getDriver() == null || !dto.getDriverId().equals(delivery.getDriver().getId())) {
                Driver driver = driverRepository.findById(dto.getDriverId())
                        .orElseThrow(() -> new ResourceNotFoundException("Driver not found: " + dto.getDriverId()));
                delivery.setDriver(driver);
            }
        } else {
            delivery.setDriver(null); // Desasignar si viene nulo
        }

        // 4. Actualizar Route si cambió
        if (dto.getRouteId() != null) {
            if (delivery.getRoute() == null || !dto.getRouteId().equals(delivery.getRoute().getId())) {
                Route route = routeRepository.findById(dto.getRouteId())
                        .orElseThrow(() -> new ResourceNotFoundException("Route not found: " + dto.getRouteId()));
                delivery.setRoute(route);
            }
        } else {
            delivery.setRoute(null);
        }

        // 5. Guardar cambios
        Delivery updated = deliveryRepository.save(delivery);
        return deliveryMapper.toResponse(updated);
    }

    @Override
    public void remove(Long deliveryId, Long driverId) {
        Delivery delivery = deliveryRepository.findById(deliveryId)
                .orElseThrow(() -> new ResourceNotFoundException("Delivery not found with id: " + deliveryId));

        // Validar que pertenezca al chofer
        if (delivery.getDriver() != null && !delivery.getDriver().getId().equals(driverId)) {
            throw new IllegalArgumentException("La entrega no pertenece a este conductor.");
        }

        // Romper relaciones antes de borrar para evitar errores de integridad
        if (delivery.getOrder() != null) {
            delivery.getOrder().setDelivery(null);
        }

        deliveryRepository.delete(delivery);
    }

    @Override
    public void deleteById(Long deliveryId) {
        Delivery delivery = deliveryRepository.findById(deliveryId)
                .orElseThrow(() -> new ResourceNotFoundException("Delivery not found with id: " + deliveryId));

        if (delivery.getOrder() != null) {
            delivery.getOrder().setDelivery(null);
        }

        deliveryRepository.delete(delivery);
    }
}