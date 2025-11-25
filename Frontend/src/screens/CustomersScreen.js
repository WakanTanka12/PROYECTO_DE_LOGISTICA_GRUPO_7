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
    getAllCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
} from "../api/customersApi";
import { getOrdersByCustomer } from "../api/ordersApi";  // Suponiendo que tienes este endpoint

export default function CustomersScreen() {
    const [customers, setCustomers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        id: null,
        name: "",
        email: "",
        address: "",
    });

    const [saving, setSaving] = useState(false);

    const loadCustomers = async () => {
        try {
            setLoading(true);
            const res = await getAllCustomers();
            setCustomers(res.data);
        } catch (err) {
            console.error(err);
            Alert.alert("Error", "No se pudieron cargar los clientes");
        } finally {
            setLoading(false);
        }
    };

    const loadOrdersForCustomer = async (customerId) => {
        try {
            const res = await getOrdersByCustomer(customerId); // Llamada a la API para obtener órdenes
            setOrders((prevOrders) => [
                ...prevOrders,
                ...res.data
            ]);
        } catch (err) {
            console.error("Error fetching orders:", err);
        }
    };

    useEffect(() => {
        loadCustomers();
    }, []);

    useEffect(() => {
        customers.forEach((customer) => {
            if (customer.id) {
                loadOrdersForCustomer(customer.id);
            }
        });
    }, [customers]);

    const handleEdit = (customer) => {
        setForm({
            id: customer.id,
            name: customer.name || "",
            email: customer.email || "",
            address: customer.address || "",
        });
    };

    const handleDelete = (id) => {
        Alert.alert("Confirmar", "¿Eliminar este cliente?", [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Eliminar",
                style: "destructive",
                onPress: async () => {
                    try {
                        await deleteCustomer(id);
                        await loadCustomers();
                    } catch (err) {
                        console.error(err);
                        Alert.alert("Error", "No se pudo eliminar el cliente");
                    }
                },
            },
        ]);
    };

    const handleSubmit = async () => {
        if (!form.name || !form.email) {
            Alert.alert("Error", "Nombre y email son obligatorios");
            return;
        }

        try {
            setSaving(true);
            if (form.id) {
                await updateCustomer(form.id, {
                    name: form.name,
                    email: form.email,
                    address: form.address,
                });
            } else {
                await addCustomer({
                    name: form.name,
                    email: form.email,
                    address: form.address,
                });
            }
            setForm({ id: null, name: "", email: "", address: "" });
            await loadCustomers();
        } catch (err) {
            console.error(err);
            Alert.alert("Error", "No se pudo guardar el cliente");
        } finally {
            setSaving(false);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>
            {item.email && <Text style={styles.text}>Email: {item.email}</Text>}
            {item.address && <Text style={styles.text}>Dirección: {item.address}</Text>}

            {/* Relación Orders */}
            <View style={styles.ordersContainer}>
                <Text style={styles.ordersTitle}>Órdenes asociadas:</Text>
                {orders.filter((order) => order.customerId === item.id).map((order) => (
                    <Text key={order.id} style={styles.text}>
                        Orden #{order.id} - {order.details}
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
            <Text style={styles.header}>Clientes</Text>

            {loading ? (
                <ActivityIndicator size="large" />
            ) : (
                <FlatList
                    data={customers}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 140 }}
                />
            )}

            {/* Formulario crear/editar */}
            <View style={styles.formContainer}>
                <Text style={styles.formTitle}>
                    {form.id ? "Editar cliente" : "Nuevo cliente"}
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    value={form.name}
                    onChangeText={(text) => setForm((f) => ({ ...f, name: text }))}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={form.email}
                    autoCapitalize="none"
                    onChangeText={(text) => setForm((f) => ({ ...f, email: text }))}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Dirección"
                    value={form.address}
                    onChangeText={(text) => setForm((f) => ({ ...f, address: text }))}
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
