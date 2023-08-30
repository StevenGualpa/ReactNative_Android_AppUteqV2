// axiosInstance.js
import axios from 'axios';
import https from 'https';

const axiosInstance = axios.create({
  baseURL: 'https://apiws.uteq.edu.ec', // Puedes establecer una URL base si todas tus llamadas son a este dominio
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

export default axiosInstance;
