import React from 'react';
import { Table } from 'antd';
import { ActividadControl } from '../hooks/useMatriz';

interface ActividadesControlTableProps {
  data: ActividadControl[];
}

const ActividadesControlTable: React.FC<ActividadesControlTableProps> = ({ data }) => {
  const columnas = [
    {
      title: 'ID Actividad',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: (text: string) => (
        <span className="block text-center break-words">{text}</span>
      ),
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion_actividad_control',
      key: 'descripcion_actividad_control',
      width: 300,
      render: (text: string) => (
        <span className="block break-words max-w-xs sm:max-w-md md:max-w-lg">
          {text}
        </span>
      ),
    },
    {
      title: 'Tipo Control',
      dataIndex: 'tipo_control',
      key: 'tipo_control',
      render: (text: string) => (
        <span className="block break-words max-w-xs sm:max-w-md">{text}</span>
      ),
    },
    {
      title: 'Ejecución',
      dataIndex: 'ejecucion_control',
      key: 'ejecucion_control',
      render: (text: string) => (
        <span className="block break-words max-w-xs sm:max-w-md">{text}</span>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto rounded shadow bg-white p-4">
      <Table
        columns={columnas}
        dataSource={data}
        rowKey="id"
        bordered
        size="middle"
        pagination={{ pageSize: 10, position: ['bottomCenter'] }}
        className="min-w-[500px] w-full"
        scroll={{ x: true }}
        locale={{ emptyText: 'No hay actividades de control para mostrar.' }}
      />
    </div>
  );
};

export default ActividadesControlTable;