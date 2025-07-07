import { useState, useEffect } from 'react';
import { message } from 'antd';
import {
  obtenerFormato1,
  crearRegistroFormato1,
  actualizarRegistroFormato1,
  eliminarRegistroFormato1,
} from '../services/Formato1Service';

interface Registro {
  id: number;
  nombreCgti: string;
  errorTolerable: number;
  descripcionUniverso: string;
  descripcionMuestra: string;
}

export const useFormato1 = (idPapelTrabajo: string) => {
  const [datos, setDatos] = useState<Registro[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      setCargando(true);
      try {
        const respuesta = await obtenerFormato1(idPapelTrabajo);
        setDatos(respuesta.data);
      } catch {
        message.error('Error al cargar los datos');
      } finally {
        setCargando(false);
      }
    };

    if (idPapelTrabajo) {
      cargarDatos();
    }
  }, [idPapelTrabajo]);

  const crearRegistro = async (payload: Omit<Registro, 'id'>) => {
    try {
      setCargando(true);
      const respuesta = await crearRegistroFormato1(idPapelTrabajo, payload);
      setDatos((prevDatos) => [...prevDatos, respuesta.data]);
      message.success('Registro creado exitosamente');
    } catch {
      message.error('Error al crear el registro');
    } finally {
      setCargando(false);
    }
  };

  const actualizarRegistro = async (id: number, payload: Partial<Registro>) => {
    try {
      setCargando(true);
      const respuesta = await actualizarRegistroFormato1(idPapelTrabajo, id, payload);
      setDatos((prevDatos) =>
        prevDatos.map((registro) =>
          registro.id === id ? { ...registro, ...respuesta.data } : registro
        )
      );
      message.success('Registro actualizado exitosamente');
    } catch {
      message.error('Error al actualizar el registro');
    } finally {
      setCargando(false);
    }
  };

  const eliminarRegistro = async (id: number) => {
    try {
      setCargando(true);
      await eliminarRegistroFormato1(idPapelTrabajo, id);
      setDatos((prevDatos) => prevDatos.filter((registro) => registro.id !== id));
      message.success('Registro eliminado exitosamente');
    } catch {
      message.error('Error al eliminar el registro');
    } finally {
      setCargando(false);
    }
  };

  return {
    datos,
    cargando,
    crearRegistro,
    actualizarRegistro,
    eliminarRegistro,
  };
};