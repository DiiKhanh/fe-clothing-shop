import { sendGetRequest } from '../request';

export const getIntroImages = async () => {
  const { images } = await sendGetRequest('/images/intro');
  return images;
};
