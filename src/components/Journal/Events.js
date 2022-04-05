import { InputLabel, TextField, Button } from '@material-ui/core'

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getJournal } from '../../actions/journal';
import { ContentBox } from '../Dialogs/ContentBox';


export const Events = ({ submitEntry, cancelledDialog, editingEntry }) => {
    const [add, setAdd] = useState(false);


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getJournal('event'))
    }, [dispatch]);

    const events = useSelector(state => state.journal.event)

    const editForm = (
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
    );

    const onsubmit = (e) => {
        e.preventDefault();
        const entry = {
            'title': document.getElementById('title').value,
            'description': document.getElementById('description').value,
            'venue': document.getElementById('venue').value,
            'date': document.getElementById('date').value
        }
        submitEntry('event', entry);
        setAdd(false);
    };

    const oncancel = (e) => {
        cancelledDialog();
        setAdd(false)
    }

    const details = (event) => (
        <div>
            <p>{event.description}</p>
            <p>Venue: {event.venue}</p>
            <h5>
                Availability:
            {event.available? 'Positive':'Negative'}
            </h5>
        </div>
    );

    const expandedActions = (event) => (
        <div>
            {new Date(event.date) < new Date()? 'Past Event':<div>
            <Button onClick={e => {
                e.preventDefault();
                const entry = { ...event, available: !event.available }
                    editingEntry('event', event.id, entry);
            }}>{ event.available? 'Cancel Availability':'Click to Attend' }</Button>
                <Button>Cancelled</Button>
            </div>}
        </div>
    )

    return (
        <div>
            <ContentBox
                type={'event'}
                title={'Events'}
                details={details}
                onsubmit={onsubmit}
                oncancel={oncancel}
                expandedActions={expandedActions}
                list={events}
                add={add}
                setAdd={setAdd}
                editForm={editForm}
            />
        </div>
    )
};
