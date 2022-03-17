import axios from 'axios';
import env from 'react-dotenv';

const API = axios.create({ baseURL: `${env.BASE_URL}journal/` });

export const getJournal = (type) => API.get(`get/${type}/`);
export const addEntry = (type, entry) => API.post(`new/${type}/`, entry);
export const editEntry = (type, id, entry) => API.patch(`edit/${type}/${id}/`, entry);
export const delEntry = (type, id) => API.delete(`delete/${type}/${id}/`);