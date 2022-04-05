import { Button,InputLabel, TextField, Typography} from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getJournal } from '../../actions/journal';

import { ContentBox } from '../Dialogs/ContentBox';

// Meetings Plans
export const Meetings = ({ submitEntry,cancelledDialog, editingEntry }) => {
    const [add, setAdd] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getJournal('meeting'))
    }, [dispatch]);

    const meetings = useSelector(state => state.journal.meeting)

    const editForm = (
        <div>
            <div>
                <TextField id='title' required label='Meet With...' />
            </div>
            <div>
                <TextField id='venue' required label='Venue/Link' fullWidth />
            </div>
            <InputLabel htmlFor='date'>Date</InputLabel>
            <div>
                <TextField id='date' type='date' />
            </div>
            <InputLabel htmlFor='start_time'>Starting Time</InputLabel>
            <div>
                <TextField id='start_time' type='time' />
            </div>
            <InputLabel htmlFor='end_time'>Ending Time</InputLabel>
            <div>
                <TextField id='end_time' type='time' />
            </div>
            <div>
                <TextField id='description' label='Purpose...' fullWidth multiline={true} />
            </div>
            <div>
                <TextField id='agenda' required label='Agenda' fullWidth />
            </div>
            <div>
                <TextField id='called_by' required label='Chaired by...' fullWidth />
            </div>
            <div>
                <TextField id='requirements' label='Requirements' fullWidth />
            </div>
            <div>
                <TextField id='my_contribution' label='My Contribution' fullWidth />
            </div>
        </div>
    );

    const onsubmit = (e) => {
        e.preventDefault();
        const entry = {
            'title': document.getElementById('title').value,
            'description': document.getElementById('description').value,
            'venue': document.getElementById('venue').value,
            'date': document.getElementById('date').value,
            'start_time': document.getElementById('start_time').value,
            'end_time': document.getElementById('end_time').value,
            'agenda': document.getElementById('agenda').value,
            'called_by': document.getElementById('called_by').value,
            'requirements': document.getElementById('requirements').value,
            'my_contribution': document.getElementById('my_contribution').value,
        }
        submitEntry('meeting', entry);
        setAdd(false);
    };

    const oncancel = (e) => {
        cancelledDialog();
        setAdd(false)
    };

    const details = (meeting) => (
        <div >
            <p>{meeting.description}</p>
            <Typography> Date: {new Date(meeting.date).toDateString()} </Typography>
            <Typography>From: {meeting.start_time} hrs</Typography>
            <Typography>To: {meeting.end_time} hrs</Typography>
            <Typography>Venue: {meeting.venue}</Typography>
            <Typography>Agenda:{meeting.agenda}</Typography>
            <p>Availability: {meeting.available ? 'Positive' : 'Negative'}</p>
        </div>
    );

    const expandedActions = (meeting)=>(
        <div>
            {new Date(meeting.date)>new Date() ?
                <Button onClick={e => {
                    e.preventDefault();
                    const entry = { ...meeting, available: !meeting.available }
                    editingEntry('meeting', meeting.id, entry)
                }} >{meeting.available ? 'Cancel Availability' : 'Click to Attend'}</Button> : 'Old meeting'}
        </div>
    )

    return (
        <div>
            <ContentBox
                title={'Meetings'}
                type={'meeting'}
                details={details}
                onsubmit={onsubmit}
                oncancel={oncancel}
                expandedActions={expandedActions}
                list={meetings}
                add={add}
                setAdd={setAdd}
                editForm={editForm}
            />
        </div>
    )
};
