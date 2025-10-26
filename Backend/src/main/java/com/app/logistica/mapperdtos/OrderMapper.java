package com.app.logistica.mapperdtos;

import com.app.logistica.dtos.OrderDTO;
import com.app.logistica.entities.Customer;
import com.app.logistica.entities.Order;

public class OrderMapper {
    public static OrderDTO mapOrderToOrderDTO(Order order) {
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setId(order.getId());
        orderDTO.setOrderDate(order.getOrderDate());
        orderDTO.setPrice(order.getPrice());
        orderDTO.setDetails(order.getDetails());
        orderDTO.setCustomerId(order.getCustomer().getId());
        return orderDTO;
    }
    public static Order mapOrderDTOtoOrder(OrderDTO orderDTO) {
        Customer customer = new Customer();
        customer.setId(orderDTO.getCustomerId());

        Order order = new Order();
        order.setId(orderDTO.getId());
        order.setOrderDate(orderDTO.getOrderDate());
        order.setPrice(orderDTO.getPrice());
        order.setDetails(orderDTO.getDetails());
        order.setCustomer(customer);
        return order;
    }
}
