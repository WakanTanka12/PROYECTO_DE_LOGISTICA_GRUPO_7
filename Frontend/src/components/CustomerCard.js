// src/components/CustomerCard.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CustomerCard({ customer, orders }) {
    return (
        <View style={styles.card}>
            <Text style={styles.name}>
                {customer.firstName} {customer.lastName}
            </Text>
            <Text style={styles.text}>📞 {customer.phone}</Text>
            <Text style={styles.text}>📧 {customer.email}</Text>
            <Text style={styles.text}>🏠 {customer.address}</Text>

            {/* Relación Orders */}
            {orders && orders.length > 0 && (
                <View style={styles.ordersContainer}>
                    <Text style={styles.ordersTitle}>Órdenes relacionadas:</Text>
                    {orders.map((order) => (
                        <Text key={order.id} style={styles.text}>
                            Orden #{order.id} - {order.details}
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
    name: {
        fontSize: 16,
        fontWeight: "700",
        color: "#222",
    },
    text: {
        fontSize: 14,
        color: "#555",
        marginTop: 4,
    },
    ordersContainer: {
        marginTop: 10,
    },
    ordersTitle: {
        fontWeight: "bold",
        marginBottom: 6,
    },
});
