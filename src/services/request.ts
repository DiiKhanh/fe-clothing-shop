import { env } from '@/config/env';
import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const request = axios.create({
  baseURL: env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

function getRequestHeader(): AxiosRequestConfig | undefined {
  if (Cookies.get('token')) {
    return {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    };
  }
}

export const sendPostRequest = async (url: string, data: object | string) => {
  try {
    const response = await request.post(url, data, getRequestHeader());
    return { ...response.data, success: true };
  } catch (error: any) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};

export const sendPutRequest = async (url: string, data: object | string) => {
  try {
    const response = await request.put(url, data, getRequestHeader());
    return { ...response.data, success: true };
  } catch (error: any) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};

export const sendGetRequest = async (url: string) => {
  try {
    const response = await request.get(url, getRequestHeader());
    return { ...response.data, success: true };
  } catch (error: any) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};

export const sendDeleteRequest = async (url: string) => {
  try {
    const response = await request.delete(url, getRequestHeader());
    return { ...response.data, success: true };
  } catch (error: any) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};

export const getPromotionsService = async () => {
  try {
    const response = await axios.get('https://top3-services.azurewebsites.net/top-discount-products');
    return response.data;
  } catch (error: any) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};

export default request;
