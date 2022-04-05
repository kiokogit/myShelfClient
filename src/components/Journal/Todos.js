import { TextField, Button } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getJournal } from '../../actions/journal';
import { ContentBox } from '../Dialogs/ContentBox';

// TODO APP
export const Todo = ({ submitEntry, deleteEntry,editingEntry, cancelledDialog }) => {
    const [add, setAdd] = useState(false);
    const [info, setInfo] = useState(null)
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getJournal('todo'))
    }, [dispatch]);

    const todos = useSelector(state => state.journal.todo)

    const editForm = (
        <div>
            <TextField id='title' required label='Task...' />
            <TextField type='text' id='description' label='Description...' fullWidth multiline={true} />
        </div>);

    const onsubmit = (e) => {
        e.preventDefault();
        const entry = { 'title': document.getElementById('title').value, 'description': document.getElementById('description').value }
        submitEntry('todo', entry);
        setAdd(false);
    };

    const oncancel = (e) => {
        cancelledDialog()
        setAdd(false)
    };
               
    const details = (todo) => (
        <div>
            <div>
            {todo.description}
            </div>
        </div>
    );

    const expandedActions = (todo) => {
        if (!todo.done) setInfo(null)
        return (
            <div>
                <Button color='primary' onClick={e => {
                    e.preventDefault()
                    if (todo.done) setInfo('Task already marked as done')
                    else {
                        const entry = { ...todo, done: true }
                        editingEntry('todo', todo.id, entry)
                    }
                }} >{todo.done ? 'Already Done' : 'Mark as Done'}</Button>
                {info !== null && <div>
                    {info}
                    <Button onClick={e => {
                        const entry = { ...todo, done: false }
                        editingEntry('todo', todo.id, entry);
                        setInfo(null);
                    }} >Mark not yet Done?</Button>
                </div>}
            </div>
        )
    };

    return (
        <div>
            <ContentBox
                type='todo'
                title='To Dos'
                details={details}
                list={todos}
                editForm={editForm}
                onsubmit={onsubmit}
                oncancel={oncancel}
                expandedActions={expandedActions}
                setAdd={setAdd}
                add={add} />
        </div>
    )
};
