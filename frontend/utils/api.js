import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const API_BASE_URL = 'http://localhost:8080/api' || process.env.NEXT_PUBLIC_API_BASE_URL;
const CHAT_BASE_URL = process.env.NEXT_PUBLIC_CHAT_BASE_URL || 'http://localhost:8000'

export const api = {
  chatbot: async (message) => {
    try {
      const url = `${CHAT_BASE_URL}/chat`;
      const uuid = uuidv4();

      const response = await axios({
        method: 'POST',
        url: url,
        data: { 
          message,
          uuid 
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      if (axios.isAxiosError?.(error)) {
        console.error('Chatbot API Error:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });
      } else {
        console.error('Unexpected error:', error);
      }
      throw error;
    }
  },

  get: async (endpoint, params = {}) => {
    try {
      const url = `${API_BASE_URL}${endpoint}`;

      const response = await axios({
        method: 'GET',
        url: url,
        params: params,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response;
    } catch (error) {
      if (axios.isAxiosError?.(error)) {
        console.error('API Error:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });
      } else {
        console.error('Unexpected error:', error);
      }
      throw error;
    }
  },

  post: async (endpoint, data) => {
    try {
      const url = `${API_BASE_URL}${endpoint}`;

      const response = await axios({
        method: 'POST',
        url: url,
        data: data,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response;
    } catch (error) {
      if (axios.isAxiosError?.(error)) {
        console.error('API Error:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });
      } else {
        console.error('Unexpected error:', error);
      }
      throw error;
    }
  },

  update: async (endpoint, data) => {
    try {
      const url = `${API_BASE_URL}${endpoint}`;

      const response = await axios({
        method: 'PUT',
        url: url,
        data: data,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response;
    } catch (error) {
      if (axios.isAxiosError?.(error)) {
        console.error('API Error:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });
      } else {
        console.error('Unexpected error:', error);
      }
      throw error;
    }
  },

  delete: async (endpoint) => {
    try {
      const url = `${API_BASE_URL}${endpoint}`;

      const response = await axios({
        method: 'DELETE',
        url: url,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return response;
    } catch (error) {
      if (axios.isAxiosError?.(error)) {
        console.error('API Error:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
        });
      } else {
        console.error('Unexpected error:', error);
      }
      throw error;
    }
  },
};