'use client';
import React, { useState, useEffect } from 'react';
import {
  Card,
  Row,
  Col,
  Select,
  Typography,
  Divider,
  Space,
  Tabs,
  TabsProps,
  Button,
  message,
  Modal,
  Input,
  Dropdown,
  Menu,
  Popconfirm
} from 'antd';
import Formato1 from '../componentes/Form1';
import Formato2 from '../componentes/Form2';
import Formato3 from '../componentes/Form3';
import Formato4 from '../componentes/Form4';
import Matriz from '../componentes/Matriz';
import Chatbot from '../componentes/Chatbot';
import { PapelTrabajoList } from '../componentes/PapelTrabajoList';
import { PapelTrabajoModal } from '../componentes/PapelTrabajoModal';
import { usePapelTrabajo } from '../hooks/usePapelTrabajo';
import { api } from '@utils/api';
import { PlusOutlined, MoreOutlined, DeleteOutlined } from '@ant-design/icons';
import "../globals.css";

const { Title, Text } = Typography;

interface CgtiDTO {
  cgtiId: number;
  nombreCgti: string;
  descripcion: string;
  anio: number;
}

interface CgtiGroupDTO {
  nombreCgti: string;
  aniosDisponibles: number[];
}

const VistaPrincipalCgti: React.FC = () => {
  const [cgtis, setCgtis] = useState<CgtiGroupDTO[]>([]);
  const [cgtiSeleccionado, setCgtiSeleccionado] = useState<CgtiGroupDTO | null>(null);
  const [anioSeleccionado, setAnioSeleccionado] = useState<number | null>(null);
  const [modalPapelTrabajoAbierto, setModalPapelTrabajoAbierto] = useState(false);

  // Modal CGTI (Agregar/Editar)
  const [modalCgtiOpen, setModalCgtiOpen] = useState(false);
  const [editandoCgti, setEditandoCgti] = useState<CgtiGroupDTO | null>(null);
  const [nuevoNombreCgti, setNuevoNombreCgti] = useState('');
  const [nuevoAnio, setNuevoAnio] = useState<number | null>(null);
  const [loadingCgti, setLoadingCgti] = useState(false);

  // Modal gestión de años
  const [modalAniosOpen, setModalAniosOpen] = useState(false);
  const [cgtiParaGestionarAnios, setCgtiParaGestionarAnios] = useState<CgtiGroupDTO | null>(null);
  const [nuevoAnioGestion, setNuevoAnioGestion] = useState<number | null>(null);

  // Traer CGTIs de la API
  const fetchCgtis = async (): Promise<CgtiGroupDTO[]> => {
    try {
      const res = await api.get('/cgti/agrupados');
      setCgtis(res.data);
      return res.data;
    } catch (error) {
      message.error('Error al cargar CGTIs');
      console.error('Error fetching CGTIs:', error);
      return [];
    }
  };

  useEffect(() => {
    fetchCgtis();
  }, []);

  // Sincronizar cgtiParaGestionarAnios cuando cambie la lista de CGTIs
  useEffect(() => {
    if (cgtiParaGestionarAnios && cgtis.length > 0) {
      const cgtiActualizado = cgtis.find(c => c.nombreCgti === cgtiParaGestionarAnios.nombreCgti);
      if (cgtiActualizado) {
        setCgtiParaGestionarAnios(cgtiActualizado);
      }
    }
  }, [cgtis, cgtiParaGestionarAnios]);

  useEffect(() => {
    if (cgtiSeleccionado && cgtis.length > 0) {
      const cgtiActualizado = cgtis.find(c => c.nombreCgti === cgtiSeleccionado.nombreCgti);
      if (cgtiActualizado) {
        setCgtiSeleccionado(cgtiActualizado);
      }
    }
  }, [cgtis, cgtiSeleccionado]);

  // Papel de trabajo hooks
  const {
    papelesTrabajo,
    papelSeleccionado,
    cargando,
    editandoId,
    nuevoNombre,
    eliminandoId,
    setPapelSeleccionado,
    setEditandoId,
    setNuevoNombre,
    cargarPapeles,
    crearNuevoPapel,
    actualizarPapel,
    eliminarPapel
  } = usePapelTrabajo();

  // Selección CGTI
  const manejarSeleccionCgti = (cgti: CgtiGroupDTO) => {
    setCgtiSeleccionado(cgti);
    setAnioSeleccionado(null);
    setPapelSeleccionado(null);
  };

  // Selección Año
  const manejarCambioAnio = async (anio: number) => {
    setAnioSeleccionado(anio);
    setPapelSeleccionado(null);
    if (cgtiSeleccionado && anio) {
      try {
        await cargarPapeles(cgtiSeleccionado.nombreCgti, anio);
      } catch (error) {
        message.error('Error al cargar los papeles de trabajo');
        console.error('Error loading papeles:', error);
      }
    }
  };

  // Buscar CGTI ID por nombre y año (necesitamos hacer una llamada adicional a la API)
  const obtenerIdCgti = async (nombreCgti: string, anio: number): Promise<number> => {
    try {
      const response = await api.get(`/cgti`);
      const cgtis: CgtiDTO[] = response.data;
      const cgti = cgtis.find(c => c.nombreCgti === nombreCgti && c.anio === anio);
      if (!cgti) throw new Error('No se encontró el CGTI');
      return cgti.cgtiId;
    } catch (error) {
      throw new Error('No se encontró el CGTI');
    }
  };

  // CRUD Papel de Trabajo
  const manejarCrearPapelTrabajo = async (nombre: string) => {
    if (!nombre.trim() || !cgtiSeleccionado || !anioSeleccionado) return;
    try {
      const cgtiId = await obtenerIdCgti(cgtiSeleccionado.nombreCgti, anioSeleccionado);
      await crearNuevoPapel(nombre, cgtiId);
      setModalPapelTrabajoAbierto(false);
      message.success('Papel de trabajo creado correctamente');
    } catch (error) {
      message.error('Error al crear el papel de trabajo');
      console.error('Error creating papel trabajo:', error);
    }
  };

  const manejarGuardarEdicion = async () => {
    if (!nuevoNombre.trim() || !editandoId || !cgtiSeleccionado || !anioSeleccionado) return;
    try {
      const cgtiId = await obtenerIdCgti(cgtiSeleccionado.nombreCgti, anioSeleccionado);
      await actualizarPapel(editandoId, nuevoNombre, cgtiId);
      setEditandoId(null);
      setNuevoNombre('');
      message.success('Papel de trabajo actualizado correctamente');
    } catch (error) {
      message.error('Error al actualizar el papel de trabajo');
      console.error('Error updating papel trabajo:', error);
    }
  };

  const manejarCancelarEdicion = () => {
    setEditandoId(null);
    setNuevoNombre('');
  };

  const manejarEliminarPapel = async (id: number) => {
    try {
      await eliminarPapel(id);
      message.success('Papel de trabajo eliminado correctamente');
    } catch (error) {
      message.error('Error al eliminar el papel de trabajo');
      console.error('Error deleting papel trabajo:', error);
    }
  };

  // Modal para agregar CGTI
  const abrirModalAgregar = () => {
    setEditandoCgti(null);
    setNuevoNombreCgti('');
    setNuevoAnio(null);
    setModalCgtiOpen(true);
  };

  // Modal para editar CGTI
  const abrirModalEditar = (cgti: CgtiGroupDTO) => {
    setEditandoCgti(cgti);
    setNuevoNombreCgti(cgti.nombreCgti);
    setNuevoAnio(null);
    setModalCgtiOpen(true);
  };

  // Función para abrir modal de gestión de años
  const abrirModalGestionarAnios = (cgti: CgtiGroupDTO) => {
    setCgtiParaGestionarAnios(cgti);
    setModalAniosOpen(true);
  };

  // Función para eliminar un año - NUEVA IMPLEMENTACIÓN
  const eliminarAnio = async (cgti: CgtiGroupDTO, anioAEliminar: number) => {
    try {
      await api.delete(`/cgti/anio?nombre=${encodeURIComponent(cgti.nombreCgti)}&anio=${anioAEliminar}`);
      message.success(`Año ${anioAEliminar} eliminado correctamente`);
      
      const nuevosCgtis = await fetchCgtis();
      const cgtiActualizado = nuevosCgtis.find(c => c.nombreCgti === cgti.nombreCgti);
      
      if (cgtiActualizado) {
        setCgtiParaGestionarAnios(cgtiActualizado);
        if (cgtiSeleccionado?.nombreCgti === cgti.nombreCgti) {
          setCgtiSeleccionado(cgtiActualizado);
          if (anioSeleccionado === anioAEliminar) {
            setAnioSeleccionado(null);
            setPapelSeleccionado(null);
          }
        }
      }
    } catch (error) {
      message.error('Error al eliminar el año');
      console.error('Error deleting year:', error);
    }
  };

  // Función para agregar un año - NUEVA IMPLEMENTACIÓN
  const agregarAnio = async (cgti: CgtiGroupDTO, nuevoAnio: number) => {
    try {
      if (cgti.aniosDisponibles.includes(nuevoAnio)) {
        message.warning('Este año ya existe');
        return;
      }
      
      await api.post('/cgti/anio', {
        nombreCgti: cgti.nombreCgti,
        anio: nuevoAnio,
        descripcion: '',
        linkDocumentacion: ''
      });
      
      message.success(`Año ${nuevoAnio} agregado correctamente`);
      const nuevosCgtis = await fetchCgtis();
      const cgtiActualizado = nuevosCgtis.find(c => c.nombreCgti === cgti.nombreCgti);
      
      if (cgtiActualizado) {
        setCgtiParaGestionarAnios(cgtiActualizado);
        if (cgtiSeleccionado?.nombreCgti === cgti.nombreCgti) {
          setCgtiSeleccionado(cgtiActualizado);
        }
      }
      setNuevoAnioGestion(null);
    } catch (error) {
      message.error('Error al agregar el año');
      console.error('Error adding year:', error);
    }
  };

  // Función para eliminar CGTI
  const handleDeleteCgti = async (cgti: CgtiGroupDTO) => {
    try {
      // Necesitamos eliminar todos los años de este CGTI
      for (const anio of cgti.aniosDisponibles) {
        await api.delete(`/cgti/anio?nombre=${encodeURIComponent(cgti.nombreCgti)}&anio=${anio}`);
      }
      message.success('CGTI eliminado correctamente');
      if (cgtiSeleccionado?.nombreCgti === cgti.nombreCgti) {
        setCgtiSeleccionado(null);
        setAnioSeleccionado(null);
      }
      await fetchCgtis();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      message.error('Error al eliminar CGTI: ' + errorMessage);
      console.error('Error deleting CGTI:', error);
    }
  };

  const handleAddOrEditCgti = async () => {
    setLoadingCgti(true);
    try {
      if (editandoCgti) {
        // Para editar, solo cambiaremos el nombre del CGTI
        // Esto requiere actualizar todos los registros con el nombre anterior
        message.info('La edición de nombres de CGTI requiere actualización manual en la base de datos');
      } else {
        await api.post('/cgti/anio', {
          nombreCgti: nuevoNombreCgti,
          anio: nuevoAnio || new Date().getFullYear(),
          descripcion: '',
          linkDocumentacion: ''
        });
        message.success('CGTI creado correctamente');
      }
      await fetchCgtis();
      setModalCgtiOpen(false);
      setEditandoCgti(null);
      setNuevoNombreCgti('');
      setNuevoAnio(null);
    } catch (error) {
      message.error('Error al guardar CGTI');
      console.error('Error saving CGTI:', error);
    }
    setLoadingCgti(false);
  };

  // Menú contextual para editar y eliminar CGTI
  const cgtiMenu = (cgti: CgtiGroupDTO) => (
    <Menu>
      <Menu.Item
        key="edit"
        onClick={() => abrirModalEditar(cgti)}
      >
        Editar
      </Menu.Item>
      <Menu.Item
        key="manage-years"
        onClick={() => abrirModalGestionarAnios(cgti)}
      >
        Gestionar Años
      </Menu.Item>
      <Menu.Item key="delete">
        <Popconfirm
          title={`¿Seguro que deseas eliminar el CGTI "${cgti.nombreCgti}"?`}
          description="Esta acción eliminará el CGTI y todos sus papeles de trabajo."
          okText="Eliminar"
          okType="danger"
          cancelText="Cancelar"
          onConfirm={() => handleDeleteCgti(cgti)}
        >
          <span style={{ color: "red", cursor: "pointer" }}>Eliminar</span>
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  // Tabs
  const itemsPestanias: TabsProps['items'] = (cgtiSeleccionado && anioSeleccionado && papelSeleccionado)
    ? [
      {
        key: '1',
        label: 'Formato 1',
        children: <Formato1 nombreCgti={cgtiSeleccionado.nombreCgti} anio={anioSeleccionado} idPapelTrabajo={papelSeleccionado.id.toString()} />,
      },
      {
        key: '2',
        label: 'Formato 2',
        children: <Formato2 nombreCgti={cgtiSeleccionado.nombreCgti} anio={anioSeleccionado} idPapelTrabajo={papelSeleccionado.id.toString()} />,
      },
      {
        key: '3',
        label: 'Formato 3',
        children: <Formato3 nombreCgti={cgtiSeleccionado.nombreCgti} anio={anioSeleccionado} idPapelTrabajo={papelSeleccionado.id.toString()} />,
      },
      {
        key: '4',
        label: 'Formato 4',
        children: <Formato4 nombreCgti={cgtiSeleccionado.nombreCgti} idPapelTrabajo={papelSeleccionado.id.toString()} />
      },
      {
        key: '5',
        label: 'Matriz',
        children: <Matriz cgti={cgtiSeleccionado.nombreCgti} anio={anioSeleccionado} papelTrabajo={papelSeleccionado.nombre} />,
      },
    ] : [];

  return (
    <div className="p-2 sm:p-3 md:p-8 bg-gray-50 relative min-h-screen">
      <Chatbot />

      <div className="p-1 sm:p-4 md:p-8 bg-gray-50">
        <div className="bg-white p-2 sm:p-4 md:p-6 rounded shadow-md">
          <Title level={2} className="mb-6 text-center text-base sm:text-lg md:text-2xl">
            Selecciona un CGTI
          </Title>
          {/* CGTI Cards Responsive */}
          <Row gutter={[12, 12]} className="flex flex-wrap">
            {cgtis.map((cgti) => (
              <Col
                key={cgti.nombreCgti}
                xs={24} sm={12} md={8} lg={6} xl={4}
                className="!mb-3"
              >
                <div className="relative h-full">
                  <Card
                    hoverable
                    className={`h-full flex items-center justify-center text-center border-2 shadow-md transition-all duration-150 ${
                      cgtiSeleccionado?.nombreCgti === cgti.nombreCgti
                        ? 'border-yellow-800 scale-105'
                        : 'border-gray-200'
                    }`}
                    style={{
                      height: 96,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                    onClick={() => manejarSeleccionCgti(cgti)}
                    bodyStyle={{
                      padding: '12px',
                      width: '100%',
                      minHeight: '56px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text strong className="truncate w-full">{cgti.nombreCgti}</Text>
                  </Card>
                  {cgtiSeleccionado?.nombreCgti === cgti.nombreCgti && (
                    <Dropdown overlay={cgtiMenu(cgti)} trigger={['click']}>
                      <Button
                        shape="circle"
                        icon={<MoreOutlined />}
                        className="absolute top-1 right-1 z-10 bg-white border border-gray-300"
                        onClick={e => e.stopPropagation()}
                        size="small"
                      />
                    </Dropdown>
                  )}
                </div>
              </Col>
            ))}
            {/* Botón Agregar CGTI */}
            <Col xs={24} sm={12} md={8} lg={6} xl={4} className="!mb-3">
              <div className="h-full relative">
                <Card
                  hoverable
                  className="h-full flex items-center justify-center text-center border-dashed border-2"
                  style={{
                    borderColor: '#4CAF50',
                    color: '#4CAF50',
                    height: 96,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                  onClick={abrirModalAgregar}
                  bodyStyle={{
                    padding: '12px',
                    width: '100%',
                    minHeight: '56px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Space direction="vertical" align="center">
                    <PlusOutlined style={{ fontSize: 32 }} />
                    <Text strong className="text-xs md:text-base">Agregar CGTI</Text>
                  </Space>
                </Card>
              </div>
            </Col>
          </Row>
          
          {cgtiSeleccionado && (
            <>
              <Divider className="my-6 sm:my-8" />
              <div className="text-center">
                <Title level={4} className="mb-2 sm:mb-4 text-base sm:text-lg md:text-2xl">
                  CGTI Seleccionado: <span className="text-green-700">{cgtiSeleccionado.nombreCgti}</span>
                </Title>
                <Space direction="vertical" size="middle" className="w-full max-w-xs mx-auto mt-4">
                  <Text className="text-xs sm:text-base">Selecciona un año:</Text>
                  <Select
                    className="custom-select"
                    placement="bottomLeft"
                    value={anioSeleccionado}
                    style={{ width: '100%'}}
                    onChange={manejarCambioAnio}
                    placeholder="Selecciona un año"
                    size="large"
                    options={cgtiSeleccionado.aniosDisponibles.map(anio => ({ value: anio, label: anio.toString() }))}
                    disabled={!cgtiSeleccionado}
                  />
                </Space>
              </div>
            </>
          )}

          {cgtiSeleccionado && anioSeleccionado && (
            <>
              <Divider className="my-6 sm:my-8">Papeles de Trabajo</Divider>
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
                  <Title level={5} className="text-center mb-2 sm:mb-0 text-sm md:text-lg">
                    Selecciona un Papel de Trabajo:
                  </Title>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setModalPapelTrabajoAbierto(true)}
                    className="bg-green-700 border-green-600"
                    style={{ backgroundColor: '#08843c', borderColor: '#4CAF50' }}
                  >
                    Nuevo Papel de Trabajo
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <PapelTrabajoList
                    papeles={papelesTrabajo}
                    papelSeleccionado={papelSeleccionado}
                    cargando={cargando}
                    editandoId={editandoId}
                    nuevoNombre={nuevoNombre}
                    eliminandoId={eliminandoId}
                    onSeleccionar={setPapelSeleccionado}
                    onIniciarEdicion={(papel) => {
                      setEditandoId(papel.id);
                      setNuevoNombre(papel.nombre);
                    }}
                    onGuardarEdicion={manejarGuardarEdicion}
                    onCancelarEdicion={manejarCancelarEdicion}
                    onEliminar={manejarEliminarPapel}
                    onNombreChange={setNuevoNombre}
                  />
                </div>
              </div>
            </>
          )}

          {papelSeleccionado && (
            <>
              <Divider
                className="my-6 sm:my-8 text-center"
                orientation="center"
                orientationMargin="0"
              >
                <div className="flex flex-col items-center w-full">
                  <span className="text-center w-full">Formatos del Papel de Trabajo:</span>
                  <span
                    className="
                      text-green-700 font-semibold
                      break-all
                      whitespace-normal
                      w-full
                      max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl
                      mt-1
                      text-base
                      text-center
                    "
                    title={papelSeleccionado.nombre}
                  >
                    {papelSeleccionado.nombre}
                  </span>
                </div>
              </Divider>
              <Tabs defaultActiveKey="1" items={itemsPestanias} type="card" />
            </>
          )}
        </div>
      </div>

      {/* Modal para agregar/editar CGTI */}
      <Modal
        title={editandoCgti ? "Editar CGTI" : "Agregar nuevo CGTI"}
        open={modalCgtiOpen}
        onCancel={() => setModalCgtiOpen(false)}
        onOk={handleAddOrEditCgti}
        confirmLoading={loadingCgti}
        okText={editandoCgti ? "Guardar cambios" : "Agregar"}
        cancelText="Cancelar"
      >
        <Input
          placeholder="Nombre del CGTI"
          className="mb-3"
          value={nuevoNombreCgti}
          onChange={e => setNuevoNombreCgti(e.target.value)}
        />
        {!editandoCgti && (
          <Input
            placeholder="Año disponible (ej. 2025)"
            type="number"
            value={nuevoAnio ?? ""}
            onChange={e => setNuevoAnio(Number(e.target.value))}
          />
        )}
      </Modal>

      {/* Modal para gestión de años */}
      <Modal
        title={`Gestionar Años - ${cgtiParaGestionarAnios?.nombreCgti}`}
        open={modalAniosOpen}
        onCancel={() => {
          setModalAniosOpen(false);
          setCgtiParaGestionarAnios(null);
          setNuevoAnioGestion(null);
        }}
        footer={null}
        width={420}
        className="!p-0"
      >
        {cgtiParaGestionarAnios && (
          <div>
            {/* Agregar nuevo año */}
            <div className="mb-4 p-4 border rounded">
              <h4 className="mb-3 font-semibold text-base">Agregar Nuevo Año</h4>
              <div className="flex gap-2 flex-wrap">
                <Input
                  type="number"
                  placeholder="Ej: 2025"
                  value={nuevoAnioGestion ?? ""}
                  onChange={e => setNuevoAnioGestion(Number(e.target.value) || null)}
                  style={{ width: 120 }}
                />
                <Button
                  type="primary"
                  onClick={() => {
                    if (nuevoAnioGestion) {
                      agregarAnio(cgtiParaGestionarAnios, nuevoAnioGestion);
                    }
                  }}
                  disabled={!nuevoAnioGestion}
                  className="bg-green-700 border-green-600"
                  style={{ backgroundColor: '#08843c', borderColor: '#4CAF50' }}
                >
                  Agregar
                </Button>
              </div>
            </div>

            {/* Lista de años existentes */}
            <div>
              <h4 className="mb-3 font-semibold text-base">Años Existentes</h4>
              {cgtiParaGestionarAnios.aniosDisponibles.length === 0 ? (
                <p className="text-gray-500">No hay años disponibles</p>
              ) : (
                <div className="space-y-2">
                  {cgtiParaGestionarAnios.aniosDisponibles
                    .sort((a, b) => b - a)
                    .map(anio => (
                      <div key={anio} className="flex justify-between items-center p-3 border rounded bg-gray-50">
                        <span className="font-medium text-lg">{anio}</span>
                        <Popconfirm
                          title={`¿Eliminar el año ${anio}?`}
                          description="Esto eliminará todos los papeles de trabajo de este año."
                          okText="Eliminar"
                          okType="danger"
                          cancelText="Cancelar"
                          onConfirm={() => eliminarAnio(cgtiParaGestionarAnios, anio)}
                        >
                          <Button danger size="small" icon={<DeleteOutlined />}>
                            Eliminar
                          </Button>
                        </Popconfirm>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>

      <PapelTrabajoModal
        open={modalPapelTrabajoAbierto}
        onCancel={() => setModalPapelTrabajoAbierto(false)}
        onOk={manejarCrearPapelTrabajo}
        loading={false}
      />
    </div>
  );
};

export default VistaPrincipalCgti;