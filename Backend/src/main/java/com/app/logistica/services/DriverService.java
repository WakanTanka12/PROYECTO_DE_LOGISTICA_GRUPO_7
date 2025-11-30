package com.app.logistica.services;

import com.app.logistica.dtos.driver.DriverRequest;
import com.app.logistica.dtos.driver.DriverResponse; // ✅ Importar Response

import java.util.List;

public interface DriverService {

    // ✅ Create y Update ahora devuelven Response (el objeto completo con ID)
    DriverResponse createDriver(DriverRequest driverRequest);

    DriverResponse updateDriver(Long driverID, DriverRequest driverRequest);

    String deleteDriver(Long driverID);

    DriverResponse getDriver(Long driverID);

    List<DriverResponse> getDrivers();
}