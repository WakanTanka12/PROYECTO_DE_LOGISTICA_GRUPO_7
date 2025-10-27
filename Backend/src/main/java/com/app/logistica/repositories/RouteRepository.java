package com.app.logistica.repositories;

import com.app.logistica.entities.Route;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RouteRepository extends JpaRepository<Route, Long> {

    @EntityGraph(attributePaths = {"deliveries"})
    @Query("SELECT r FROM Route r")
    List<Route> findAllWithDeliveries();

    @EntityGraph(attributePaths = {"deliveries"})
    @Query("SELECT r FROM Route r WHERE r.id = :id")
    Optional<Route> findByIdWithDeliveries(Long id);
}
