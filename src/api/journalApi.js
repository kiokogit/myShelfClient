import axios from 'axios';

const BASE_URL='http://localhost:8000/api/'
const API = axios.create({ baseURL: `${BASE_URL}journal/` });

export const getJournal = (type) => API.get(`get/${type}/`);
export const getUrgent = () => API.get(`urgents/all/`);
export const addEntry = (type, entry) => API.post(`new/${type}/`, entry);
export const editEntry = (type, id, entry) => API.patch(`edit/${type}/${id}/`, entry);
export const delEntry = (type, id) => API.delete(`delete/${type}/${id}/`);