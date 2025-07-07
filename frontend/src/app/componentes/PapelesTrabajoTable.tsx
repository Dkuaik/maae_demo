import React from 'react';
import { Table } from 'antd';
import { PapelTrabajo } from '../hooks/useMatriz';

interface PapelesTrabajoTableProps {
  data: PapelTrabajo[];
  onExpand: (papel: PapelTrabajo) => React.ReactNode;
}

const PapelesTrabajoTable: React.FC<PapelesTrabajoTableProps> = ({ data, onExpand }) => {
  const columnas = [
    {
      title: 'ID Papel',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: 'Papel de Trabajo',
      dataIndex: 'title',
      key: 'title',
      width: 120,
    },
    {
      title: 'Descripción',
      dataIndex: 'description',
      key: 'description',
      render: (value: string | null) => value || <span style={{ color: 'gray' }}>N/A</span>,
    },
    {
      title: 'Objetivo Control',
      dataIndex: 'objetivo_control',
      key: 'objetivo_control',
      width: 200,
    },
    {
      title: 'Efectividad',
      dataIndex: 'promedio_efectividad',
      key: 'promedio_efectividad',
      render: (text: string) => `${(parseFloat(text) * 100).toFixed(0)}%`,
      width: 120,
    },
    {
      title: 'Efectividad Operativa',
      dataIndex: 'efectividad_operativa',
      key: 'efectividad_operativa',
      render: (value: string | null) => value || <span style={{ color: 'gray' }}>N/A</span>,
    },
  ];

  return (
    <Table
      columns={columnas}
      dataSource={data}
      rowKey="id"
      bordered
      size="small"
      expandable={{ expandedRowRender: onExpand }}
    />
  );
};

export default PapelesTrabajoTable;