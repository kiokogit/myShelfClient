import { Button,InputLabel, TextField, Typography} from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getJournal } from '../../actions/journal';

import { ContentBox } from '../Dialogs/ContentBox';
import moment from 'moment';


// Meetings Plans
export const Meetings = ({ submitEntry, deleteEntry, cancelledDialog }) => {
    const [add, setAdd] = useState(false);
    
    // to effect the state by listening to clicks and submissions
    const [effect, setEffect] = useState(0);
    const newEffect = effect + 1;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getJournal('meeting'))
    }, [dispatch, effect]);

    const meetings = useSelector(state => state.journal.meeting)

    const editForm = (
        <div>
            <div>
                <TextField id='title' required label='Meet With...' />
            </div>
            <div>
                <TextField id='venue' required label='Venue/Link' />
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
                <TextField id='agenda' required label='Agenda' />
            </div>
            <div>
                <TextField id='called_by' label='Chaired by...' />
            </div>
            <div>
                <TextField id='requirements' label='Requirements' />
            </div>
            <div>
                <TextField id='my_contribution' label='My Contribution' />
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
                setEffect(newEffect);
            }}>Save</Button>
            <Button onClick={e => {
                cancelledDialog();
                setAdd(false)
            }}>CANCEL</Button>
        </div>
    );

    const details = (meeting) => (
        <div >
            <p>{meeting.description}</p>
            <Typography style={new Date(meeting.date) < new Date() ? { backgroundColor: 'red' } : { backgroundColor: 'green', color:'white' }}> Date: {new Date(meeting.date).toDateString()} - {new Date(meeting.date) < new Date() ?'Passed':"Ahead"}: {moment(meeting.date).fromNow()}  </Typography>
            <Typography>From: {meeting.start_time} hrs</Typography>
            <Typography>To: {meeting.end_time} hrs</Typography>
            <Typography>Venue: {meeting.venue}</Typography>
            <Typography>Agenda:{meeting.agenda}</Typography>
        </div>
    );

    const editActions = (
        <div>
            Availability:
            <Button>Confirm</Button>
        </div>
    )

    return (
        <div>
            <ContentBox
                title={'Meetings'}
                type={'meeting'}
                details={details}
                actions={actions}
                list={meetings}
                add={add}
                setAdd={setAdd}
                editForm={editForm}
                editActions={editActions}
            />
        </div>
    )
};
