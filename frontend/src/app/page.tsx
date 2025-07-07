'use client';
import React from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Typography, 
  Button, 
  Space, 
  Timeline,
  Tag
} from 'antd';
import { 
  OpenAIOutlined, 
  FileTextOutlined, 
  BarChartOutlined, 
  TeamOutlined, 
  CheckCircleOutlined,
  ArrowRightOutlined,
  SafetyOutlined,
  DatabaseOutlined
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Title, Paragraph, Text } = Typography;

const PresentacionMAAe: React.FC = () => {
  const router = useRouter();

  const caracteristicas = [
    {
      icon: <OpenAIOutlined className="text-4xl text-blue-600" />,
      titulo: "Integración de LLM",
      Tag: <Tag color="green">Nuevo</Tag>,
      descripcion: "¡Nuestro asistente de MAAe te falicitará la vida a través de la aplicación!",
      color: "blue"
    },
    {
      icon: <FileTextOutlined className="text-4xl text-green-600" />,
      titulo: "Papeles de Trabajo",
      descripcion: "Crea, edita y organiza papeles de trabajo para cada CGTI con formatos estructurados.",
      color: "green"
    },
    {
      icon: <BarChartOutlined className="text-4xl text-orange-600" />,
      titulo: "Reportes y Matrices",
      descripcion: "Genera reportes detallados y matrices de control para análisis y seguimiento.",
      color: "orange"
    },
    {
      icon: <TeamOutlined className="text-4xl text-purple-600" />,
      titulo: "Colaboración",
      Tag: <Tag color="gold">Próximamente</Tag>,
      descripcion: "Facilita el trabajo en equipo con acceso controlado y gestión de permisos.",
      color: "purple"
    }
  ];

  const cgtisDisponibles = [
    'Acceso a BDC', 'Acceso a SCADA', 'Acceso Físico', 'Acceso SE-SI',
    'Directorio Activo - GCO', 'Directorio Activo - GCI', 'Administración de SW',
    'Arquitectura de Ciberseguridad', 'CMDB', 'DRP', 'Estrategia de Ciberseguridad',
    'Gestión de cambios', 'Gestión de vulnerabilidades', 'Incidentes de Ciberseguridad'
  ];

  const procesoTrabajo = [
    {
      titulo: "Seleccionar CGTI",
      descripcion: "Elige el Control General de Tecnologías de Información que necesitas gestionar",
      icon: <SafetyOutlined />
    },
    {
      titulo: "Elegir Año",
      descripcion: "Selecciona el año de trabajo correspondiente a tu evaluación",
      icon: <CheckCircleOutlined />
    },
    {
      titulo: "Crear/Gestionar Papeles",
      descripcion: "Crea nuevos papeles de trabajo o gestiona los existentes",
      icon: <FileTextOutlined />
    },
    {
      titulo: "Completar Formatos",
      descripcion: "Llena los 4 formatos disponibles y genera la matriz de control",
      icon: <DatabaseOutlined />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Title level={1} className="text-white mb-4 text-5xl font-bold">
            MAAe - PEMEX
          </Title>
          <Title level={3} className="text-blue-100 mb-6 font-light">
            Unidad de Control Interna
          </Title>
          <Paragraph className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Plataforma integral para la gestión y evaluación de controles de CGTIs 
            en los sistemas de información de PEMEX.
          </Paragraph>
          <Space size="large">
            <div className="flex flex-col gap-4 items-stretch sm:flex-row sm:justify-center sm:gap-8 mt-4">
      <Button
        type="primary"
        size="large"
        icon={<ArrowRightOutlined />}
        onClick={() => router.push('/home')}
        className="bg-white text-blue-600 border-white hover:bg-blue-50 h-12 px-8 text-lg font-semibold w-full sm:w-auto"
      >
        Comenzar Ahora
      </Button>
      <Button
        size="large"
        ghost
        className="h-12 px-8 text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-blue-600 w-full sm:w-auto"
      >
        Conocer Más
      </Button>
    </div>
          </Space>
        </div>
      </div>

      {/* Características Principales */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Title level={2} className="mb-4">
              Características Principales
            </Title>
            <Paragraph className="text-lg text-gray-600 max-w-2xl mx-auto">
              MAAe proporciona todas las herramientas necesarias para una gestión eficiente.
            </Paragraph>
          </div>
          
          <Row gutter={[32, 32]}>
            {caracteristicas.map((caracteristica) => (
              <Col key={caracteristica.titulo} xs={24} sm={12} lg={6}>
                <Card 
                  className="h-full text-center hover:shadow-lg transition-all duration-300 border-0 shadow-md"
                  bodyStyle={{ padding: '32px 24px' }}
                >
                  <div className="mb-4">
                    {caracteristica.Tag}
                  </div>
                  <div className="mb-4">
                    {caracteristica.icon}
                  </div>
                  <Title level={4} className="mb-3">
                    {caracteristica.titulo}
                  </Title>
                  <Paragraph className="text-gray-600">
                    {caracteristica.descripcion}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Proceso de Trabajo */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Title level={2} className="mb-4">
              ¿Cómo Funciona?
            </Title>
            <Paragraph className="text-lg text-gray-600">
              Proceso simplificado en 4 pasos para gestionar correctamente tus controles
            </Paragraph>
          </div>

          <div className="max-w-4xl mx-auto">
            <Timeline
              mode="alternate"
              items={procesoTrabajo.map((paso) => ({
                dot: paso.icon,
                children: (
                  <Card className="shadow-md border-0">
                    <Title level={4} className="mb-2">
                      {paso.titulo}
                    </Title>
                    <Paragraph className="text-gray-600 mb-0">
                      {paso.descripcion}
                    </Paragraph>
                  </Card>
                )
              }))}
            />
          </div>
        </div>
      </div>

      {/* CGTIs Disponibles */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Title level={2} className="mb-4">
              CGTIs disponibles
            </Title>
            <Paragraph className="text-lg text-gray-600 mb-8">
              Gestiona todos los Controles Generales dentro de cada CGTI
            </Paragraph>
          </div>

          <div className="max-w-6xl mx-auto">
            <Row gutter={[16, 16]}>
              {cgtisDisponibles.map((cgti) => (
                <Col key={cgti} xs={24} sm={12} md={8} lg={6}>
                  <Tag 
                    className="w-full text-center py-2 px-4 text-sm font-medium border-2 hover:border-blue-400 cursor-pointer transition-all duration-200"
                    color="blue"
                  >
                    {cgti}
                  </Tag>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="py-16 bg-gradient-to-r from-green-500 to-blue-500 text-white">
        <div className="container mx-auto px-4">
          <Row gutter={[32, 32]} className="text-center">
            <Col xs={24} sm={8}>
              <div>
                <Title level={1} className="text-white mb-2">
                  20+
                </Title>
                <Text className="text-xl text-green-100">
                  CGTIs Disponibles
                </Text>
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div>
                <Title level={1} className="text-white mb-2">
                  4
                </Title>
                <Text className="text-xl text-green-100">
                  Formatos de Evaluación
                </Text>
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div>
                <Title level={1} className="text-white mb-2">
                  5
                </Title>
                <Text className="text-xl text-green-100">
                  Años de Histórico
                </Text>
              </div>
            </Col>
          </Row>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <Title level={2} className="mb-4">
            ¿Listo para comenzar?
          </Title>
          <Paragraph className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Inicia la gestión de tus CGTIs con MAAe. 
            Una plataforma diseñada específicamente para las necesidades de PEMEX.
          </Paragraph>
          <Button 
            type="primary" 
            size="large" 
            icon={<ArrowRightOutlined />}
            onClick={() => router.push('/')}
            className="bg-blue-600 hover:bg-blue-700 h-12 px-8 text-lg font-semibold"
          >
            Acceder a la Aplicación
          </Button>
        </div>
      </div>

     
    </div>
  );
};

export default PresentacionMAAe;