// src/navigation/AppNavigator.js
import React from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuth } from "../hooks/useAuth";

// 🔐 Auth
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

// 🏠 Pantallas principales / CRUD
import HomeScreen from "../screens/HomeScreen";
import UsuarioScreen from "../screens/UsuarioScreen";
import CustomersScreen from "../screens/CustomersScreen";
import DriversScreen from "../screens/DriversScreen";
import PackagesScreen from "../screens/PackagesScreen";
import RoutesScreen from "../screens/RoutesScreen";
import OrdersScreen from "../screens/OrdersScreen";
import DeliveriesScreen from "../screens/DeliveriesScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * Tabs que se muestran cuando el usuario está autenticado
 */
function AppTabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: true,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: "Inicio" }}
            />
            <Tab.Screen
                name="Customers"
                component={CustomersScreen}
                options={{ title: "Clientes" }}
            />
            <Tab.Screen
                name="Drivers"
                component={DriversScreen}
                options={{ title: "Conductores" }}
            />
            <Tab.Screen
                name="Packages"
                component={PackagesScreen}
                options={{ title: "Paquetes" }}
            />
            <Tab.Screen
                name="Routes"
                component={RoutesScreen}
                options={{ title: "Rutas" }}
            />
            <Tab.Screen
                name="Orders"
                component={OrdersScreen}
                options={{ title: "Órdenes" }}
            />
            <Tab.Screen
                name="Deliveries"
                component={DeliveriesScreen}
                options={{ title: "Entregas" }}
            />
            <Tab.Screen
                name="Usuario"
                component={UsuarioScreen}
                options={{ title: "Perfil" }}
            />
        </Tab.Navigator>
    );
}

/**
 * AppNavigator
 * - Si loading: muestra un loader simple
 * - Si NO autenticado: AuthStack (Login / Register)
 * - Si autenticado: Tabs con todas las screens CRUD
 */
const AppNavigator = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        // Pantalla sencilla mientras se verifica la sesión
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!isAuthenticated ? (
                    // 🔐 Rutas de autenticación
                    <>
                        <Stack.Screen name="LoginStack" component={AuthStack} />
                    </>
                ) : (
                    // 📲 Rutas internas de la app (tabs)
                    <>
                        <Stack.Screen name="AppTabs" component={AppTabs} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

/**
 * Stack separado para Auth (Login / Register)
 */
function AuthStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Register"
                component={RegisterScreen}
                options={{ title: "Crear cuenta" }}
            />
        </Stack.Navigator>
    );
}

export default AppNavigator;
