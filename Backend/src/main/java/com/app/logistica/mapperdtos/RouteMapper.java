package com.app.logistica.mapperdtos;

import com.app.logistica.dtos.DeliveryDTO;
import com.app.logistica.dtos.RouteDTO;
import com.app.logistica.entities.Route;
import com.app.logistica.mapperdtos.DeliveryMapper;

import java.util.stream.Collectors;

public class RouteMapper {

    public static RouteDTO toDTO(Route route) {
        if (route == null) return null;

        RouteDTO dto = new RouteDTO();
        dto.setId(route.getId());
        dto.setRouteName(route.getRouteName());
        dto.setOrigin(route.getOrigin());
        dto.setDestination(route.getDestination());
        dto.setDistance(route.getDistance());
        dto.setEstimatedDuration(route.getEstimatedDuration());

        if (route.getDeliveries() != null) {
            dto.setDeliveries(route.getDeliveries()
                    .stream()
                    .map(DeliveryMapper::toDTO)
                    .collect(Collectors.toList()));
        }

        return dto;
    }

    public static Route toEntity(RouteDTO dto) {
        if (dto == null) return null;

        Route route = new Route();
        route.setId(dto.getId());
        route.setRouteName(dto.getRouteName());
        route.setOrigin(dto.getOrigin());
        route.setDestination(dto.getDestination());
        route.setDistance(dto.getDistance());
        route.setEstimatedDuration(dto.getEstimatedDuration());
        return route;
    }
}
