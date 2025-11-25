// src/store/DeliveriesContext.js
import React, { createContext, useState } from "react";
import { getMyDeliveries } from "../api/deliveriesApi";

export const DeliveriesContext = createContext();

export const DeliveriesProvider = ({ children }) => {
    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadDeliveriesForDriver = async (driverId) => {
        try {
            setLoading(true);
            const data = await getMyDeliveries(driverId);
            setDeliveries(data);
        } catch (err) {
            console.error("Error cargando deliveries:", err.response?.data || err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const value = {
        deliveries,
        loading,
        loadDeliveriesForDriver,
    };

    return (
        <DeliveriesContext.Provider value={value}>
            {children}
        </DeliveriesContext.Provider>
    );
};
