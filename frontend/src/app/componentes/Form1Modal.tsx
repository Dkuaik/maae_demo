import React from 'react';
import { Modal, Form, Input, InputNumber, Button, Space } from 'antd';

// Define la interfaz para los valores del formulario (solo campos editables)
interface Formato1FormValues {
  errorTolerable: number;
  descripcionUniverso: string;
  descripcionMuestra: string;
}

// Interfaz para el registro completo
interface Registro {
  id: number;
  nombreCgti: string;
  errorTolerable: number;
  descripcionUniverso: string;
  descripcionMuestra: string;
}

interface Props {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: Formato1FormValues) => void;
  initialValues?: Registro | null;
}

const Formato1Modal: React.FC<Props> = ({ visible, onCancel, onSubmit, initialValues }) => {
  const [formulario] = Form.useForm<Formato1FormValues>();

  // Convertir initialValues de Registro a Formato1FormValues
  const formInitialValues: Formato1FormValues | undefined = initialValues 
    ? {
        errorTolerable: initialValues.errorTolerable,
        descripcionUniverso: initialValues.descripcionUniverso,
        descripcionMuestra: initialValues.descripcionMuestra,
      }
    : undefined;

  return (
    <Modal
      title={initialValues ? 'Editar Registro' : 'Nuevo Registro'}
      open={visible}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
    >
      <Form<Formato1FormValues>
        form={formulario}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={formInitialValues}
      >
        <Form.Item
          name="errorTolerable"
          label="Error Tolerable (%)"
          rules={[{ required: true, message: 'Este campo es requerido' }]}
        >
          <InputNumber min={0} max={100} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item
          name="descripcionUniverso"
          label="Descripción Universo"
          rules={[{ required: true, message: 'Este campo es requerido' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="descripcionMuestra"
          label="Descripción Muestra"
          rules={[{ required: true, message: 'Este campo es requerido' }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              {initialValues ? 'Actualizar' : 'Crear'}
            </Button>
            <Button onClick={onCancel}>Cancelar</Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Formato1Modal;