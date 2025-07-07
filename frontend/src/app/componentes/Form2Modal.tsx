'use client';
import React from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';

type Factor = {
  id?: number;
  tipoFactor: string;
  ponderacion: number;
  resultado: number;
};

type PropsFormato2Modal = {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: Factor) => void;
  initialValues?: Factor | null;
};

const Formato2Modal: React.FC<PropsFormato2Modal> = ({
  visible,
  onCancel,
  onSubmit,
  initialValues,
}) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  return (
    <Modal
      title={initialValues ? 'Editar Factor' : 'Nuevo Factor'}
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
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
  );
};

export default Formato2Modal;