import * as api from '../api/journalApi';
import { successAlert, errorAlert} from '../components/Dialogs/AlertBox';

export const getJournal = (type) => async (dispatch) => {
    try {
        const { data} = await api.getJournal(type);
        dispatch({ type: 'GET_JOURNAL', payload: data });
    } catch (e) {
        console.log(e)
    }
};

export const getUrgents = () => async (dispatch) => {
    try {
        // first reset the state;
        // dispatch({ type: 'RESET_STATE' });
        const { data} = await api.getUrgent();
        dispatch({ type: 'GET_JOURNAL', payload: data });
    } catch (e) {
        console.log(e)
    }
};

export const addEntry = (type, entry, setAlert) =>async(dispatch) =>{
    try {
        const { status } = await api.addEntry(type, entry);
        if (status < 300) setAlert(successAlert);
        dispatch(getJournal(type));
    } catch (e) {
        console.log(e)
        setAlert(errorAlert)
    }
};

export const delEntry = (type, id, setAlert) =>async(dispatch)=> {
    try {
        const { status } = await api.delEntry(type, id)
        if (status < 300) setAlert(successAlert);
        else setAlert(errorAlert);
        dispatch(getJournal(type));
    } catch (e) {
        console.log(e)
        setAlert(errorAlert)
    }
};

export const editEntry = (type, id, entry, setAlert) =>async(dispatch)=> {
    try {
       const {status} = await api.editEntry(type, id, entry)
        if (status < 300) setAlert(successAlert);
        else setAlert(errorAlert);
        dispatch(getJournal(type));
    } catch (e) {
        console.log(e)
        setAlert(errorAlert)
    }
};