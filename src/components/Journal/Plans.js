import { Button, InputLabel,TextField, Typography} from '@material-ui/core'
import moment from 'moment';

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getJournal } from '../../actions/journal';

import { ContentBox } from '../Dialogs/ContentBox';

// Plans
export const Plans = ({ submitEntry, deleteEntry, cancelledDialog }) => {
    const [add, setAdd] = useState(false);

    // to effect the state by listening to clicks and submissions
    const [effect, setEffect] = useState(0);
    const newEffect = effect + 1;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getJournal('plan'))
    }, [dispatch, effect]);

    const plans = useSelector(state => state.journal.plan)

    const editForm = (
        <div>
            <div>
                <TextField id='title' required label='Goal' />
                <TextField id='description' label='Description...' fullWidth multiline={true} />
                <InputLabel>Deadline</InputLabel>
                <TextField id='deadline' type='date' />
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
                    'deadline': document.getElementById('deadline').value,
                }
                submitEntry('plan', entry);
                setAdd(false);
                setEffect(newEffect);
            }}>Save</Button>
            <Button onClick={e => {
                cancelledDialog()
                setAdd(false)
            }}>CANCEL</Button>
        </div>
    );

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
                actions={actions}
                list={plans}
                add={add}
                setAdd={setAdd}
                editForm={editForm}
            />
        </div>
    )
};
