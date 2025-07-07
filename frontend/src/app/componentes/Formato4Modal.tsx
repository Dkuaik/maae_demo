'use client';
import React from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';
import { ActividadControl } from '../hooks/useFormato4'; // Importar el tipo

const { TextArea } = Input;

interface Formato4ModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: ActividadControl) => void; // Cambiar 'any' por 'ActividadControl'
  initialValues?: ActividadControl | null; // Cambiar 'any' por 'ActividadControl | null'
}

const Formato4Modal: React.FC<Formato4ModalProps> = ({ visible, onCancel, onSubmit, initialValues }) => {
  const [form] = Form.useForm<ActividadControl>();

  React.useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  return (
    <Modal
      title={initialValues ? 'Editar Actividad de Control' : 'Agregar Actividad de Control'}
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText="Guardar"
      cancelText="Cancelar"
    >
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <Form.Item
          name="descripcion"
          label="Descripción"
          rules={[{ required: true, message: 'Por favor, ingresa la descripción.' }]}
        >
          <TextArea rows={2} />
        </Form.Item>
        <Form.Item
          name="porcentajeEfectividad"
          label="% Efectividad"
          rules={[{ required: true, message: 'Por favor, ingresa el porcentaje de efectividad.' }]}
        >
          <InputNumber min={0} max={1} step={0.01} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="ponderacion"
          label="Ponderación (%)"
          rules={[{ required: true, message: 'Por favor, ingresa la ponderación.' }]}
        >
          <InputNumber min={0} max={1} step={0.01} style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Formato4Modal;