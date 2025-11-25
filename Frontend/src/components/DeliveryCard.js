// src/components/DeliveryCard.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DeliveryCard({ delivery, driver }) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Entrega #{delivery.id}</Text>
            <Text style={styles.text}>Fecha: {delivery.deliveryDate}</Text>
            <Text style={[styles.text, { color: getStatusColor(delivery.status) }]}>
                Estado: {delivery.status}
            </Text>

            {/* Relación Driver */}
            {driver && (
                <View style={styles.driverContainer}>
                    <Text style={styles.text}>Conductor: {driver.firstName} {driver.lastName}</Text>
                </View>
            )}
        </View>
    );
}

const getStatusColor = (status) => {
    switch (status) {
        case "pending":
            return "#f4c430";
        case "in_progress":
            return "#4da6ff";
        case "delivered":
            return "#4CAF50";
        default:
            return "#808080";
    }
};

const styles = StyleSheet.create({
    card: {
        padding: 14,
        marginVertical: 8,
        marginHorizontal: 12,
        backgroundColor: "#fff",
        borderRadius: 10,
        elevation: 3,
    },
    title: {
        fontSize: 16,
        fontWeight: "700",
        color: "#222",
    },
    text: {
        fontSize: 14,
        color: "#555",
        marginTop: 4,
    },
    driverContainer: {
        marginTop: 10,
    },
});
