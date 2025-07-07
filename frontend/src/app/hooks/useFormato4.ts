import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import { obtenerFormato4, actualizarFormato4 } from '../services/Formato4Service';

export interface ActividadControl {
  id?: number;
  descripcion: string;
  porcentajeEfectividad: number;
  ponderacion: number;
  comentarios?: string;
  tipo?: string;
  ejecucion?: string;
  frecuencia?: string;
  areaResponsable?: string;
  descripcionUniverso?: string;
  descripcionMuestra?: string;
  papelTrabajoId?: number;
}

export interface Formato4Data {
  id: number;
  nombreCgti: string;
  errorTolerable: string;
  actividadesControl: ActividadControl[];
}

const useFormato4 = (idPapelTrabajo: string) => {
  const [datos, setDatos] = useState<Formato4Data | null>(null);
  const [cargando, setCargando] = useState(true);

  const cargarDatos = useCallback(async () => {
    setCargando(true);
    try {
      const response = await obtenerFormato4(idPapelTrabajo);
      setDatos(response.data);
      message.success('Datos cargados correctamente');
    } catch (error) {
      console.error('Error al cargar los datos:', error);
      message.error('Error al cargar los datos');
    } finally {
      setCargando(false);
    }
  }, [idPapelTrabajo]); // Memoizar con idPapelTrabajo como dependencia

  useEffect(() => {
    if (idPapelTrabajo) {
      cargarDatos(); // Ahora se usa la versión memoizada
    }
  }, [idPapelTrabajo, cargarDatos]); // Agregar cargarDatos como dependencia

  const persistirDatos = async (formatoId: number, dataToPersist: Formato4Data) => {
    try {
      setCargando(true);
      const response = await actualizarFormato4(idPapelTrabajo, formatoId, dataToPersist);
      setDatos(response.data);
      message.success('Cambios guardados exitosamente');
    } catch (error) {
      message.error('Error al guardar los cambios');
      console.error('Error al guardar los cambios:', error);
    } finally {
      setCargando(false);
    }
  };

  return {
    datos,
    cargando,
    persistirDatos,
  };
};

export default useFormato4;