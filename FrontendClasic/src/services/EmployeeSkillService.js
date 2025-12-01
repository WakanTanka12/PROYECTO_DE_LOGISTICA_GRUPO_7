// src/services/EmployeeSkillService.js
import api from "./api.js";

// ⚙️ Cambia el puerto si tu backend usa otro (por ejemplo 9090)
const BASE_URL = "http://localhost:9090/api";

/**
 * ============================================================
 * FUNCIONES CRUD RELACIONADAS CON EMPLOYEE - SKILLS
 * ============================================================
 */

/**
 * 🔹 Obtiene todas las relaciones employee-skill
 * (solo si tienes un endpoint general /employee-skills en tu backend)
 */
export const getAllEmployeeSkills = () =>
    api.get(`${BASE_URL}/employee-skills`).catch(() => []);

/**
 * 🔹 Obtiene todas las skills asignadas a un empleado
 */
export const getSkillsByEmployee = (employeeId) =>
    api.get(`${BASE_URL}/employees/${employeeId}/skills`);

/**
 * 🔹 Obtiene una relación específica Employee-Skill
 * (usado en el formulario al editar)
 */
export const getEmployeeSkillById = (relationId) =>
    api.get(`${BASE_URL}/employee-skills/${relationId}`);

/**
 * 🔹 Crea una nueva relación Employee-Skill
 * (usado al crear desde el formulario)
 */
export const createEmployeeSkill = (relation) =>
    api.post(`${BASE_URL}/employee-skills`, relation);

/**
 * 🔹 Actualiza (reemplaza) una relación Employee-Skill existente
 * (usado al editar en el formulario)
 */
export const updateEmployeeSkill = (relationId, relation) =>
    api.put(`${BASE_URL}/employee-skills/${relationId}`, relation);

/**
 * 🔹 Elimina una skill específica de un empleado
 * (usado en la tabla EmployeeSkillList)
 */
export const removeSkillFromEmployee = (employeeId, skillId) =>
    api.delete(`${BASE_URL}/employees/${employeeId}/skills/${skillId}`);

/**
 * ============================================================
 * FUNCIONES AUXILIARES
 * ============================================================
 */

/**
 * 🔹 Obtiene todos los empleados
 */
export const getAllEmployees = () => api.get(`${BASE_URL}/employees`);

/**
 * 🔹 Obtiene todas las skills disponibles
 */
export const getAllSkills = () => api.get(`${BASE_URL}/skills`);

/**
 * 🔹 Elimina una relación Employee-Skill
 * Compatible con el endpoint DELETE /api/employee-skills/remove
 */
export const deleteEmployeeSkill = async (employeeId, skillId) => {
    try {
        const response = await api.delete(`${BASE_URL}/employee-skills/remove)`, {
            params: {
                employeeId: employeeId,
                skillId: skillId,
            }
        });

        return response.data;
    } catch (error) {
        console.error("❌ Error al eliminar habilidad del empleado:", error);
        throw error;
    }
};
