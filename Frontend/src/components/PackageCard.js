import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PackageCard({ pkg, orderData }) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>Paquete #{pkg.id}</Text>

            {/* Dimensiones simples */}
            <Text style={styles.text}>
                Dimensiones:
                {" "}{pkg.length ?? "-"} x {pkg.width ?? "-"} x {pkg.height ?? "-"} cm
            </Text>

            {/* Peso */}
            <Text style={styles.text}>
                Peso: {pkg.weight ?? "-"} kg
            </Text>

            {/* Relación con Order (si viene orderData o orderId) */}
            {orderData ? (
                <View style={styles.orderContainer}>
                    <Text style={styles.text}>Orden asociada: #{orderData.id}</Text>
                </View>
            ) : pkg.orderId ? (
                <View style={styles.orderContainer}>
                    <Text style={styles.text}>Orden asociada: #{pkg.orderId}</Text>
                </View>
            ) : null}
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
