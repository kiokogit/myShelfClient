import axios from 'axios';

const baseUrl = 'http://localhost:8000/api/journal/';

const API = axios.create({ baseURL: baseUrl });

export const getJournal = () => API.get('get/');
export const addEntry = (type, entry) => API.post(`new/${type}/`, entry);
export const editEntry = (type, id, entry) => API.patch(`edit/${type}/${id}/`, entry);
export const delEntry = (type, id) => API.delete(`delete/${type}/${id}/`);