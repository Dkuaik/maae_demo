import { api } from '@utils/api';

// Obtener los datos del Formato 4
export const obtenerFormato4 = async (idPapelTrabajo: string) => {
  return api.get(`/papel-trabajo/${idPapelTrabajo}/formato4`);
};

// Actualizar los datos del Formato 4
export const actualizarFormato4 = async (idPapelTrabajo: string, formatoId: number, payload: any) => {
  return api.update(`/papel-trabajo/${idPapelTrabajo}/formato4/${formatoId}`, payload);
};