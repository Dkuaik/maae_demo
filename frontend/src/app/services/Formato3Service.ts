import { api } from '@utils/api';

// Obtener los datos del Formato 3
export const obtenerFormato3 = async (idPapelTrabajo: string) => {
  return api.get(`/papel-trabajo/${idPapelTrabajo}/formato3`);
};

// Actualizar los datos del Formato 3
export const actualizarFormato3 = async (idPapelTrabajo: string, payload: any) => {
  return api.update(`/papel-trabajo/${idPapelTrabajo}/formato3`, payload);
};