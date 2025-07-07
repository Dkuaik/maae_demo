import { useState } from 'react';
import { 
  obtenerPapelesDeTrabajo,
  crearPapelDeTrabajo,
  editarPapelDeTrabajo,
  eliminarPapelDeTrabajo,
  PapelDeTrabajo
} from '../services/PapelTrabajoService';

export const usePapelTrabajo = () => {
  const [papelesTrabajo, setPapelesTrabajo] = useState<PapelDeTrabajo[]>([]);
  const [papelSeleccionado, setPapelSeleccionado] = useState<PapelDeTrabajo | null>(null);
  const [cargando, setCargando] = useState(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [eliminandoId, setEliminandoId] = useState<number | null>(null);

  const cargarPapeles = async (cgti: string, anio: number) => {
    setCargando(true);
    try {
      const papeles = await obtenerPapelesDeTrabajo(cgti, anio);
      setPapelesTrabajo(papeles);
    } catch (error) {
      console.error("Error cargando papeles:", error);
    } finally {
      setCargando(false);
    }
  };

  const crearNuevoPapel = async (nombre: string, cgtiId: number) => {
    try {
      const nuevoPapel = await crearPapelDeTrabajo(nombre, cgtiId);
      setPapelesTrabajo(prev => [...prev, nuevoPapel]);
      return nuevoPapel;
    } catch (error) {
      console.error("Error creando papel:", error);
      throw error;
    }
  };

  const actualizarPapel = async (id: number, nombre: string, cgtiId: number) => {
    try {
      const papelActualizado = await editarPapelDeTrabajo(id, nombre, cgtiId);
      setPapelesTrabajo(prev => 
        prev.map(p => p.id === id ? papelActualizado : p)
      );
      return papelActualizado;
    } catch (error) {
      console.error("Error actualizando papel:", error);
      throw error;
    }
  };

  const eliminarPapel = async (id: number) => {
    setEliminandoId(id);
    try {
      await eliminarPapelDeTrabajo(id);
      setPapelesTrabajo(prev => prev.filter(p => p.id !== id));
      if (papelSeleccionado?.id === id) {
        setPapelSeleccionado(null);
      }
    } catch (error) {
      console.error("Error eliminando papel:", error);
      throw error;
    } finally {
      setEliminandoId(null);
    }
  };

  return {
    papelesTrabajo,
    papelSeleccionado,
    cargando,
    editandoId,
    nuevoNombre,
    eliminandoId,
    setPapelSeleccionado,
    setEditandoId,
    setNuevoNombre,
    cargarPapeles,
    crearNuevoPapel,
    actualizarPapel,
    eliminarPapel
  };
};