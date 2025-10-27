package com.app.logistica.services;


import com.app.logistica.dtos.RouteDTO;
import java.util.List;

public interface RouteService {

    RouteDTO createRoute(RouteDTO dto);

    RouteDTO updateRoute(Long id, RouteDTO dto);

    RouteDTO getRoute(Long id);

    List<RouteDTO> getAllRoutes();

    String deleteRoute(Long id);
}

