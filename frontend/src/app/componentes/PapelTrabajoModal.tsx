import React from 'react';
import { Modal, Input } from 'antd';

interface PapelTrabajoModalProps {
  open: boolean; 
  onCancel: () => void;
  onOk: (nombre: string) => void;
  loading: boolean;
  initialValue?: string;
}

export const PapelTrabajoModal: React.FC<PapelTrabajoModalProps> = ({
  open, 
  onCancel,
  onOk,
  loading,
  initialValue = '',
}) => {
  const [nombre, setNombre] = React.useState(initialValue);

  React.useEffect(() => {
    if (open) { 
      setNombre(initialValue);
    }
  }, [open, initialValue]); 

  const handleOk = () => {
    onOk(nombre);
  };

  return (
    <Modal
      title={initialValue ? "Editar Papel de Trabajo" : "Crear Papel de Trabajo"}
      open={open} 
      onOk={handleOk}
      onCancel={onCancel}
      confirmLoading={loading}
    >
      <Input
        placeholder="Nombre del papel de trabajo"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        onPressEnter={handleOk}
        autoFocus
      />
    </Modal>
  );
};