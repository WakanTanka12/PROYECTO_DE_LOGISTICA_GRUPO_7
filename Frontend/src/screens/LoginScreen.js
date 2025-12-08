// src/screens/LoginScreen.js
import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from "react-native";
import { useAuth } from "../hooks/useAuth";

const LoginScreen = () => {
    const { login, loading } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Ingresa email y contraseña");
            return;
        }

        const success = await login(email, password);

        if (!success) {
            Alert.alert("Acceso denegado", "Credenciales incorrectas.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>EMS — Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleSubmit}
                disabled={loading}
            >
                {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Entrar</Text>}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 24 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 24, textAlign: "center" },
    input: {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    button: { backgroundColor: "#2A4B9A", padding: 12, borderRadius: 8 },
    buttonDisabled: { opacity: 0.7 },
    buttonText: { color: "#fff", fontWeight: "bold", textAlign: "center" },
});

export default LoginScreen;
