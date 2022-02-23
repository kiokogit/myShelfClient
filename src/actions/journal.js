import * as api from '../api/journalApi';

export const getJournal = () => async (dispatch) => {
    try {
        const { data } = await api.getJournal();
        dispatch({ type: 'GET_JOURNAL', payload: data });
    } catch (e) {
        console.log(e)
    }
};

export const addEntry = (type, entry) => async (dispatch) => {
    try {
        await api.addEntry(type, entry);
    } catch (e) {
        console.log(e)
    }
}

export const delEntry = (type, id) => async (dispatch) => {
    try {
        await api.delEntry(type, id)
    } catch (e) {
        console.log(e)
    }
}

export const editEntry = (type, id, entry) => async (dispatch) => {
    try {
        await api.editEntry(type, id, entry)
    } catch (e) {
        console.log(e)
    }
}