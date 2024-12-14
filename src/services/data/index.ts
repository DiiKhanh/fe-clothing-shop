import { sendGetRequest } from '../request';

export const getCommonData = async () => {
  return await sendGetRequest('/data');
};
