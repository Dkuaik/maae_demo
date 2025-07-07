import React from 'react';
import { Table } from 'antd';
import { MatrizData } from '../hooks/useMatriz';

interface MatrizGeneralTableProps {
  data: MatrizData[];
}

const MatrizGeneralTable: React.FC<MatrizGeneralTableProps> = ({ data }) => {
  const columnas = [
    {
      title: 'ID CGTI',
      dataIndex: 'cgti_id',
      key: 'cgti_id',
      width: 100,
      render: (text: string) => (
        <span className="block text-center break-words">{text}</span>
      ),
    },
    {
      title: 'Nombre CGTI',
      dataIndex: 'cgti_nombre',
      key: 'cgti_nombre',
      width: 250,
      render: (text: string) => (
        <span className="block break-words max-w-xs sm:max-w-md md:max-w-lg">{text}</span>
      ),
    },
    {
      title: 'Año',
      dataIndex: 'cgti_anio',
      key: 'cgti_anio',
      width: 100,
      render: (text: string) => (
        <span className="block text-center">{text}</span>
      ),
    },
    {
      title: 'Documentación',
      dataIndex: 'link_documentacion',
      key: 'link_documentacion',
      render: (text: string) => (
        <a
          href={text}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline break-all"
        >
          Enlace documentación
        </a>
      ),
    },
  ];

  return (
    <div className="overflow-x-auto rounded shadow bg-white p-4">
      <Table
        columns={columnas}
        dataSource={data}
        rowKey="cgti_id"
        bordered
        size="middle"
        pagination={{ pageSize: 10, position: ['bottomCenter'] }}
        className="min-w-[500px] w-full"
        scroll={{ x: true }}
        locale={{ emptyText: 'No hay datos para mostrar.' }}
      />
    </div>
  );
};

export default MatrizGeneralTable;