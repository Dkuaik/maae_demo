import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import { obtenerFormato3, actualizarFormato3 } from '../services/Formato3Service';

export interface CampoComplementario {
  id: number | null;
  nombre_campo: string;
  contenido: string;
}

export interface Evidencia {
  id: number | null;
  resultado: string;
  comentarios: string;
  campos_complementarios: CampoComplementario[];
}

export interface ActividadControl {
  id: number | null;
  nombre: string;
  evidencias: Evidencia[];
}

export interface Formato3Data {
  nombre_cgti: string;
  periodoRevision: string;
  actividadesControl: ActividadControl[];
}

const useFormato3 = (idPapelTrabajo: string) => {
  const [datos, setDatos] = useState<Formato3Data | null>(null);
  const [cargando, setCargando] = useState(true);

  const cargarDatos = useCallback(async () => {
    try {
      setCargando(true);
      const response = await obtenerFormato3(idPapelTrabajo);
      setDatos(response.data);
    } catch (error) {
      message.error('Error cargando los datos del Formato 3.');
      console.error('Error fetching formato data:', error);
    } finally {
      setCargando(false);
    }
  }, [idPapelTrabajo]);

  const persistirDatos = async (dataToPersist: Formato3Data) => {
    try {
      setCargando(true);
      const response = await actualizarFormato3(idPapelTrabajo, dataToPersist);
      setDatos(response.data);
      message.success('Cambios guardados exitosamente.');
    } catch (error) {
      message.error('Error al guardar los cambios.');
      console.error('Error persisting formato data:', error);
      cargarDatos(); // Recargar los datos en caso de error
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, [cargarDatos]);

  return {
    datos,
    cargando,
    persistirDatos,
  };
};

export default useFormato3;