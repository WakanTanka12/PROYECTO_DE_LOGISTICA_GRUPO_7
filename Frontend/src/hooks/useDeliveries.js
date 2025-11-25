// src/hooks/useDeliveries.js
import { useContext } from "react";
import { DeliveriesContext } from "../store/DeliveriesContext";

export const useDeliveries = () => {
    return useContext(DeliveriesContext);
};
