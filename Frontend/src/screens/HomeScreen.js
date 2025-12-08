// src/screens/HomeScreen.js
import React, { useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    RefreshControl,
} from "react-native";
import { useAuth } from "../hooks/useAuth";
import { useDeliveries } from "../hooks/useDeliveries";
import OrderCard from "../components/OrderCard";

const HomeScreen = ({ navigation }) => {
    const { user, logout } = useAuth();
    const { deliveries, loading, loadDeliveriesForDriver } = useDeliveries();

    useEffect(() => {
        if (user?.userId) {
            loadDeliveriesForDriver(user.userId);
        }
    }, [user]);

    const onRefresh = () => {
        if (user?.userId) loadDeliveriesForDriver(user.userId);
    };

    const displayName =
        user ? `${user.firstname ?? ""} ${user.lastname ?? ""}`.trim() : "Driver";

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <View>
                    <Text style={styles.welcome}>Hola, {displayName || "Driver"}</Text>
                    <Text style={styles.subtitle}>Tus entregas de hoy</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate("Usuario")}>
                    <Text style={styles.link}>Perfil</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={logout}>
                    <Text style={[styles.link, { color: "#d9534f" }]}>Salir</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={deliveries}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                    <OrderCard
                        order={item}
                        onPress={() =>
                            console.log("Ir al detalle de orden", item.id)
                            // navigation.navigate("OrderDetail", { id: item.id })
                        }
                    />
                )}
                contentContainerStyle={{ paddingVertical: 8 }}
                refreshControl={
                    <RefreshControl refreshing={loading} onRefresh={onRefresh} />
                }
                ListEmptyComponent={
                    !loading && (
                        <Text style={styles.empty}>No tienes entregas asignadas.</Text>
                    )
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
    topBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    welcome: { fontSize: 18, fontWeight: "bold" },
    subtitle: { fontSize: 14, color: "#555" },
    link: { marginLeft: 12, color: "#2A4B9A", fontWeight: "600" },
    empty: {
        textAlign: "center",
        marginTop: 32,
        color: "#777",
    },
});

export default HomeScreen;
