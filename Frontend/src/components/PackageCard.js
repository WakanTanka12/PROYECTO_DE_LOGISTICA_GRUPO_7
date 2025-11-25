// src/components/PackageCard.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PackageCard({ pkg, orderData }) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Paquete #{pkg.id}</Text>
            <Text style={styles.text}>Dimensiones: {pkg.dimensions.length} x {pkg.dimensions.width} x {pkg.dimensions.height} cm</Text>
            <Text style={styles.text}>Peso: {pkg.weight} kg</Text>

            {/* Relación Order */}
            {orderData && (
                <View style={styles.orderContainer}>
                    <Text style={styles.text}>Orden asociada: #{orderData.id}</Text>
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
    orderContainer: {
        marginTop: 10,
    },
});
