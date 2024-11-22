import { fileAPI } from '@/http/api';
import axios from 'axios';

const apiClient = axios.create({
  baseURL: fileAPI.servers, // 替换为后端的实际 URL
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
