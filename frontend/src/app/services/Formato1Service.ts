import { api } from '@utils/api';

export const obtenerFormato1 = async (idPapelTrabajo: string) => {
  return api.get(`/papel-trabajo/${idPapelTrabajo}/formato1`);
};

export const crearRegistroFormato1 = async (idPapelTrabajo: string, payload: any) => {
  return api.post(`/papel-trabajo/${idPapelTrabajo}/formato1`, payload);
};

export const actualizarRegistroFormato1 = async (idPapelTrabajo: string, id: number, payload: any) => {
  return api.update(`/papel-trabajo/${idPapelTrabajo}/formato1/${id}`, payload);
};

export const eliminarRegistroFormato1 = async (idPapelTrabajo: string, id: number) => {
  return api.delete(`/papel-trabajo/${idPapelTrabajo}/formato1/${id}`);
};