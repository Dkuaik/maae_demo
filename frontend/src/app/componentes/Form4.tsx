'use client';
import React, { useState } from 'react';
import { Table, Button, Tag, Popconfirm, Space, Spin, Typography, Row, Col } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import useFormato4, { ActividadControl } from '../hooks/useFormato4';
import Formato4Modal from './Formato4Modal';

interface Formato4Props {
  idPapelTrabajo: string;
  nombreCgti: string;
}

const { Title } = Typography;

// Función utilitaria para mostrar el error tolerable correctamente y evitar NaN%
function formatErrorTolerable(value: string | number | undefined | null): string {
  const num = Number(value);
  if (isNaN(num)) return '0%';
  return `${num}%`;
}

const Formato4: React.FC<Formato4Props> = ({ idPapelTrabajo, nombreCgti }) => {
  const { datos, cargando, persistirDatos } = useFormato4(idPapelTrabajo);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentEditItem, setCurrentEditItem] = useState<ActividadControl | null>(null);

  const handleModalSubmit = async (values: ActividadControl) => {
    if (datos) {
      const actividadesActualizadas = currentEditItem
        ? datos.actividadesControl.map((actividad) =>
            actividad.id === currentEditItem.id ? { ...actividad, ...values } : actividad
          )
        : [...datos.actividadesControl, { ...values, id: undefined }];
      await persistirDatos(datos.id, { ...datos, actividadesControl: actividadesActualizadas });
      setModalVisible(false);
      setCurrentEditItem(null);
    }
  };

  const handleDeleteActividad = async (id: number | undefined) => {
    if (datos && id !== undefined) {
      const actividadesActualizadas = datos.actividadesControl.filter((actividad) => actividad.id !== id);
      await persistirDatos(datos.id, { ...datos, actividadesControl: actividadesActualizadas });
    }
  };

  if (cargando) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
        <Spin size="large" tip="Cargando Formato 4..." />
      </div>
    );
  }

  return (
    <div style={{ padding: '16px' }}>
      <Title level={3} style={{ marginBottom: 16 }}>
        Formato 4 para {nombreCgti}
      </Title>
      
      <Table
        dataSource={[
          {
            nombreCgti: datos?.nombreCgti,
            errorTolerable: formatErrorTolerable(datos?.errorTolerable),
            conclusion: datos?.actividadesControl.reduce((acc, actividad) => acc + actividad.ponderacion, 0) === 1
              ? 'Se concluye que el control es EFECTIVO.'
              : 'Se concluye que el control NO ES EFECTIVO.',
            resultado: (
              <Tag color="blue">
                {datos?.actividadesControl.reduce((acc, actividad) => acc + actividad.ponderacion, 0) === 1
                  ? 'EFECTIVO'
                  : 'NO EFECTIVO'}
              </Tag>
            ),
          },
        ]}
        columns={[
          { 
            title: 'Nombre CGTI', 
            dataIndex: 'nombreCgti', 
            key: 'nombreCgti',
            width: 150,
            ellipsis: true,
          },
          { 
            title: 'Error Tolerable', 
            dataIndex: 'errorTolerable', 
            key: 'errorTolerable',
            width: 120,
          },
          { 
            title: 'Conclusión', 
            dataIndex: 'conclusion', 
            key: 'conclusion',
            width: 300,
            ellipsis: true,
          },
          { 
            title: 'Resultado', 
            dataIndex: 'resultado', 
            key: 'resultado',
            width: 120,
          },
        ]}
        pagination={false}
        scroll={{ x: 690 }}
        size="small"
        style={{ marginBottom: 24 }}
      />
      
      <Row 
        justify="space-between" 
        align="middle" 
        style={{ 
          marginBottom: 16,
          flexWrap: 'wrap',
          gap: 8
        }}
      >
        <Col xs={24} sm={12}>
          <Title level={4} style={{ margin: 0 }}>
            Actividades de Control
          </Title>
        </Col>
        <Col xs={24} sm={12} style={{ textAlign: 'left' }}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setCurrentEditItem(null);
              setModalVisible(true);
            }}
            style={{marginBottom: 16,backgroundColor: '#08843c', borderColor: '#4CAF50', color: '#fff'}}
          >
            Agregar Actividad
          </Button>
        </Col>
      </Row>
      
      <Table
        dataSource={datos?.actividadesControl}
        columns={[
          { 
            title: 'ID', 
            dataIndex: 'id', 
            key: 'id',
            width: 80,
          },
          { 
            title: 'Descripción', 
            dataIndex: 'descripcion', 
            key: 'descripcion',
            width: 250,
            ellipsis: true,
          },
          {
            title: '% Efectividad',
            dataIndex: 'porcentajeEfectividad',
            key: 'porcentajeEfectividad',
            width: 120,
            render: (valor: number) => `${(valor * 100).toFixed(0)}%`,
          },
          {
            title: 'Ponderación',
            dataIndex: 'ponderacion',
            key: 'ponderacion',
            width: 120,
            render: (valor: number) => `${(valor * 100).toFixed(0)}%`,
          },
          {
            title: 'Acciones',
            key: 'acciones',
            width: 180,
            render: (_: unknown, record: ActividadControl) => (
              <Space size="small">
                <Button
                  className="btn-editar"
                  color="primary"
                  variant='outlined'
                  icon={<EditOutlined />}
                  size="small"
                  onClick={() => {
                    setCurrentEditItem(record);
                    setModalVisible(true);
                  }}
                >
                  Editar
                </Button>
                <Popconfirm
                  title="¿Estás seguro de eliminar esta actividad?"
                  onConfirm={() => handleDeleteActividad(record.id)}
                  okText="Sí"
                  cancelText="No"
                >
                  <Button 
                    className="btn-eliminar"
                    danger 
                    icon={<DeleteOutlined />} 
                    size="small"
                  >
                    Eliminar
                  </Button>
                </Popconfirm>
              </Space>
            ),
          },
        ]}
        rowKey="id"
        pagination={false}
        scroll={{ x: 750 }}
        size="small"
      />
      
      <Formato4Modal
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setCurrentEditItem(null);
        }}
        onSubmit={handleModalSubmit}
        initialValues={currentEditItem}
      />

      <style jsx>{`
        @media (max-width: 576px) {
          :global(.ant-col) {
            text-align: center !important;
          }
          
          :global(.ant-btn) {
            width: 100% !important;
            max-width: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Formato4;