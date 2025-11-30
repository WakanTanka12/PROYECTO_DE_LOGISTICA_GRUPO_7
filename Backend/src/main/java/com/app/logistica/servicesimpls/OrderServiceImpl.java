package com.app.logistica.servicesimpls;

import com.app.logistica.dtos.order.OrderRequest;
import com.app.logistica.dtos.order.OrderResponse;
import com.app.logistica.entities.Customer;
import com.app.logistica.entities.Order;
import com.app.logistica.exceptions.ResourceNotFoundException;
import com.app.logistica.mapperdtos.OrderMapper;
import com.app.logistica.repositories.CustomerRepository;
import com.app.logistica.repositories.OrderRepository;
import com.app.logistica.services.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final OrderMapper orderMapper;   // 👈 INYECTAMOS EL MAPPER

    @Override
    public List<OrderResponse> listAll() {
        return orderRepository.findAllWithCustomer()
                .stream()
                .map(orderMapper::toResponse)   // 👈 instancia, no estático
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderResponse> listByCustomer(Long customerId) {
        if (customerId == null) {
            return listAll();
        }
        verifyCustomer(customerId);

        return orderRepository.findByCustomerId(customerId)
                .stream()
                .map(orderMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public OrderResponse createOrder(Long customerId, OrderRequest orderRequest) {
        // 1️⃣ Verificar que el cliente exista
        Customer customer = verifyCustomer(customerId);

        // 2️⃣ Mapear Request -> Entity usando el mapper de instancia
        Order order = orderMapper.toEntity(orderRequest);

        // 3️⃣ Asociar el customer
        order.setCustomer(customer);

        // 4️⃣ Guardar
        Order saved = orderRepository.save(order);

        // 5️⃣ Devolver Response
        return orderMapper.toResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public OrderResponse getById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order not found with id: " + orderId));

        return orderMapper.toResponse(order);
    }

    @Override
    public OrderResponse update(Long orderId, OrderRequest orderRequest) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order not found with id: " + orderId));

        // Usas el helper del mapper para actualizar
        orderMapper.updateEntityFromRequest(orderRequest, order);

        // Verificar si se cambió el customerId (si quieres una lógica extra allí)
        if (orderRequest.getCustomerId() != null &&
                (order.getCustomer() == null ||
                        !orderRequest.getCustomerId().equals(order.getCustomer().getId()))) {

            Customer c = customerRepository.findById(orderRequest.getCustomerId())
                    .orElseThrow(() ->
                            new ResourceNotFoundException("Customer not found with id: " + orderRequest.getCustomerId()));
            order.setCustomer(c);
        }

        Order updated = orderRepository.save(order);
        return orderMapper.toResponse(updated);
    }

    @Override
    public void remove(Long customerId, Long orderId) {
        Customer customer = verifyCustomer(customerId);

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order not found with id: " + orderId));

        if (!order.getCustomer().getId().equals(customer.getId())) {
            throw new IllegalArgumentException("Customer id does not match this order");
        }

        orderRepository.delete(order);
    }

    @Override
    public void deleteById(Long orderId) {
        if (!orderRepository.existsById(orderId)) {
            throw new IllegalArgumentException("Order not found with id: " + orderId);
        }
        orderRepository.deleteById(orderId);
    }

    private Customer verifyCustomer(Long customerId) {
        return customerRepository.findById(customerId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer no encontrado con id=" + customerId));
    }
}
