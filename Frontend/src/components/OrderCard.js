// src/components/OrderCard.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function OrderCard({ order, packageData, deliveryData }) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Orden #{order.id}</Text>
            <Text style={styles.text}>Fecha: {order.orderDate}</Text>
            <Text style={styles.text}>Precio: ${order.price}</Text>
            <Text style={styles.text}>Detalles: {order.details}</Text>

            {/* Relación Package */}
            {packageData && (
                <View style={styles.packageContainer}>
                    <Text style={styles.text}>
                        Paquete: {packageData.length} x {packageData.width} x {packageData.height} cm
                    </Text>
                    <Text style={styles.text}>Peso: {packageData.weight} kg</Text>
                </View>
            )}

            {/* Relación Delivery */}
            {deliveryData && (
                <View style={styles.deliveryContainer}>
                    <Text style={styles.text}>Entrega: {deliveryData.status}</Text>
                </View>
            )}
        </View>
    );
}

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
    packageContainer: {
        marginTop: 10,
    },
    deliveryContainer: {
        marginTop: 10,
    },
});
