package com.app.logistica.servicesimpls;

import com.app.logistica.dtos.customer.CustomerRequest;
import com.app.logistica.dtos.customer.CustomerResponse;
import com.app.logistica.entities.Customer;
import com.app.logistica.exceptions.ResourceNotFoundException;
import com.app.logistica.mapperdtos.CustomerMapper;
import com.app.logistica.repositories.CustomerRepository;
import com.app.logistica.services.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor // ✅ Inyecta automáticamente los campos 'final'
@Transactional
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerMapper customerMapper; // ✅ Inyección del Mapper

    @Override
    public CustomerResponse createCustomer(CustomerRequest customerRequest) {
        // Usar la instancia inyectada, no el método estático
        Customer customer = customerMapper.toEntity(customerRequest);
        Customer savedCustomer = customerRepository.save(customer);
        return customerMapper.toResponse(savedCustomer);
    }

    @Override
    public CustomerResponse updateCustomer(Long customerId, CustomerRequest customerRequest) {
        Customer customer = customerRepository.findById(customerId).orElseThrow(
                () -> new ResourceNotFoundException("Customer not found with id " + customerId)
        );

        // Actualización manual de campos (o podrías usar un método update en el mapper)
        customer.setFirstName(customerRequest.getFirstName());
        customer.setLastName(customerRequest.getLastName());
        customer.setEmail(customerRequest.getEmail());
        customer.setPhone(customerRequest.getPhone());
        customer.setAddress(customerRequest.getAddress());

        Customer updatedCustomer = customerRepository.save(customer);
        return customerMapper.toResponse(updatedCustomer);
    }

    @Override
    public String deleteCustomer(Long customerId) {
        if (!customerRepository.existsById(customerId)) {
            throw new ResourceNotFoundException("Customer not found with id " + customerId);
        }
        customerRepository.deleteById(customerId);
        return "Customer has been deleted";
    }

    @Override
    @Transactional(readOnly = true)
    public CustomerResponse getCustomer(Long customerId) {
        Customer customer = customerRepository.findById(customerId).orElseThrow(
                () -> new ResourceNotFoundException("Customer not found with id " + customerId)
        );
        return customerMapper.toResponse(customer);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CustomerResponse> getAllCustomers() {
        return customerRepository.findAll()
                .stream()
                .map(customerMapper::toResponse) // ✅ Referencia a método de instancia
                .collect(Collectors.toList());
    }
}