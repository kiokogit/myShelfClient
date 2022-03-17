import { Button, TextField } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getJournal } from '../../actions/journal';
import { ContentBox } from '../Dialogs/ContentBox';

// TODO APP
export const Todo = ({ submitEntry, deleteEntry, cancelledDialog }) => {
    const [add, setAdd] = useState(false);

    // to effect the state by listening to clicks and submissions
    const [effect, setEffect] = useState(0);
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getJournal('todo'))
    }, [dispatch, effect]);

    const todos = useSelector(state => state.journal.todo)

    const editForm = (
        <div>
            <TextField id='title' required label='Task...' />
            <TextField type='text' id='description' label='Description...' fullWidth multiline={true} />
        </div>);
    
    const actions = (
        <div>
            <Button onClick={e => {
                e.preventDefault();
                const entry = { 'title': document.getElementById('title').value, 'description': document.getElementById('description').value }
                submitEntry('todo', entry);
                setAdd(false);
                const newEffect = effect + 1;
                setEffect(newEffect);
            }}>Save</Button>
            <Button onClick={e => {
                cancelledDialog()
                setAdd(false)
            }}>CANCEL</Button>
        </div>
    );
               
    const details = (todo) => (
        <div>
            {todo.description}
        </div>
    )

    return (
        <div>
            <ContentBox
                type='Todo'
                title='To Dos'
                details={details}
                list={todos}
                editForm={editForm}
                actions={actions}
                setAdd={setAdd}
                add={add} />
        </div>
    )
};
