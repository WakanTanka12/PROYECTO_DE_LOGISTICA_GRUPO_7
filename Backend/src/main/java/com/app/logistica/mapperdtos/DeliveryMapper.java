package com.app.logistica.mapperdtos;


import com.app.logistica.dtos.delivery.DeliveryRequest;
import com.app.logistica.dtos.delivery.DeliveryResponse;
import com.app.logistica.entities.Delivery;
import com.app.logistica.repositories.OrderRepository;
import com.app.logistica.repositories.DriverRepository;
import com.app.logistica.repositories.RouteRepository;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;


@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface DeliveryMapper {
    @Mapping(source = "order.id", target = "orderId")
    @Mapping(source = "driver.id", target = "driverId")
    @Mapping(source = "router.id", target = "routerId")
    default DeliveryResponse toResponse(Delivery entity) {
        if (entity == null) return null;
        DeliveryResponse response = new DeliveryResponse();
        response.setId(entity.getId());
        response.setDeliveryDate(entity.getDeliveryDate());
        response.setStatus(entity.getStatus());

        return response;
    }
       default Delivery toEntity(DeliveryRequest request) {
           if (request == null) return null;

           return Delivery.builder()
                   .deliveryDate(request.getDeliveryDate())
                   .status(request.getStatus())
                   .build();
       }


}
