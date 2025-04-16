import axios from 'axios';

const API_URL =
  'https://newsdata.io/api/1/news?apikey=pub_81011baf0cd3340a6629a61ec3aae42c85826&q=ia&country=co&language=es&category=technology';

const STORAGE_KEY = 'noticias';

export const getNoticias = async () => {
  try {
    const response = await axios.get(API_URL);
    if (response.data.status === 'success') {
      const noticias = response.data.results;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(noticias));
      return noticias;
    } else {
      console.error('Error papacho:', response.data);
      const cached = localStorage.getItem(STORAGE_KEY);
      return cached ? JSON.parse(cached) : [];
    }
  } catch (error) {
    console.error('Error al consumir la API :', error);

    const cached = localStorage.getItem(STORAGE_KEY);
    return cached ? JSON.parse(cached) : [];
  }
};
