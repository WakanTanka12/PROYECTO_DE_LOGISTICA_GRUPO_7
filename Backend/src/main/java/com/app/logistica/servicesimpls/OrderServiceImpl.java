package com.app.logistica.servicesimpls;

import com.app.logistica.dtos.OrderDTO;
import com.app.logistica.entities.Customer;
import com.app.logistica.exceptions.ResourceNotFoundException;
import com.app.logistica.repositories.CustomerRepository;
import com.app.logistica.repositories.OrderRepository;
import com.app.logistica.services.OrderService;
import com.app.logistica.mapperdtos.OrderMapper;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional

public class OrderServiceImpl implements OrderService {
    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;

    @Override
    @Transactional(readOnly = true)
    public List<OrderDTO> listAll() {
        return orderRepository.findAllWithCustomer()
                .stream()
                .map(OrderMapper::mapOrderToOrderDTO)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDTO> listByCustomer(Long customerId) {
        if (customerId == null) {
            return listAll();
        }

        verifyCustomer(customerId);

        return orderRepository.findByCustomerId(customerId)
                .stream()
                .map(OrderMapper::mapOrderToOrderDTO)
                .collect(Collectors.toList());
    }

    @Override
    public OrderDTO addToCustomer(Long customerId, OrderDTO orderDTO) {
        Customer customer = verifyCustomer(customerId);

        return null;
    }

    @Override
    public OrderDTO getById(Long orderId) {
        return null;
    }

    @Override
    public OrderDTO update(Long customerId, Long orderId, OrderDTO orderDTO) {
        return null;
    }

    @Override
    public void remove(Long customerId, Long orderId) {

    }

    @Override
    public void deleteById(Long orderId) {

    }
    private Customer verifyCustomer(Long customerId) {
        return customerRepository.findById(customerId)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found with id " + customerId));
    }
}
