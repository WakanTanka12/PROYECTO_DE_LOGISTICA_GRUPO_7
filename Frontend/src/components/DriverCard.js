// src/components/DriverCard.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function DriverCard({ driver }) {
    return (
        <View style={styles.card}>
            <Text style={styles.name}>
                {driver.firstName} {driver.lastName}
            </Text>
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
});
