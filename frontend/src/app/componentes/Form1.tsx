import React, { useState } from 'react';
import { Button, Space, Popconfirm, Spin } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useFormato1 } from '../hooks/useFormato1';
import Formato1Modal from './Form1Modal';

interface Registro {
  id: number;
  nombreCgti: string;
  errorTolerable: number;
  descripcionUniverso: string;
  descripcionMuestra: string;
}

interface Formato1FormValues {
  errorTolerable: number;
  descripcionUniverso: string;
  descripcionMuestra: string;
}

interface Props {
  nombreCgti: string;
  anio: number;
  idPapelTrabajo: string;
}

// Función para formatear el error tolerable y evitar null%
function formatErrorTolerable(value: number | null | undefined): string {
  if (value === null || value === undefined || isNaN(Number(value))) {
    return '0%';
  }
  return `${value}%`;
}

const Formato1: React.FC<Props> = ({ nombreCgti, idPapelTrabajo }) => {
  const { datos, cargando, crearRegistro, actualizarRegistro, eliminarRegistro } = useFormato1(idPapelTrabajo);
  const [modalVisible, setModalVisible] = useState(false);
  const [registroEdicion, setRegistroEdicion] = useState<Registro | null>(null);

  const handleSubmit = async (valores: Formato1FormValues) => {
    try {
      if (registroEdicion) {
        await actualizarRegistro(registroEdicion.id, valores);
      } else {
        const nuevoRegistro: Omit<Registro, 'id'> = {
          ...valores,
          nombreCgti: nombreCgti,
        };
        await crearRegistro(nuevoRegistro);
      }
      setModalVisible(false);
      setRegistroEdicion(null);
    } catch (error) {
      console.error('Error en handleSubmit:', error);
    }
  };

  // En móvil solo muestra: CGTI, Error Tolerable y Acciones
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const columnas = [
    { title: 'CGTI', dataIndex: 'nombreCgti', key: 'nombreCgti' },
    {
      title: 'Error Tolerable (%)',
      dataIndex: 'errorTolerable',
      key: 'errorTolerable',
      render: (valor: number | null | undefined) => formatErrorTolerable(valor),
    },
    ...(!isMobile ? [
      { title: 'Descripción Universo', dataIndex: 'descripcionUniverso', key: 'descripcionUniverso' },
      { title: 'Descripción Muestra', dataIndex: 'descripcionMuestra', key: 'descripcionMuestra' }
    ] : []),
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_: unknown, registro: Registro) => (
        <Space>
          <Button
            className="btn-editar"
            icon={<EditOutlined />}
            onClick={() => {
              setRegistroEdicion(registro);
              setModalVisible(true);
            }}
            size={isMobile ? "small" : "middle"}
          >
            Editar
          </Button>
          <Popconfirm
            title="¿Estás seguro de eliminar este registro?"
            onConfirm={() => eliminarRegistro(registro.id)}
            okText="Sí"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />} size={isMobile ? "small" : "middle"}>
              Eliminar
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (cargando) {
    return <div className="flex w-full justify-center py-8"><Spin /></div>;
  }

  return (
    <div className="w-full max-w-full p-2 md:p-4 overflow-x-auto">
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => {
          setRegistroEdicion(null);
          setModalVisible(true);
        }}
        className="mb-4 bg-green-700 border-green-600 text-white w-full md:w-auto"
        style={{ backgroundColor: '#08843c', borderColor: '#4CAF50', color: '#fff' }}
      >
        Nuevo Registro
      </Button>

      <div className="overflow-x-auto rounded shadow bg-white">
        <table className="min-w-[600px] w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              {columnas.map(col => (
                <th key={col.key} className="px-2 py-3 font-semibold">
                  {col.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {datos.map((registro: Registro) => (
              <tr key={registro.id} className="border-b last:border-b-0">
                <td className="px-2 py-2">{registro.nombreCgti}</td>
                <td className="px-2 py-2">{formatErrorTolerable(registro.errorTolerable)}</td>
                {!isMobile && (
                  <>
                    <td className="px-2 py-2 break-words">{registro.descripcionUniverso}</td>
                    <td className="px-2 py-2 break-words">{registro.descripcionMuestra}</td>
                  </>
                )}
                <td className="px-2 py-2">
                  <div className="flex gap-2">
                    <Button
                      className="btn-editar"
                      icon={<EditOutlined />}
                      onClick={() => {
                        setRegistroEdicion(registro);
                        setModalVisible(true);
                      }}
                      size={isMobile ? "small" : "middle"}
                    >
                      Editar
                    </Button>
                    <Popconfirm
                      title="¿Estás seguro de eliminar este registro?"
                      onConfirm={() => eliminarRegistro(registro.id)}
                      okText="Sí"
                      cancelText="No"
                    >
                      <Button danger icon={<DeleteOutlined />} size={isMobile ? "small" : "middle"}>
                        Eliminar
                      </Button>
                    </Popconfirm>
                  </div>
                </td>
              </tr>
            ))}
            {datos.length === 0 && (
              <tr>
                <td colSpan={columnas.length} className="text-center text-gray-400 py-4">
                  No hay registros
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Formato1Modal
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setRegistroEdicion(null);
        }}
        onSubmit={handleSubmit}
        initialValues={registroEdicion}
      />
    </div>
  );
};

export default Formato1;