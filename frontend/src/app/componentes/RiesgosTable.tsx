import React from 'react';
import { Table, Tag } from 'antd';
import { Riesgo } from '../hooks/useMatriz';

interface RiesgosTableProps {
  data: Riesgo[];
  onExpand: (riesgo: Riesgo) => React.ReactNode;
}

const RiesgosTable: React.FC<RiesgosTableProps> = ({ data, onExpand }) => {
  const columnas = [
    {
      title: 'ID Riesgo',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: (text: string) => (
        <span className="block text-center break-words">{text}</span>
      ),
    },
    {
      title: 'Factores',
      dataIndex: 'factores',
      key: 'factores',
      render: (value: string | null) =>
        value ? (
          <span className="block break-words max-w-xs sm:max-w-md">{value}</span>
        ) : (
          <span style={{ color: 'gray' }}>N/A</span>
        ),
    },
    {
      title: 'Impacto',
      dataIndex: 'impacto',
      key: 'impacto',
      render: (text: string) => (
        <Tag color={text.toLowerCase() === 'alto' ? 'red' : text.toLowerCase() === 'medio' ? 'orange' : 'green'}>
          {text}
        </Tag>
      ),
    },
    {
      title: 'Probabilidad',
      dataIndex: 'probabilidad',
      key: 'probabilidad',
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
        expandable={{ expandedRowRender: onExpand }}
        pagination={{ pageSize: 10, position: ['bottomCenter'] }}
        className="min-w-[500px] w-full"
        scroll={{ x: true }}
        locale={{ emptyText: 'No hay riesgos para mostrar.' }}
      />
    </div>
  );
};

export default RiesgosTable;