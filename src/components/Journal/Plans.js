import { InputLabel,TextField, Typography, Button} from '@material-ui/core'
import moment from 'moment';

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getJournal } from '../../actions/journal';

import { ContentBox } from '../Dialogs/ContentBox';

// Plans
export const Plans = ({ submitEntry,cancelledDialog }) => {
    const [add, setAdd] = useState(false);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getJournal('plan'))
    }, [dispatch]);

    const plans = useSelector(state => state.journal.plan)

    const editForm = (
        <div>
            <TextField id='title' required label='Goal' />
            <TextField id='description' label='Description...' fullWidth multiline={true} />
            <InputLabel>Deadline</InputLabel>
            <TextField id='deadline' type='date' />
        </div>
    );

    const onsubmit = (e) => {
        e.preventDefault();
        const entry = {
            'title': document.getElementById('title').value,
            'description': document.getElementById('description').value,
            'deadline': document.getElementById('deadline').value,
        }
        submitEntry('plan', entry);
        setAdd(false);
    };

    const expandedActions = (plan)=>(
        <div>
            <Button>Mark As Achieved</Button>
            <Button>Mark As Aborted</Button>
        </div>
    );

    const oncancel = (e) => {
        cancelledDialog()
        setAdd(false)
    };

    const details = (plan) => (
        <div>
            <p>{plan.description}</p>
            <Typography variant='caption' style={new Date(plan.deadline) < new Date() ? {color:'red'}:{color:'green'}} >Deadline {moment(plan.deadline).fromNow()}</Typography>
        </div>
    );

    return (
        <div>
            <ContentBox
                title={'Plans'}
                type={'plan'}
                details={details}
                onsubmit={onsubmit}
                oncancel={oncancel}
                expandedActions={expandedActions}
                list={plans}
                add={add}
                setAdd={setAdd}
                editForm={editForm}
            />
        </div>
    )
};
