import { useAuthStore } from '../store/useAuthStore';

export function ProtectedRoute({ children }) {
    const token = useAuthStore(state => state.token);

    if (!token) return null; // o pantalla de carga

    return children;
}
