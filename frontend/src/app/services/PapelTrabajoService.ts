import { api } from '@utils/api';

export interface PapelDeTrabajo {
  id: number;
  nombre: string;
  cgtiId: number;
}

export const obtenerPapelesDeTrabajo = async (cgti: string, anio: number): Promise<PapelDeTrabajo[]> => {
  const respuesta = await api.get(`/cgti/${anio}/${encodeURIComponent(cgti)}/papel-trabajo`);
  return respuesta.data;
};

export const crearPapelDeTrabajo = async (nombre: string, cgtiId: number): Promise<PapelDeTrabajo> => {
  const response = await api.post('/cgti/papel-trabajo', { nombre, cgtiId });
  return response.data;
};

export const editarPapelDeTrabajo = async (id: number, nuevoNombre: string, cgtiId: number): Promise<PapelDeTrabajo> => {
  const response = await api.update(`/cgti/papel-trabajo/${id}`, { nombre: nuevoNombre, cgtiId });
  return response.data;
};

export const eliminarPapelDeTrabajo = async (id: number): Promise<void> => {
  await api.delete(`/cgti/papel-trabajo/${id}`);
};