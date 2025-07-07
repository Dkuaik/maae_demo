'use client';

import React, { useState } from 'react';
import { Button, Input, Typography, message } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { api } from '@utils/api';
import { v4 as uuidv4 } from 'uuid';
import FloatingChatButton from './FloatingChatButton';
import ReactMarkdown from 'react-markdown';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  uuid: string;
}

const Chatbot: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const uuid = uuidv4();
    const userMessage: Message = {
      text: inputMessage,
      sender: 'user',
      uuid
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await api.chatbot(inputMessage);
      
      const botMessage: Message = {
        text: response.response || response.content || 'Lo siento, no pude procesar tu mensaje',
        sender: 'bot',
        uuid: response.uuid || uuid
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      message.error('Error al comunicarse con el asistente');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isChatOpen) {
    return <FloatingChatButton onClick={() => setIsChatOpen(true)} />;
  }

  return (
    <div className="fixed bottom-36 right-8 w-96 bg-white rounded-lg shadow-xl z-[9999] border border-gray-200">
      <div className="bg-[#08843c] text-white p-4 rounded-t-lg flex justify-between items-center">
        <Typography.Text strong className="text-white">Asistente Virtual Inteligente de MAAe: Transformando Conversaciones</Typography.Text>
        <Button
          type="text"
          icon={<CloseOutlined className="text-white" />}
          onClick={() => setIsChatOpen(false)}
        />
      </div>
      
      <div className="h-64 p-4 overflow-y-auto">
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`mb-2 p-2 rounded max-w-[80%] ${
              msg.sender === 'user' 
                ? 'ml-auto bg-[#08843c] text-white' 
                : 'mr-auto bg-gray-100'
            }`}
          >
            {msg.sender === 'bot' ? (
              <ReactMarkdown >
                {msg.text}
              </ReactMarkdown>
            ) : (
              msg.text
            )}
          </div>
        ))}
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <Input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onPressEnter={handleSendMessage}
          placeholder="Escribe tu mensaje..."
          disabled={isLoading}
          suffix={
            <Button
              type="primary"
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              loading={isLoading}
            >
              Enviar
            </Button>
          }
        />
      </div>
    </div>
  );
};

export default Chatbot;