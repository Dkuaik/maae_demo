import { api } from '@utils/api';

// Obtener datos generales de la norma
export const obtenerNormaFormato2 = async (idPapelTrabajo: string) => {
  return api.get(`/papel-trabajo/${idPapelTrabajo}/formato2`);
};

// Obtener factores asociados a la norma
export const obtenerFactoresFormato2 = async (idPapelTrabajo: string) => {
  return api.get(`/papel-trabajo/${idPapelTrabajo}/formato2/factores`);
};

// Actualizar la norma
export const actualizarNormaFormato2 = async (idPapelTrabajo: string, payload: any) => {
  return api.update(`/papel-trabajo/${idPapelTrabajo}/formato2`, payload);
};

// Crear un nuevo factor
export const crearFactorFormato2 = async (idPapelTrabajo: string, payload: any) => {
  return api.post(`/papel-trabajo/${idPapelTrabajo}/formato2/factores`, payload);
};

// Actualizar un factor existente
export const actualizarFactorFormato2 = async (idPapelTrabajo: string, idFactor: number, payload: any) => {
  return api.update(`/papel-trabajo/${idPapelTrabajo}/formato2/factores/${idFactor}`, payload);
};

// Eliminar un factor
export const eliminarFactorFormato2 = async (idPapelTrabajo: string, idFactor: number) => {
  return api.delete(`/papel-trabajo/${idPapelTrabajo}/formato2/factores/${idFactor}`);
};