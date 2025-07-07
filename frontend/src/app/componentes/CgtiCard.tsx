'use client';

import React from 'react';
import { Card, Typography } from 'antd';
import { Col } from 'antd';

const { Text } = Typography;

interface CgtiCardProps {
  cgti: string;
  isSelected: boolean;
  onSelect: (cgti: string) => void;
}

const CgtiCard: React.FC<CgtiCardProps> = ({ cgti, isSelected, onSelect }) => {
  return (
    <Col xs={24} sm={12} md={8} lg={6} xl={4}>
      <Card
        hoverable
        className={`h-full flex items-center justify-center text-center transition-all duration-200 ease-in-out ${
          isSelected ? 'border-blue-500 border-2 shadow-lg' : 'border-transparent'
        }`}
        onClick={() => onSelect(cgti)}
        styles={{
          body: { padding: '16px', width: '100%' }
        }}
      >
        <Text strong>{cgti}</Text>
      </Card>
    </Col>
  );
};

export default CgtiCard;