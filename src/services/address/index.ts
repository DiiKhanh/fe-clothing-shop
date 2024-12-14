import { sendGetRequest } from '../request';

export const getProvinces = async () => {
  return sendGetRequest('https://vapi.vnappmob.com/api/province/');
};

export const getDistricts = async (provinceId: string) => {
  return sendGetRequest(`https://vapi.vnappmob.com/api/province/district/${provinceId}`);
};

export const getWards = async (districtId: string) => {
  return sendGetRequest(`https://vapi.vnappmob.com/api/province/ward/${districtId}`);
};
