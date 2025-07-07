'use client';
import React, { useState } from 'react';
import { CampoComplementario } from '../hooks/useFormato3';
import { Table, Button, Tag, Popconfirm, Space, Spin, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import useFormato3, { ActividadControl, Evidencia } from '../hooks/useFormato3';
import Formato3Modal from './Form3Modal';

interface ActividadFormValues {
  nombre: string;
}
interface EvidenciaFormValues {
  resultado: string;
  comentarios: string;
  campos_complementarios: Array<{ nombre_campo: string; contenido: string }>;
}
type FormValues = ActividadFormValues | EvidenciaFormValues;

const Form3: React.FC<{ idPapelTrabajo: string; nombreCgti: string; anio: number }> = ({
  idPapelTrabajo,
}) => {
  const { datos, cargando, persistirDatos } = useFormato3(idPapelTrabajo);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'actividad' | 'evidencia'>('actividad');
  const [currentEditItem, setCurrentEditItem] = useState<ActividadControl | Evidencia | null>(null);
  const [currentActividadId, setCurrentActividadId] = useState<number | null>(null);

  const showModal = (
    type: 'actividad' | 'evidencia',
    item?: ActividadControl | Evidencia,
    actividadId?: number | null
  ) => {
    setModalType(type);
    setCurrentEditItem(item || null);
    setCurrentActividadId(actividadId || null);
    setModalVisible(true);
  };

  const handleModalSubmit = async (values: FormValues) => {
    try {
      if (modalType === 'actividad') {
        const actividadValues = values as ActividadFormValues;
        if (currentEditItem) {
          const actividadesActualizadas = datos!.actividadesControl.map((actividad) =>
            actividad.id === (currentEditItem as ActividadControl).id
              ? { ...actividad, ...actividadValues }
              : actividad
          );
          await persistirDatos({ ...datos!, actividadesControl: actividadesActualizadas });
        } else {
          const nuevaActividad: ActividadControl = {
            id: null,
            nombre: actividadValues.nombre,
            evidencias: [],
          };
          const actividadesActualizadas = [...datos!.actividadesControl, nuevaActividad];
          await persistirDatos({ ...datos!, actividadesControl: actividadesActualizadas });
        }
      } else if (modalType === 'evidencia') {
        const evidenciaValues = values as EvidenciaFormValues;
        if (currentActividadId === null) {
          message.error('Error: No se puede asociar la evidencia sin una actividad válida.');
          return;
        }
        const camposConId: CampoComplementario[] =
          evidenciaValues.campos_complementarios?.map((campo) => ({
            id: null,
            nombre_campo: campo.nombre_campo,
            contenido: campo.contenido,
          })) || [];

        if (currentEditItem) {
          const evidenciaActual = currentEditItem as Evidencia;
          const camposActualizados: CampoComplementario[] =
            evidenciaValues.campos_complementarios?.map((campo, index) => {
              const campoExistente = evidenciaActual.campos_complementarios[index];
              return {
                id: campoExistente?.id || null,
                nombre_campo: campo.nombre_campo,
                contenido: campo.contenido,
              };
            }) || [];
          const actividadesActualizadas = datos!.actividadesControl.map((actividad) =>
            actividad.id === currentActividadId
              ? {
                  ...actividad,
                  evidencias: actividad.evidencias.map((evidencia) =>
                    evidencia.id === evidenciaActual.id
                      ? {
                          ...evidencia,
                          resultado: evidenciaValues.resultado,
                          comentarios: evidenciaValues.comentarios,
                          campos_complementarios: camposActualizados,
                        }
                      : evidencia
                  ),
                }
              : actividad
          );
          await persistirDatos({ ...datos!, actividadesControl: actividadesActualizadas });
        } else {
          const nuevaEvidencia: Evidencia = {
            id: null,
            resultado: evidenciaValues.resultado,
            comentarios: evidenciaValues.comentarios,
            campos_complementarios: camposConId,
          };
          const actividadesActualizadas = datos!.actividadesControl.map((actividad) =>
            actividad.id === currentActividadId
              ? { ...actividad, evidencias: [...actividad.evidencias, nuevaEvidencia] }
              : actividad
          );
          await persistirDatos({ ...datos!, actividadesControl: actividadesActualizadas });
        }
      }
      setModalVisible(false);
    } catch (error) {
      message.error('Error al guardar los cambios.');
      console.error('Error al guardar los cambios:', error);
    }
  };

  const handleDeleteActividad = async (id: number | null) => {
    try {
      const actividadesActualizadas = datos!.actividadesControl.filter((actividad) => actividad.id !== id);
      await persistirDatos({ ...datos!, actividadesControl: actividadesActualizadas });
    } catch (error) {
      message.error('Error al eliminar la actividad.');
      console.error('Error al eliminar la actividad:', error);
    }
  };

  const handleDeleteEvidencia = async (actividadId: number | null, evidenciaId: number | null) => {
    try {
      const actividadesActualizadas = datos!.actividadesControl.map((actividad) =>
        actividad.id === actividadId
          ? { ...actividad, evidencias: actividad.evidencias.filter((evidencia) => evidencia.id !== evidenciaId) }
          : actividad
      );
      await persistirDatos({ ...datos!, actividadesControl: actividadesActualizadas });
    } catch (error) {
      message.error('Error al eliminar la evidencia.');
      console.error('Error al eliminar la evidencia:', error);
    }
  };

  const getEvidenciasColumns = (actividadId: number | null) => [
    {
      title: 'Campos Complementarios',
      key: 'campos',
      render: (_: unknown, record: Evidencia) => (
        <div className="ml-2 break-words whitespace-pre-line max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl">
          {record.campos_complementarios.length > 0 ? (
            record.campos_complementarios.map((campo, index) => (
              <div key={index} style={{ marginBottom: 8 }}>
                <strong>{campo.nombre_campo}:</strong> {campo.contenido}
              </div>
            ))
          ) : (
            <span>No hay campos complementarios.</span>
          )}
        </div>
      ),
    },
    {
      title: 'Comentarios',
      dataIndex: 'comentarios',
      key: 'comentarios',
      render: (text: string) => (
        <span className="break-words whitespace-pre-line max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl block">
          {text}
        </span>
      ),
    },
    {
      title: 'Resultado',
      dataIndex: 'resultado',
      key: 'resultado',
      render: (result: string) => (
        <Tag color={result === 'P' ? 'green' : result === 'X' ? 'orange' : result === 'K' ? 'blue' : 'red'}>
          {result === 'P'
            ? 'Cumple (P)'
            : result === 'X'
            ? 'No se presentó (X)'
            : result === 'K'
            ? 'No Aplica (K)'
            : 'No Cumple (O)'}
        </Tag>
      ),
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_: unknown, record: Evidencia) => (
        <Space size="middle">
          <Button
            className="btn-editar"
            icon={<EditOutlined />}
            onClick={() => showModal('evidencia', record, actividadId)}
            aria-label={`Editar evidencia ${record.id}`}
          >
            Editar
          </Button>
          <Popconfirm
            title="¿Estás seguro de que quieres eliminar esta evidencia?"
            onConfirm={() => handleDeleteEvidencia(actividadId, record.id)}
            okText="Sí"
            cancelText="No"
          >
            <Button className="btn-eliminar" danger icon={<DeleteOutlined />} aria-label={`Eliminar evidencia ${record.id}`}>
              Eliminar
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const actividadesColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      className: 'break-words max-w-[80px] text-center',
      render: (text: string) => (
        <span className="block max-w-[80px] break-words text-center">{text}</span>
      ),
    },
    {
      title: 'Nombre Actividad',
      dataIndex: 'nombre',
      key: 'nombre',
      className: 'break-all whitespace-pre-line max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl',
      render: (text: string) => (
        <span className="break-words whitespace-pre-line max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl block">
          {text}
        </span>
      ),
    },
    {
      title: 'Acciones',
      key: 'acciones',
      render: (_: unknown, record: ActividadControl) => (
        <Space size="middle">
          <Button
            className="btn-editar"
            icon={<EditOutlined />}
            onClick={() => showModal('actividad', record)}
            aria-label={`Editar actividad ${record.nombre}`}
            color="primary"
            variant="outlined"
          >
            Editar
          </Button>
          <Popconfirm
            title="¿Estás seguro de que quieres eliminar esta actividad y todas sus evidencias?"
            onConfirm={() => handleDeleteActividad(record.id)}
            okText="Sí"
            cancelText="No"
          >
            <Button className="btn-eliminar" danger icon={<DeleteOutlined />} aria-label={`Eliminar actividad ${record.nombre}`}>
              Eliminar
            </Button>
          </Popconfirm>
          <Button
            type="dashed"
            onClick={() => showModal('evidencia', undefined, record.id)}
            icon={<PlusOutlined />}
          >
            Evidencia
          </Button>
        </Space>
      ),
    },
  ];

  if (cargando) {
    return (
      <div className="flex justify-center items-center min-h-[120px] w-full">
        <Spin />
      </div>
    );
  }

  return (
    <div className="w-full max-w-full p-2 md:p-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <Tag color="blue" className="text-base px-4 py-1">
          Período: {datos?.periodoRevision}
        </Tag>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => showModal('actividad')}
          className="bg-green-700 border-green-600 text-white w-full md:w-auto"
          style={{ backgroundColor: '#08843c', borderColor: '#4CAF50', color: '#fff', padding: '8px 24px', fontSize: 16 }}
        >
          Nueva Actividad
        </Button>
      </div>

      <div className="overflow-x-auto rounded shadow bg-white p-4">
        <Table
          className="min-w-[600px] w-full"
          columns={actividadesColumns}
          dataSource={datos?.actividadesControl}
          rowKey="id"
          expandable={{
            expandedRowRender: (record) => (
              <div className="overflow-x-auto bg-gray-50 p-4 rounded-lg">
                <Table
                  columns={getEvidenciasColumns(record.id)}
                  dataSource={record.evidencias}
                  rowKey="id"
                  pagination={false}
                  bordered
                  size="middle"
                  locale={{ emptyText: 'No hay evidencias para esta actividad.' }}
                  className="min-w-[700px] w-full"
                  scroll={{ x: true }}
                />
              </div>
            ),
            rowExpandable: (record) => record.evidencias.length > 0,
          }}
          locale={{ emptyText: 'No hay actividades de control.' }}
          bordered
          scroll={{ x: true }}
        />
      </div>
      <Formato3Modal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSubmit={handleModalSubmit}
        modalType={modalType}
        initialValues={currentEditItem}
      />
    </div>
  );
};

export default Form3;