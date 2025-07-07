'use client';

import React from 'react';
import { Button } from 'antd';
import { MessageOutlined } from '@ant-design/icons';

interface FloatingChatButtonProps {
  onClick: () => void;
}

const FloatingChatButton: React.FC<FloatingChatButtonProps> = ({ onClick }) => {
  return (
    <Button
      type="primary"
      shape="circle"
      size="large"
      icon={<MessageOutlined />}
      onClick={onClick}
      className="fixed bottom-20 right-8 bg-[#08843c] shadow-lg hover:bg-[#06632d] z-[9999]"
    />
  );
};

export default FloatingChatButton;