// src/utils/formatters.js
export const formatCurrency = (value) =>
    `Bs ${Number(value || 0).toFixed(2)}`;

export const formatDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    return d.toLocaleString(); // Puedes ajustar formato
};
