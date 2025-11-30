package com.app.logistica.servicesimpls;

import com.app.logistica.dtos.Package.PackageRequest;
import com.app.logistica.dtos.Package.PackageResponse;
import com.app.logistica.entities.Order;
import com.app.logistica.entities.Package;
import com.app.logistica.exceptions.ResourceNotFoundException;
import com.app.logistica.mapperdtos.PackageMapper;
import com.app.logistica.repositories.OrderRepository;
import com.app.logistica.repositories.PackageRepository;
import com.app.logistica.services.PackageService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class PackageServiceImpl implements PackageService {

    private final PackageRepository packageRepository;
    private final OrderRepository orderRepository;

    @Override
    public PackageResponse createForOrder(Long orderId, PackageRequest dto) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Order not found with id " + orderId));

        Package p = PackageMapper.toEntity(dto);
        p.setOrder(order);

        Package saved = packageRepository.save(p);
        return PackageMapper.toResponse(saved);
    }

    @Override
    public PackageResponse updatePackage(Long packageId, PackageRequest dto) {
        Package p = packageRepository.findById(packageId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Package not found with id " + packageId));

        // actualizar campos simples
        p.setWeight(dto.getWeight());
        p.setLength(dto.getLength());
        p.setWidth(dto.getWidth());
        p.setHeight(dto.getHeight());

        Package updated = packageRepository.save(p);
        return PackageMapper.toResponse(updated);
    }

    @Override
    public void deletePackage(Long packageId) {
        Package p = packageRepository.findById(packageId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Package not found with id " + packageId));
        packageRepository.delete(p);
    }

    @Override
    public PackageResponse getPackage(Long packageId) {
        Package p = packageRepository.findById(packageId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Package not found with id " + packageId));
        return PackageMapper.toResponse(p);
    }

    @Override
    public List<PackageResponse> getPackages() {
        return packageRepository.findAll().stream()
                .map(PackageMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<PackageResponse> getByOrder(Long orderId) {
        return packageRepository.findByOrder_Id(orderId).stream()
                .map(PackageMapper::toResponse)
                .collect(Collectors.toList());
    }
}
