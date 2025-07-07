import { useState, useEffect, useCallback } from 'react';
import { message } from 'antd';
import {
  obtenerNormaFormato2,
  obtenerFactoresFormato2,
  actualizarNormaFormato2,
  crearFactorFormato2,
  actualizarFactorFormato2,
  eliminarFactorFormato2,
} from '../services/Formato2Service';

// Define la estructura del Factor
export interface Factor {
  id: number;
  tipoFactor: string;
  ponderacion: number;
  resultado: number;
}

// Define la estructura de los datos del Formato2
export interface Formato2Data {
  nombreCgti: string;
  nombreNorma: string;
  factores: Factor[];
}

const useFormato2 = (idPapelTrabajo: string) => {
  const [datos, setDatos] = useState<Formato2Data | null>(null); // Datos generales del Formato2
  const [cargando, setCargando] = useState(true); // Estado de carga

  const cargarDatos = useCallback(async () => {
    setCargando(true);
    try {
      const [resNorma, resFactores] = await Promise.all([
        obtenerNormaFormato2(idPapelTrabajo),
        obtenerFactoresFormato2(idPapelTrabajo),
      ]);
      setDatos({
        ...resNorma.data,
        factores: resFactores.data,
      });
      message.success('Datos cargados correctamente');
    } catch (error) {
      console.error('Error al cargar los datos:', error);
      message.error('Error al cargar los datos');
    } finally {
      setCargando(false);
    }
  }, [idPapelTrabajo]); // Memoizar la función con idPapelTrabajo como dependencia

  useEffect(() => {
    if (idPapelTrabajo) {
      cargarDatos();
    }
  }, [idPapelTrabajo, cargarDatos]); // Agregar cargarDatos como dependencia

  const actualizarNorma = async (nombreNorma: string) => {
    try {
      setCargando(true);
      await actualizarNormaFormato2(idPapelTrabajo, { ...datos, nombreNorma });
      message.success('Norma actualizada correctamente');
      cargarDatos();
    } catch (error) {
      console.error('Error al actualizar la norma:', error);
      message.error('Error al actualizar la norma');
    } finally {
      setCargando(false);
    }
  };

  const crearFactor = async (factor: Omit<Factor, 'id'>) => {
    try {
      setCargando(true);
      const respuesta = await crearFactorFormato2(idPapelTrabajo, factor);
      setDatos((prevDatos) => {
        if (!prevDatos) return null;
        return {
          ...prevDatos,
          factores: [...prevDatos.factores, respuesta.data],
        };
      });
      message.success('Factor creado correctamente');
    } catch (error) {
      console.error('Error al crear el factor:', error);
      message.error('Error al crear el factor');
    } finally {
      setCargando(false);
    }
  };

  const actualizarFactor = async (id: number, factor: Omit<Factor, 'id'>) => {
    try {
      setCargando(true);
      const respuesta = await actualizarFactorFormato2(idPapelTrabajo, id, factor);
      setDatos((prevDatos) => {
        if (!prevDatos) return null;
        return {
          ...prevDatos,
          factores: prevDatos.factores.map((f) =>
            f.id === id ? { ...f, ...respuesta.data } : f
          ),
        };
      });
      message.success('Factor actualizado correctamente');
    } catch (error) {
      console.error('Error al actualizar el factor:', error);
      message.error('Error al actualizar el factor');
    } finally {
      setCargando(false);
    }
  };

  const eliminarFactor = async (id: number) => {
    try {
      setCargando(true);
      await eliminarFactorFormato2(idPapelTrabajo, id);
      setDatos((prevDatos) => {
        if (!prevDatos) return null;
        return {
          ...prevDatos,
          factores: prevDatos.factores.filter((f) => f.id !== id),
        };
      });
      message.success('Factor eliminado correctamente');
    } catch (error) {
      console.error('Error al eliminar el factor:', error);
      message.error('Error al eliminar el factor');
    } finally {
      setCargando(false);
    }
  };

  return {
    datos,
    cargando,
    cargarDatos,
    actualizarNorma,
    crearFactor,
    actualizarFactor,
    eliminarFactor,
  };
};

export default useFormato2;