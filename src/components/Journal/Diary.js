import { Button, TextField } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getJournal } from '../../actions/journal';
import { ContentBox } from '../Dialogs/ContentBox';


export const Diary = ({ submitEntry, deleteEntry, cancelledDialog }) => {
    const [add, setAdd] = useState(false);

    // to effect the state by listening to clicks and submissions
    const [effect, setEffect] = useState(0);
    const newEffect = effect + 1;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getJournal('diary'))
    }, [dispatch, effect]);

    const diary = useSelector(state => state.journal.diary)

    const editForm = (
        <div>
            <TextField id='title' required label='Title' />
            <TextField id='description' label='Description...' fullWidth multiline={true} />
        </div>
    );

    const actions = (
        <div>
            <Button onClick={e => {
                e.preventDefault();
                const entry = { 'title': document.getElementById('title').value, 'description': document.getElementById('description').value }
                submitEntry('diary', entry);
                setAdd(false);
                setEffect(newEffect)
            }}>Save</Button>
            <Button onClick={e => {
                cancelledDialog();
                setAdd(false)
            }}>CANCEL</Button>
        </div>
    );

    const details = (diary) => diary.description

    return (
        <div>
            <ContentBox
                list={diary}
                details={details}
                actions={actions}
                editForm={editForm}
                type='Diary'
                title='My Diary'
                add={add}
                setAdd={setAdd}
            />
        </div>
    )
};