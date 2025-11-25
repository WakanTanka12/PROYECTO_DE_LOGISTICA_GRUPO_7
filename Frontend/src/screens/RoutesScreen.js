import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from "react-native";
import {
    getAllRoutes,
    createRoute,
    updateRoute,
    deleteRoute,
} from "../api/routesApi";
import { getDeliveriesByRoute } from "../api/deliveriesApi";  // API para obtener entregas por ruta
import { getDriverById } from "../api/driversApi";  // API para obtener información del conductor

export default function RoutesScreen() {
    const [routes, setRoutes] = useState([]);
    const [deliveries, setDeliveries] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        id: null,
        name: "",
        origin: "",
        destination: "",
    });

    const loadRoutes = async () => {
        try {
            setLoading(true);
            const res = await getAllRoutes();
            setRoutes(res.data);
        } catch (err) {
            console.error(err);
            Alert.alert("Error", "No se pudieron cargar las rutas");
        } finally {
            setLoading(false);
        }
    };

    const loadDeliveriesForRoute = async (routeId) => {
        try {
            const res = await getDeliveriesByRoute(routeId); // Llamada a la API para obtener las entregas
            setDeliveries((prevDeliveries) => [...prevDeliveries, ...res.data]);
        } catch (err) {
            console.error("Error fetching deliveries:", err);
        }
    };

    const loadDriverForDelivery = async (driverId) => {
        try {
            const res = await getDriverById(driverId); // Obtener el conductor relacionado
            setDrivers((prevDrivers) => [...prevDrivers, res.data]);
        } catch (err) {
            console.error("Error fetching driver:", err);
        }
    };

    useEffect(() => {
        loadRoutes();
    }, []);

    useEffect(() => {
        routes.forEach((route) => {
            if (route.id) {
                loadDeliveriesForRoute(route.id); // Cargar entregas para cada ruta
            }
        });
    }, [routes]);

    useEffect(() => {
        deliveries.forEach((delivery) => {
            if (delivery.driverId) {
                loadDriverForDelivery(delivery.driverId); // Cargar conductor para cada entrega
            }
        });
    }, [deliveries]);

    const handleEdit = (route) => {
        setForm({
            id: route.id,
            name: route.name || "",
            origin: route.origin || "",
            destination: route.destination || "",
        });
    };

    const handleDelete = (id) => {
        Alert.alert("Confirmar", "¿Eliminar esta ruta?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Eliminar",
                style: "destructive",
                onPress: async () => {
                    try {
                        await deleteRoute(id);
                        await loadRoutes();
                    } catch (err) {
                        console.error(err);
                        Alert.alert("Error", "No se pudo eliminar la ruta");
                    }
                },
            },
        ]);
    };

    const handleSubmit = async () => {
        if (!form.name) {
            Alert.alert("Error", "El nombre es obligatorio");
            return;
        }

        try {
            setSaving(true);
            const payload = {
                name: form.name,
                origin: form.origin,
                destination: form.destination,
            };

            if (form.id) {
                await updateRoute(form.id, payload);
            } else {
                await createRoute(payload);
            }

            setForm({ id: null, name: "", origin: "", destination: "" });
            await loadRoutes();
        } catch (err) {
            console.error(err);
            Alert.alert("Error", "No se pudo guardar la ruta");
        } finally {
            setSaving(false);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.text}>Origen: {item.origin}</Text>
            <Text style={styles.text}>Destino: {item.destination}</Text>

            {/* Mostrar las entregas relacionadas con esta ruta */}
            <View style={styles.deliveriesContainer}>
                <Text style={styles.deliveriesTitle}>Entregas asociadas:</Text>
                {deliveries
                    .filter((delivery) => delivery.routeId === item.id)
                    .map((delivery) => (
                        <Text key={delivery.id} style={styles.text}>
                            Entrega #{delivery.id} - {delivery.status} (Conductor:{" "}
                            {drivers.find((driver) => driver.id === delivery.driverId)?.name ||
                                "Desconocido"})
                        </Text>
                    ))}
            </View>

            <View style={styles.row}>
                <TouchableOpacity
                    style={[styles.button, styles.editButton]}
                    onPress={() => handleEdit(item)}
                >
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.deleteButton]}
                    onPress={() => handleDelete(item.id)}
                >
                    <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Rutas</Text>

            {loading ? (
                <ActivityIndicator size="large" />
            ) : (
                <FlatList
                    data={routes}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 140 }}
                />
            )}

            <View style={styles.formContainer}>
                <Text style={styles.formTitle}>
                    {form.id ? "Editar ruta" : "Nueva ruta"}
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    value={form.name}
                    onChangeText={(text) => setForm((f) => ({ ...f, name: text }))}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Origen"
                    value={form.origin}
                    onChangeText={(text) => setForm((f) => ({ ...f, origin: text }))}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Destino"
                    value={form.destination}
                    onChangeText={(text) =>
                        setForm((f) => ({ ...f, destination: text }))
                    }
                />
                <TouchableOpacity
                    style={[styles.button, styles.saveButton]}
                    onPress={handleSubmit}
                    disabled={saving}
                >
                    <Text style={styles.buttonText}>
                        {saving ? "Guardando..." : form.id ? "Actualizar" : "Crear"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 12, backgroundColor: "#f5f5f5" },
    header: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
    card: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 12,
        marginBottom: 8,
        elevation: 2,
    },
    title: { fontSize: 16, fontWeight: "bold" },
    text: { fontSize: 14, color: "#555" },
    row: { flexDirection: "row", marginTop: 8, justifyContent: "flex-end" },
    button: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6,
        marginLeft: 8,
    },
    editButton: { backgroundColor: "#2A4B9A" },
    deleteButton: { backgroundColor: "#d9534f" },
    buttonText: { color: "#fff", fontWeight: "bold" },
    formContainer: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "#fff",
        padding: 12,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        elevation: 10,
    },
    formTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
    input: {
        backgroundColor: "#f9f9f9",
        borderRadius: 8,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ddd",
        marginBottom: 8,
    },
    saveButton: { backgroundColor: "#28a745", marginTop: 4 },
    deliveriesContainer: {
        marginTop: 10,
    },
    deliveriesTitle: {
        fontWeight: "bold",
        marginBottom: 6,
    },
});
