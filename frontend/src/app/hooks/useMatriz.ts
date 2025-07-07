import { useState, useEffect } from 'react';
import { message } from 'antd';
import { obtenerMatriz } from '../services/MatrizService';

export interface ActividadControl {
  id: number;
  descripcion_actividad_control: string;
  tipo_control: string;
  ejecucion_control: string;
  frecuencia_control: string;
}

export interface Riesgo {
  id: number;
  factores: string | null;
  riesgos: string | null;
  impacto: string;
  probabilidad: string;
  tratamiento_riesgo: string | null;
  actividades_control: ActividadControl[] | null;
  respuesta_riesgo: string | null;
  area_responsable: string | null;
}

export interface PapelTrabajo {
  id: number;
  title: string;
  description: string | null;
  objetivo_control: string;
  resultado_diseño: string | null;
  promedio_efectividad: string;
  riesgos: Riesgo[];
  efectividad_operativa: string | null;
}

export interface MatrizData {
  cgti_id: number;
  cgti_nombre: string;
  cgti_anio: number;
  link_documentacion: string;
  papeles_trabajo: PapelTrabajo[];
}

const useMatriz = (anio: number, cgti: string) => {
  const [datos, setDatos] = useState<MatrizData[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true);
        const respuesta = await obtenerMatriz(anio, cgti);
        setDatos([respuesta.data]);
      } catch (error) {
        message.error('Error al cargar los datos de la matriz.');
        console.error('Error fetching matriz data:', error);
      } finally {
        setCargando(false);
      }
    };

    if (anio && cgti) {
      cargarDatos();
    }
  }, [anio, cgti]);

  return { datos, cargando };
};

export default useMatriz;