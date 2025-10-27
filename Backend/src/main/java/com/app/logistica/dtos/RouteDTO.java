package com.app.logistica.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.Duration;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class RouteDTO {
    private Long id;
    private String routeName;
    private String origin;
    private String destination;
    private BigDecimal distance;
    private Duration estimatedDuration;

    private List<DeliveryDTO> deliveries;

    public RouteDTO(Long id, String routeName, String origin, String destination, BigDecimal distance, Duration estimatedDuration) {
    }
}
