package com.app.logistica.services;

import com.app.logistica.dtos.customer.CustomerRequest;
import com.app.logistica.dtos.customer.CustomerResponse;

import java.util.List;

public interface CustomerService {
    CustomerResponse createCustomer(CustomerRequest customerRequest);
    CustomerResponse updateCustomer(Long customerId, CustomerRequest customerRequest);
    String deleteCustomer(Long customerId);
    CustomerResponse getCustomer(Long customerId);
    List<CustomerResponse> getAllCustomers();
}
