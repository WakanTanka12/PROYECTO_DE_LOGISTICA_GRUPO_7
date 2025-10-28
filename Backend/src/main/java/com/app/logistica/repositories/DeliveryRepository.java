package com.app.logistica.repositories;

import com.app.logistica.entities.Customer;
import com.app.logistica.entities.Delivery;
import com.app.logistica.entities.Driver;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

@Repository
public interface DeliveryRepository extends JpaRepository<Delivery, Long> {
    List<Delivery> findByDriverId(Long driverId);
}