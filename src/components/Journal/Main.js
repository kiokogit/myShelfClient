// React
import React, { useState} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';

// Styling
import { Button, ButtonGroup, Card } from '@material-ui/core'

// Functions
import { addEntry, editEntry } from '../../actions/journal';

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
import { AlertBox, infoAlert } from '../Dialogs/AlertBox';

// Journal Container
export const Journal = () => {
    const dispatch = useDispatch();
    const [win, setWin] = useState('home');
    const [alert, setAlert] = useState(null);

    //func to disappear the alert box, 5s
    if (alert !== null) {
        setTimeout(() => {
            setAlert(null)
        }, 5000);
    };

    const cancelledDialog = () => {
        setAlert(infoAlert)
    };

    // send a journal entry
    const submitEntry = (type, entry) => {
        dispatch(addEntry(type, entry, setAlert))
    };

    // edit entries
    const editingEntry = (type, id, entry) => {
        dispatch(editEntry(type, id, entry, setAlert))
    };

    return (
        <div>
            <Card style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <div>
                    <Button component={Link} to='/' >HOME</Button>
                    <Button component={Link} to='home/' onClick={() => setWin('home')}>Dashboard</Button>
                </div>
                <div>Journal</div>
                <div>
                </div>
            </Card>
            <div className='navbar'>
                <ButtonGroup color='primary'>
                    <Button component={Link} to='diary/' variant={win === 'diary' ? 'contained' : ''} onClick={() => setWin('diary')} >Diary</Button>
                    <Button component={Link} to='meetings/' variant={win === 'meetings' ? 'contained' : ''} onClick={() => setWin('meetings')} >Meetings</Button>
                    <Button component={Link} to='todos/' variant={win === 'todo' ? 'contained' : ''} onClick={() => setWin('todo')} >Tasks/Todos</Button>
                    <Button component={Link} to='events/' variant={win === 'events' ? 'contained' : ''} onClick={() => setWin('events')} >Events</Button>
                    <Button component={Link} to='plans/' variant={win === 'plans' ? 'contained' : ''} onClick={() => setWin('plans')} >Plans</Button>
                    <Button component={Link} to='projects/' variant={win === 'projects' ? 'contained' : ''} onClick={() => setWin('projects')} >Projects</Button>
                    <Button component={Link} to='quotes/' variant={win === 'quotes' ? 'contained' : ''} onClick={() => setWin('quotes')} >Quotes</Button>
                    <Button component={Link} to='budget/' variant={win === 'budget' ? 'contained' : ''} onClick={() => setWin('budget')} >Budget</Button>
                </ButtonGroup>
            </div>
            <div className='main-win'>
                {alert !== null && <AlertBox severity={alert.severity} message={alert.message} />}
                
                {win === 'home' && <Home />}
                {win === 'todo' && <Todo editingEntry={editingEntry} submitEntry={submitEntry} cancelledDialog={cancelledDialog} />}
                {win === 'diary' && <Diary submitEntry={submitEntry} cancelledDialog={cancelledDialog} />}
                {win === 'plans' && <Plans editingEntry={editingEntry} submitEntry={submitEntry} cancelledDialog={cancelledDialog} />}
                {win === 'meetings' && <Meetings editingEntry={editingEntry} submitEntry={submitEntry} cancelledDialog={cancelledDialog} />}
                {win === 'events' && <Events editingEntry={editingEntry} submitEntry={submitEntry} cancelledDialog={cancelledDialog} />}
                {win === 'projects' && <Projects editingEntry={editingEntry} submitEntry={submitEntry} cancelledDialog={cancelledDialog} />}
                {win === 'quotes' && <Quotes submitEntry={submitEntry} cancelledDialog={cancelledDialog} />}
                {win === 'budget' && <Budget submitEntry={submitEntry} cancelledDialog={cancelledDialog} />}
            </div>
        </div>
    )
};
