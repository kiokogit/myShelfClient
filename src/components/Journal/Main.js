// React
import React, { useState} from 'react'
import { useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'

// Styling
import { Button, ButtonGroup, Card } from '@material-ui/core'

// Functions
import { addEntry, delEntry, editEntry } from '../../actions/journal';

// Components
import { Home } from './Home';
import { Diary } from './Diary';
import { Todo } from './Todos';
import { Meetings } from './Meetings';
import { Plans } from './Plans';
import { Events } from './Events';
import { Projects } from './Projects';
import { Quotes } from './Quotes';
import { Budget } from './Budget';
import { AlertBox } from '../Dialogs/AlertBox';

// Journal Container
export const Journal = () => {
    const dispatch = useDispatch();
    const [win, setWin] = useState('home');
    const [dialog, setDialog] = useState(null);

    //func to disappear the alert box, 10s
    if (dialog !== null) {
        setTimeout(() => {
            setDialog(null)
        }, 7000);
    };

    const cancelledDialog = () => {
        setDialog({
            title: 'warning',
            content: `Operation Cancelled by user`
        })
    };

    // send a journal entry
    const submitEntry = (type, entry) => {
        dispatch(addEntry(type, entry))
        setDialog({
            title: 'success',
            content: `A new ${type} entry has been saved`
        })
    };

    // delete a journal entry
    const deleteEntry = (type, id) => {
        dispatch(delEntry(type, id))
        setDialog({
            title: 'error',
            content: `You have Successfully deleted an entry: ${type}`
        })
    };

    // edit entries
    const editingEntry = (type, id, entry) => {
        dispatch(editEntry(type, id, entry))
        setDialog({
            title: 'info',
            content: `${type} details updated Successfully`
        })
    };

    return (
        <div className='journal-body'>
            <Card style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div>
                    <Button component={Link} to='/' >HOME</Button>
                    <Button onClick={() => setWin('home')}>Dashboard</Button>
                </div>
                <div>Journal</div>
                <div>
                </div>
            </Card>
            <div className='navbar'>
                <ButtonGroup color='primary'>
                    <Button variant={win === 'diary' ? 'contained' : ''} onClick={() => setWin('diary')} >Diary</Button>
                    <Button variant={win === 'meetings' ? 'contained' : ''} onClick={() => setWin('meetings')} >Meetings</Button>
                    <Button variant={win === 'todo' ? 'contained' : ''} onClick={() => setWin('todo')} >Tasks/Todos</Button>
                    <Button variant={win === 'events' ? 'contained' : ''} onClick={() => setWin('events')} >Events</Button>
                    <Button variant={win === 'plans' ? 'contained' : ''} onClick={() => setWin('plans')} >Plans</Button>
                    <Button variant={win === 'projects' ? 'contained' : ''} onClick={() => setWin('projects')} >Projects</Button>
                    <Button variant={win === 'quotes' ? 'contained' : ''} onClick={() => setWin('quotes')} >Quotes</Button>
                    <Button variant={win === 'budget' ? 'contained' : ''} onClick={() => setWin('budget')} >Budget</Button>
                </ButtonGroup>
            </div>
            <div className='main-win'>
                {dialog !== null && <AlertBox title={dialog.title} content={dialog.content} />}
                
                {win === 'home' && <Home />}
                {win === 'todo' && <Todo editingEntry={editingEntry} deleteEntry={deleteEntry} submitEntry={submitEntry} cancelledDialog={cancelledDialog} />}
                {win === 'diary' && <Diary deleteEntry={deleteEntry} submitEntry={submitEntry} cancelledDialog={cancelledDialog} />}
                {win === 'plans' && <Plans editingEntry={editingEntry} deleteEntry={deleteEntry} submitEntry={submitEntry} cancelledDialog={cancelledDialog} />}
                {win === 'meetings' && <Meetings editingEntry={editingEntry} deleteEntry={deleteEntry} submitEntry={submitEntry} cancelledDialog={cancelledDialog} />}
                {win === 'events' && <Events editingEntry={editingEntry} deleteEntry={deleteEntry} submitEntry={submitEntry} cancelledDialog={cancelledDialog} />}
                {win === 'projects' && <Projects editingEntry={editingEntry} deleteEntry={deleteEntry} submitEntry={submitEntry} cancelledDialog={cancelledDialog} />}
                {win === 'quotes' && <Quotes deleteEntry={deleteEntry} submitEntry={submitEntry} cancelledDialog={cancelledDialog} />}
                {win === 'budget' && <Budget deleteEntry={deleteEntry} submitEntry={submitEntry} cancelledDialog={cancelledDialog} />}
            </div>
        </div>
    )
};
