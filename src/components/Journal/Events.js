import { Button,  InputLabel, TextField } from '@material-ui/core'

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getJournal } from '../../actions/journal';
import { ContentBox } from '../Dialogs/ContentBox';


export const Events = ({ submitEntry, deleteEntry, cancelledDialog }) => {
    const [add, setAdd] = useState(false);

    // to effect the state by listening to clicks and submissions
    const [effect, setEffect] = useState(0);
    const newEffect = effect + 1;


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getJournal('event'))
    }, [dispatch, effect]);

    const events = useSelector(state => state.journal.event)

    const editForm = (
        <div>
            <div>
                <div>
                    <TextField id='title' required label='Event Title' />
                </div>
                <div>
                    <TextField id='description' label='Description...' fullWidth multiline={true} />
                </div>
                <div>
                    <TextField id='venue' required label='Venue' />
                </div>
                <div>
                    <InputLabel>Date</InputLabel>
                    <TextField id='date' type='date' />
                </div>  
            </div>
        </div>
    );

    const actions = (
        <div>
            <Button onClick={e => {
                e.preventDefault();
                const entry = {
                    'title': document.getElementById('title').value,
                    'description': document.getElementById('description').value,
                    'venue': document.getElementById('venue').value,
                    'date': document.getElementById('date').value
                }
                submitEntry('event', entry);
                setAdd(false);
                setEffect(newEffect);
            }}>Save</Button>
            <Button onClick={e => {
                cancelledDialog();
                setAdd(false)
            }}>CANCEL</Button>
        </div>
    );

    const details = (event) => (
        <div>
            <p>{event.description}</p>
            <p>Venue: {event.venue}</p>
        </div>
    );

    return (
        <div>
            <ContentBox
                type={'event'}
                title={'Events'}
                details={details}
                actions={actions}
                list={events}
                add={add}
                setAdd={setAdd}
                editForm={editForm}
            />
        </div>
    )
};
