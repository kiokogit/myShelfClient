import {  TextField, Button } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getJournal } from '../../actions/journal';
import { ContentBox } from '../Dialogs/ContentBox';


export const Diary = ({ submitEntry,cancelledDialog }) => {
    const [add, setAdd] = useState(false);


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getJournal('diary'))
    }, [dispatch]);

    const diary = useSelector(state => state.journal.diary)

    const editForm = (
        <div>
            <TextField id='title' required label='Title' />
            <TextField id='description' label='Description...' fullWidth multiline={true} />
        </div>
    );

    const onsubmit = (e) => {
        e.preventDefault();
        const entry = { 'title': document.getElementById('title').value, 'description': document.getElementById('description').value }
        submitEntry('diary', entry);
        setAdd(false);
    }
    const oncancel = (e) => {
        e.preventDefault();
        cancelledDialog();
        setAdd(false)
    };

    const details = (diary) => diary.description

    const expandedActions = (diary) => (
        <>
            <Button >LIKE</Button>
            <Button >COPY TEXT</Button>
        </>
    )

    return (
        <div>
            <ContentBox
                list={diary}
                details={details}
                onsubmit={onsubmit}
                oncancel={oncancel}
                expandedActions={expandedActions}
                editForm={editForm}
                type='diary'
                title='My Diary'
                add={add}
                setAdd={setAdd}
            />
        </div>
    )
};