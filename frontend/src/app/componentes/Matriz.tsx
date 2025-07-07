'use client';
import React from 'react';
import { Spin } from 'antd';
import useMatriz from '../hooks/useMatriz';
import MatrizGeneralTable from './MatrizGeneralTable';
import PapelesTrabajoTable from './PapelesTrabajoTable';
import RiesgosTable from './RiesgosTable';
import ActividadesControlTable from './ActividadesControlTable';

interface MatrizProps {
  cgti: string;
  anio: number;
  papelTrabajo: string;
}

const Matriz: React.FC<MatrizProps> = ({ cgti, anio, papelTrabajo }) => {
  const { datos, cargando } = useMatriz(anio, cgti);

  if (cargando) {
    return (
      <div className="flex justify-center items-center min-h-[180px] w-full">
        <Spin tip="Cargando matriz completa..." size="large" />
      </div>
    );
  }

  // Puedes usar la variable papelTrabajo como desees, aquí solo se imprime por debug
  console.log("Papel de Trabajo:", papelTrabajo);

  return (
    <div className="w-full max-w-full p-2 md:p-6">
      <div className="mb-8">
        <MatrizGeneralTable data={datos} />
      </div>
      <div className="flex flex-col gap-8">
        {datos.map((matriz) =>
          matriz.papeles_trabajo.map((papel) => (
            <div key={papel.id} className="overflow-x-auto rounded shadow bg-white p-4">
              <PapelesTrabajoTable
                data={[papel]}
                onExpand={(papel) => (
                  <RiesgosTable
                    data={papel.riesgos}
                    onExpand={(riesgo) => (
                      <ActividadesControlTable data={riesgo.actividades_control || []} />
                    )}
                  />
                )}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Matriz;