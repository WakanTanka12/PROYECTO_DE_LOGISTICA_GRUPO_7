// src/screens/UsuarioScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../hooks/useAuth";

const UsuarioScreen = () => {
    const { user } = useAuth();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mi Perfil</Text>
            <Text style={styles.label}>Nombre:</Text>
            <Text style={styles.value}>{user?.name || "N/D"}</Text>

            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{user?.email || "N/D"}</Text>

            <Text style={styles.label}>Rol:</Text>
            <Text style={styles.value}>{user?.role || "DRIVER"}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#fff" },
    title: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
    label: { fontWeight: "600", marginTop: 8 },
    value: { fontSize: 16 },
});

export default UsuarioScreen;
