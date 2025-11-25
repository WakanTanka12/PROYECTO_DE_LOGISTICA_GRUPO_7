// src/components/RouteCard.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function RouteCard({ route, deliveries }) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Ruta: {route.routeName}</Text>
            <Text style={styles.text}>Origen: {route.origin}</Text>
            <Text style={styles.text}>Destino: {route.destination}</Text>
            <Text style={styles.text}>Distancia: {route.distance} km</Text>

            {/* Relación Deliveries */}
            {deliveries && deliveries.length > 0 && (
                <View style={styles.deliveriesContainer}>
                    <Text style={styles.text}>Entregas relacionadas:</Text>
                    {deliveries.map((delivery) => (
                        <Text key={delivery.id} style={styles.text}>
                            Entrega #{delivery.id} - {delivery.status}
                        </Text>
                    ))}
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
    deliveriesContainer: {
        marginTop: 10,
    },
});
