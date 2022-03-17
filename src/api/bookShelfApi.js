import axios from 'axios'
import env from 'react-dotenv'

const API = axios.create({ baseURL: `${env.BASE_URL}bookshelf/`});

export const getBooks = () => API.get('books/all/');
export const addBook = (book) => API.post('books/add/', book);
export const editBook = (id, book) => API.patch(`books/edit/${id}/`, book);
export const delBook = (id) => API.delete(`books/delete/${id}/`);

export const getComments = () => API.get(`comments/all/`)
export const newComment = (id, body) => API.post(`comments/add/${id}/`, body)