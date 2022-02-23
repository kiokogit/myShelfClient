import * as api from '../api/bookShelfApi';

//get books
export const getBooks = () => async (dispatch) => {
    try {
        const { data } = await api.getBooks();
        dispatch({ type: 'GET_BOOKS', payload: data });
    } catch (e) {
        console.log(e)
    }
}

//add book
export const addBook = (book) => async (dispatch) => {
    try {
        await api.addBook(book);
    } catch (e) {
        console.log(e)
    }
}

//edit a book - including start reading, like, etc
export const editBook = (id, book) =>async(dispatch)=> {
    try {
        await api.editBook(id, book)
    } catch (e) {
        console.log(e)
    }
}

//delete a book
export const delBook = (id) => async(dispatch)=> {
    try {
        await api.delBook(id)
    } catch (e) {
        console.log(e)
    }
}

// #get all comments
export const getComments = () => async (dispatch) => {
    try {
        const { data } = await api.getComments();
        dispatch({type:'GET_COMMENTS', payload:data})
    } catch (e) {
        console.log(e);
    }
}

// submit a new comment
export const newComment = (id, body) => async (dispatch) => {
    try {
        await api.newComment(id, body)
    } catch(e) {
        console.log(e)
    }
}
