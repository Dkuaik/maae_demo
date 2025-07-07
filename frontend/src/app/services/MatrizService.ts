import { api } from '@utils/api';

export const obtenerMatriz = async (anio: number, cgti: string) => {
  return api.get(`/matriz/${anio}/${encodeURIComponent(cgti)}`);
};