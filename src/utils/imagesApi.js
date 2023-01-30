import axios from 'axios';

const API_KEY = '32417396-5b16c4c00fd3d3c2a99983bbd';
axios.defaults.baseURL = 'https://pixabay.com';

export const getImagesApi = async (q, page) => {
  return axios.get('/api/', {
    params: {
      q,
      page,
      key: API_KEY,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });
};
