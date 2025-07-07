import React from 'react';
import { List, Card, Button, Input, Popconfirm, Typography, Spin } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { PapelDeTrabajo } from '../services/PapelTrabajoService';

const { Text } = Typography;

interface PapelTrabajoListProps {
  papeles: PapelDeTrabajo[];
  papelSeleccionado: PapelDeTrabajo | null;
  cargando: boolean;
  editandoId: number | null;
  nuevoNombre: string;
  eliminandoId: number | null;
  onSeleccionar: (papel: PapelDeTrabajo) => void;
  onIniciarEdicion: (papel: PapelDeTrabajo) => void;
  onGuardarEdicion: () => void;
  onCancelarEdicion: () => void;
  onEliminar: (id: number) => void;
  onNombreChange: (nombre: string) => void;
}

export const PapelTrabajoList: React.FC<PapelTrabajoListProps> = ({
  papeles,
  papelSeleccionado,
  cargando,
  editandoId,
  nuevoNombre,
  eliminandoId,
  onSeleccionar,
  onIniciarEdicion,
  onGuardarEdicion,
  onCancelarEdicion,
  onEliminar,
  onNombreChange,
}) => {
  if (cargando) {
    return (
      <div className="text-center p-4">
        <Spin size="large" />
        <p className="mt-2">Cargando papeles de trabajo...</p>
      </div>
    );
  }

  if (!cargando && papeles.length === 0) {
    return (
      <div className="text-center p-4 text-gray-500">
        <p>No se encontraron papeles de trabajo para esta selección.</p>
      </div>
    );
  }

  return (
    <List
      grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }}
      dataSource={papeles}
      renderItem={(papel) => (
        <List.Item key={papel.id}>
          <Card
            hoverable
            size="small"
            className={`text-center cursor-pointer transition-all duration-200 ease-in-out ${
              papelSeleccionado?.id === papel.id ? '' : 'border-transparent'
            }`}
            style={{
              borderColor:
                editandoId === papel.id
                  ? '#d68f48'
                  : papelSeleccionado?.id === papel.id
                  ? '#C08040'
                  : 'transparent',
            }}
            onClick={() => onSeleccionar(papel)}
          >
            {editandoId === papel.id ? (
              <div className="flex flex-col gap-2">
                <Input
                  value={nuevoNombre}
                  onChange={(e) => onNombreChange(e.target.value)}
                  onPressEnter={onGuardarEdicion}
                  autoFocus
                />
                <div className="flex gap-2 justify-center">
                  <Button
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      onGuardarEdicion();
                    }}
                    className="btn-guardar"
                  >
                    Guardar
                  </Button>
                  <Button
                    size="small"
                    danger
                    onClick={(e) => {
                      e.stopPropagation();
                      onCancelarEdicion();
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col">
                <Text>{papel.nombre}</Text>
                <div className="flex gap-2 justify-center mt-2">
                  <Button
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      onIniciarEdicion(papel);
                    }}
                    className="btn-editar"
                    icon={<EditOutlined />}
                  >
                    Editar
                  </Button>
                  <Popconfirm
                    title="¿Estás seguro de eliminar este papel de trabajo?"
                    onConfirm={(e) => {
                      e?.stopPropagation();
                      onEliminar(papel.id);
                    }}
                    onCancel={(e) => e?.stopPropagation()}
                    okText="Sí"
                    cancelText="No"
                  >
                    <Button
                      size="small"
                      className="btn-eliminar"
                      onClick={(e) => e.stopPropagation()}
                      loading={eliminandoId === papel.id}
                      icon={<DeleteOutlined />}
                      danger
                    >
                      Eliminar
                    </Button>
                  </Popconfirm>
                </div>
              </div>
            )}
          </Card>
        </List.Item>
      )}
    />
  );
};