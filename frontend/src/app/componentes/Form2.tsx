'use client';
import React, { useState } from 'react';
import {
  Table,
  Tag,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Spin,
  Space,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import useFormato2, { Factor } from '../hooks/useFormato2';

// Tipos para los formularios
interface NormaFormValues {
  nombreNorma: string;
}

interface FactorFormValues {
  tipoFactor: string;
  ponderacion: number;
  resultado: number;
}

type PropsForm2 = {
  nombreCgti: string;
  anio: number;
  idPapelTrabajo: string;
};

const Form2: React.FC<PropsForm2> = ({ idPapelTrabajo }) => {
  const {
    datos,
    cargando,
    actualizarNorma,
    crearFactor,
    actualizarFactor,
    eliminarFactor,
  } = useFormato2(idPapelTrabajo);

  const [modalNormaAbierto, setModalNormaAbierto] = useState(false);
  const [modalFactorAbierto, setModalFactorAbierto] = useState(false);
  const [factorEditando, setFactorEditando] = useState<Factor | null>(null);
  const [formNorma] = Form.useForm<NormaFormValues>();
  const [formFactor] = Form.useForm<FactorFormValues>();

  // Calcula la suma de los resultados de los factores
  const sumaResultado =
    datos?.factores.reduce((acc, factor) => acc + factor.resultado, 0) || 0;
  const cumple = sumaResultado === 100;

  const handleNormaSubmit = (values: NormaFormValues) => {
    actualizarNorma(values.nombreNorma);
    setModalNormaAbierto(false);
  };

  const handleFactorSubmit = (values: FactorFormValues) => {
    if (factorEditando) {
      actualizarFactor(factorEditando.id, values);
    } else {
      crearFactor(values);
    }
    setModalFactorAbierto(false);
  };

  if (cargando) {
    return (
      <div className="flex justify-center items-center min-h-[120px] w-full">
        <Spin tip="Cargando datos del formato 2..." />
      </div>
    );
  }

  // Columnas para la tabla principal (Norma)
  const columnsNorma = [
    {
      title: 'CGTI',
      dataIndex: 'nombreCgti',
      key: 'nombreCgti',
      className: 'break-all',
      render: (text: string) => (
        <span className="break-all whitespace-normal block max-w-xs sm:max-w-sm md:max-w-md">
          {text}
        </span>
      ),
    },
    {
      title: 'Norma',
      dataIndex: 'nombreNorma',
      key: 'nombreNorma',
      className: 'break-all',
      render: (text: string) => (
        <span className="break-all whitespace-normal block max-w-xs sm:max-w-sm md:max-w-md">
          {text}
        </span>
      ),
    },
    {
      title: 'Resultado del diseño',
      key: 'resultado',
      render: () => (
        <Tag color={cumple ? 'green' : 'red'}>
          {cumple ? 'Cumple' : 'No cumple'} ({sumaResultado.toFixed(2)})
        </Tag>
      ),
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: () => (
        <Button
          type="primary"
          icon={<EditOutlined />}
          className="btn-editar"
          onClick={() => {
            formNorma.setFieldsValue({ nombreNorma: datos?.nombreNorma });
            setModalNormaAbierto(true);
          }}
          size="small"
        >
          Editar Norma
        </Button>
      ),
    },
  ];

  // Columnas para la tabla de factores
  const columnsFactores = [
    {
      title: 'Tipo de Factor',
      dataIndex: 'tipoFactor',
      key: 'tipoFactor',
      className: 'break-all',
      render: (text: string) => (
        <span className="break-all whitespace-normal block max-w-xs sm:max-w-sm md:max-w-md">
          {text}
        </span>
      ),
    },
    {
      title: 'Ponderación',
      dataIndex: 'ponderacion',
      key: 'ponderacion',
    },
    {
      title: 'Resultado',
      dataIndex: 'resultado',
      key: 'resultado',
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_: unknown, record: Factor) => (
        <Space>
          <Button
            className="btn-editar"
            color="primary"
            icon={<EditOutlined />}
            variant='outlined'
            onClick={() => {
              setFactorEditando(record);
              formFactor.setFieldsValue(record);
              setModalFactorAbierto(true);
            }}
            size="small"
          >
            Editar
          </Button>
          <Popconfirm
            title="¿Eliminar este factor?"
            onConfirm={() => eliminarFactor(record.id)}
          >
            <Button danger icon={<DeleteOutlined />} className="btn-eliminar" size="small">
              Eliminar
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full max-w-full p-2 md:p-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            formFactor.resetFields();
            setFactorEditando(null);
            setModalFactorAbierto(true);
          }}
          className="bg-green-700 border-green-600 text-white w-full sm:w-auto"
          style={{
            backgroundColor: '#08843c',
            borderColor: '#4CAF50',
            color: '#fff',
          }}
        >
          Nuevo Factor
        </Button>
      </div>

      {/* Tabla principal: Norma */}
      <div className="overflow-x-auto rounded shadow bg-white">
        <Table
          className="min-w-[400px] w-full"
          columns={columnsNorma}
          dataSource={datos ? [{ key: 'norma', ...datos }] : []}
          pagination={false}
          bordered
          size="middle"
          scroll={{ x: true }}
        />
      </div>

      {/* Tabla de Factores */}
      <div className="overflow-x-auto rounded shadow bg-white mt-5">
        <Table
          className="min-w-[600px] w-full"
          style={{ marginTop: 20 }}
          columns={columnsFactores}
          dataSource={datos?.factores || []}
          rowKey="id"
          bordered
          pagination={{ pageSize: 5, position: ['bottomCenter'] }}
          scroll={{ x: true }}
        />
      </div>

      {/* Modal para editar la norma */}
      <Modal
        title="Editar Norma"
        open={modalNormaAbierto}
        onCancel={() => setModalNormaAbierto(false)}
        onOk={() => formNorma.submit()}
      >
        <Form<NormaFormValues>
          form={formNorma}
          layout="vertical"
          onFinish={handleNormaSubmit}
        >
          <Form.Item
            label="Nombre de la Norma"
            name="nombreNorma"
            rules={[{ required: true, message: 'Por favor, ingrese el nombre de la norma' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal para crear/editar factores */}
      <Modal
        title={factorEditando ? 'Editar Factor' : 'Nuevo Factor'}
        open={modalFactorAbierto}
        onCancel={() => setModalFactorAbierto(false)}
        onOk={() => formFactor.submit()}
      >
        <Form<FactorFormValues>
          form={formFactor}
          layout="vertical"
          onFinish={handleFactorSubmit}
        >
          <Form.Item
            label="Tipo de Factor"
            name="tipoFactor"
            rules={[{ required: true, message: 'Por favor, ingrese el tipo de factor' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ponderación"
            name="ponderacion"
            rules={[
              { required: true, message: 'Por favor, ingrese la ponderación' },
              {
                type: 'number',
                min: 0,
                max: 100,
                message: 'La ponderación debe estar entre 0 y 100',
              },
            ]}
          >
            <InputNumber min={0} max={100} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            label="Resultado (0 a 100)"
            name="resultado"
            rules={[
              { required: true, message: 'Por favor, ingrese el resultado' },
              {
                type: 'number',
                min: 0,
                max: 100,
                message: 'El resultado debe estar entre 0 y 100',
              },
            ]}
          >
            <InputNumber min={0} max={100} style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Form2;