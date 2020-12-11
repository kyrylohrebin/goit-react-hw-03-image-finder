import Axios from 'axios';

const key = '18662312-a5f7d9a00f5eb78409595edb4';

async function api(query, page) {
  try {
    const response = await Axios.get(
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${query}&page=${page}&per_page=12&key=${key}`,
    );
    const { data } = response;
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export default api;
