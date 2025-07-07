'use client';
import React from 'react';
import { Modal, Form, Input, Button, Select, Space } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
// Importar los tipos desde el hook
import { ActividadControl, Evidencia } from '../hooks/useFormato3';

// Tipos para los valores del formulario (sin id en campos complementarios)
type ActividadFormValues = {
  nombre: string;
};

type EvidenciaFormValues = {
  resultado: string;
  comentarios: string;
  campos_complementarios: Array<{
    nombre_campo: string;
    contenido: string;
  }>;
};

type Formato3ModalProps = {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: ActividadFormValues | EvidenciaFormValues) => void;
  modalType: 'actividad' | 'evidencia';
  initialValues?: ActividadControl | Evidencia | null;
};

const Formato3Modal: React.FC<Formato3ModalProps> = ({
  visible,
  onCancel,
  onSubmit,
  modalType,
  initialValues = null,
}) => {
  const [form] = Form.useForm<ActividadFormValues | EvidenciaFormValues>();

  React.useEffect(() => {
    if (initialValues) {
      if (modalType === 'actividad') {
        const actividadValues = initialValues as ActividadControl;
        form.setFieldsValue({
          nombre: actividadValues.nombre,
        });
      } else {
        const evidenciaValues = initialValues as Evidencia;
        // Convertir campos complementarios removiendo el id para el formulario
        const camposSinId = evidenciaValues.campos_complementarios?.map(({ nombre_campo, contenido }) => ({
          nombre_campo,
          contenido,
        })) || [];
        
        form.setFieldsValue({
          resultado: evidenciaValues.resultado,
          comentarios: evidenciaValues.comentarios,
          campos_complementarios: camposSinId,
        });
      }
    } else {
      form.resetFields();
    }
  }, [initialValues, form, modalType]);

  return (
    <Modal
      title={`${modalType === 'actividad' ? 'Actividad' : 'Evidencia'} ${initialValues ? 'Editar' : 'Crear'}`}
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      destroyOnClose
    >
      <Form 
        form={form} 
        layout="vertical" 
        onFinish={onSubmit}
        initialValues={
          modalType === 'evidencia' 
            ? { campos_complementarios: [] } 
            : undefined
        }
      >
        {modalType === 'actividad' ? (
          <Form.Item
            label="Nombre de la Actividad"
            name="nombre"
            rules={[{ required: true, message: 'Por favor, ingresa el nombre de la actividad.' }]}
          >
            <Input />
          </Form.Item>
        ) : (
          <>
            <Form.Item
              label="Resultado"
              name="resultado"
              rules={[{ required: true, message: 'Por favor, selecciona un resultado.' }]}
            >
              <Select placeholder="Selecciona un resultado">
                <Select.Option value="P">Cumple (P)</Select.Option>
                <Select.Option value="X">No se presentó el evento (X)</Select.Option>
                <Select.Option value="K">No Aplica (K)</Select.Option>
                <Select.Option value="O">No Cumple (O)</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item 
              label="Comentarios" 
              name="comentarios"
              rules={[{ required: true, message: 'Por favor, ingresa los comentarios.' }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item label="Campos Complementarios">
              <Form.List name="campos_complementarios">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} align="baseline" style={{ display: 'flex', marginBottom: 8 }}>
                        <Form.Item
                          {...restField}
                          name={[name, 'nombre_campo']}
                          rules={[{ required: true, message: 'Campo requerido.' }]}
                          style={{ marginBottom: 0 }}
                        >
                          <Input placeholder="Nombre del Campo" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'contenido']}
                          rules={[{ required: true, message: 'Contenido requerido.' }]}
                          style={{ marginBottom: 0 }}
                        >
                          <Input placeholder="Contenido" />
                        </Form.Item>
                        <Button 
                          danger 
                          onClick={() => remove(name)} 
                          icon={<DeleteOutlined />} 
                          size="small"
                        />
                      </Space>
                    ))}
                    <Button 
                      type="dashed" 
                      onClick={() => add()} 
                      block 
                      icon={<PlusOutlined />}
                      style={{ marginTop: 8 }}
                    >
                      Agregar Campo Complementario
                    </Button>
                  </>
                )}
              </Form.List>
            </Form.Item>
          </>
        )}
      </Form>
    </Modal>
  );
};

export default Formato3Modal;