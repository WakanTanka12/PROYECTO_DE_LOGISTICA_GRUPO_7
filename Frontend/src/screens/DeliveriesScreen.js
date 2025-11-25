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
    getAllDeliveries,
    createDelivery,
    updateDelivery,
    deleteDelivery,
} from "../api/deliveriesApi";
import { getDriverById } from "../api/driversApi";  // Suponiendo que tienes este endpoint
import { getOrderById } from "../api/ordersApi";

export default function DeliveriesScreen() {
    const [deliveries, setDeliveries] = useState([]);
    const [drivers, setDrivers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [form, setForm] = useState({
        id: null,
        status: "",
        deliveryDate: "",
        driverId: "",
        orderId: "",
    });

    const loadDeliveries = async () => {
        try {
            setLoading(true);
            const res = await getAllDeliveries();
            setDeliveries(res.data);
        } catch (err) {
            console.error(err);
            Alert.alert("Error", "No se pudieron cargar las entregas");
        } finally {
            setLoading(false);
        }
    };

    const loadDriver = async (driverId) => {
        try {
            const res = await getDriverById(driverId);
            setDrivers((prevDrivers) => [...prevDrivers, res.data]);
        } catch (err) {
            console.error("Error fetching driver:", err);
        }
    };

    const loadOrder = async (orderId) => {
        try {
            const res = await getOrderById(orderId);
            setOrders((prevOrders) => [...prevOrders, res.data]);
        } catch (err) {
            console.error("Error fetching order:", err);
        }
    };

    useEffect(() => {
        loadDeliveries();
    }, []);

    useEffect(() => {
        deliveries.forEach((delivery) => {
            if (delivery.driverId) {
                loadDriver(delivery.driverId);
            }
            if (delivery.orderId) {
                loadOrder(delivery.orderId);
            }
        });
    }, [deliveries]);

    const handleEdit = (delivery) => {
        setForm({
            id: delivery.id,
            status: delivery.status || "",
            deliveryDate: delivery.deliveryDate || "",
            driverId: delivery.driver?.id ? String(delivery.driver.id) : "",
            orderId: delivery.order?.id ? String(delivery.order.id) : "",
        });
    };

    const handleDelete = (id) => {
        Alert.alert("Confirmar", "¿Eliminar esta entrega?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Eliminar",
                style: "destructive",
                onPress: async () => {
                    try {
                        await deleteDelivery(id);
                        await loadDeliveries();
                    } catch (err) {
                        console.error(err);
                        Alert.alert("Error", "No se pudo eliminar la entrega");
                    }
                },
            },
        ]);
    };

    const handleSubmit = async () => {
        if (!form.orderId || !form.driverId) {
            Alert.alert("Error", "OrderId y DriverId son obligatorios");
            return;
        }

        const payload = {
            status: form.status || "PENDING",
            deliveryDate: form.deliveryDate || null, // ajusta formato según backend
            driverId: Number(form.driverId),
            orderId: Number(form.orderId),
        };

        try {
            setSaving(true);
            if (form.id) {
                await updateDelivery(form.id, payload);
            } else {
                await createDelivery(payload);
            }

            setForm({
                id: null,
                status: "",
                deliveryDate: "",
                driverId: "",
                orderId: "",
            });

            await loadDeliveries();
        } catch (err) {
            console.error(err);
            Alert.alert("Error", "No se pudo guardar la entrega");
        } finally {
            setSaving(false);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.title}>Entrega #{item.id}</Text>
            <Text style={styles.text}>Estado: {item.status}</Text>
            {item.deliveryDate && (
                <Text style={styles.text}>Fecha: {item.deliveryDate}</Text>
            )}
            <Text style={styles.text}>
                Driver: {item.driver?.name || item.driverId || "N/D"}
            </Text>
            <Text style={styles.text}>
                Orden: {item.order?.id || item.orderId || "N/D"}
            </Text>

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
            <Text style={styles.header}>Entregas</Text>

            {loading ? (
                <ActivityIndicator size="large" />
            ) : (
                <FlatList
                    data={deliveries}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 180 }}
                />
            )}

            {/* Formulario */}
            <View style={styles.formContainer}>
                <Text style={styles.formTitle}>
                    {form.id ? "Editar entrega" : "Nueva entrega"}
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Estado (PENDING / IN_ROUTE / DELIVERED)"
                    value={form.status}
                    onChangeText={(text) => setForm((f) => ({ ...f, status: text }))}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Fecha entrega (ej: 2025-11-23T10:00)"
                    value={form.deliveryDate}
                    onChangeText={(text) =>
                        setForm((f) => ({ ...f, deliveryDate: text }))
                    }
                />

                <TextInput
                    style={styles.input}
                    placeholder="Driver ID"
                    value={form.driverId}
                    keyboardType="numeric"
                    onChangeText={(text) =>
                        setForm((f) => ({ ...f, driverId: text }))
                    }
                />

                <TextInput
                    style={styles.input}
                    placeholder="Order ID"
                    value={form.orderId}
                    keyboardType="numeric"
                    onChangeText={(text) => setForm((f) => ({ ...f, orderId: text }))}
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
