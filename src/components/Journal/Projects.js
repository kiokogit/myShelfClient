import { Button, InputLabel,TextField } from '@material-ui/core'

import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getJournal } from '../../actions/journal';
import moment from 'moment';

import { ContentBox } from '../Dialogs/ContentBox';
import { MyDialog } from '../Dialogs/Dialogs';

// Projects
export const Projects = ({ submitEntry, editingEntry, cancelledDialog, deleteEntry }) => {
    const [add, setAdd] = useState(false);
    const [edit, setEdit] = useState(null);
    const [update, setUpdate] = useState({
        id: '',
        edit: false
    });

    // to effect the state by listening to clicks and submissions
    const [effect, setEffect] = useState(0);
    const newEffect = effect + 1;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getJournal('project'))
    },[dispatch, effect]);

    const projects = useSelector(state => state.journal.project)

    const editForm = (
        <div>
            <form id='form' name='form'>
                <div>
                    <TextField id='title' required label='Project Title' />
                </div>
                <div>
                    <TextField id='description' label='Description...' fullWidth multiline={true} />
                </div>
                <div>
                    <InputLabel>Deadline Date</InputLabel>
                    <TextField id='deadline' type='date' />
                </div>
                <div>
                    <InputLabel>Start Date</InputLabel>
                    <TextField id='start_date' type='datetime-local' />
                </div>
            </form>
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
                    'start_date': document.getElementById('start_date').value
                }
                submitEntry('project', entry);
                setAdd(false);
                setEffect(newEffect);
            }}>Save</Button>
            <Button onClick={e => {
                cancelledDialog()
                setAdd(false)
            }}>CANCEL</Button>
        </div>
    );

    const editActions = (
        <div>
            <Button onClick={e => {
                e.preventDefault();
                editingEntry('project', edit.id, edit.entry);
                setEdit(null);
                setEffect(newEffect);
            }}>Save</Button>
            <Button onClick={e => {
                cancelledDialog()
                setEdit(null)
            }}>CANCEL</Button>
        </div>
    );

    const progressActions = (project)=>(
        <div>
            <Button onClick={e => {
                e.preventDefault();
                const updated = [project.progress, document.getElementById('progress').value].join('\n')
                const entry = { ...project, progress: updated }
                editingEntry('project', project.id, entry);
                setUpdate({});
                setEffect(newEffect);
            }} >Save</Button>
            <Button onClick={e => {
                cancelledDialog()
                setUpdate({})
            }}>CANCEL</Button>
        </div>
    );

    const editContent = (
        <div>
            Would You like to submit the Details?
        </div>
    );

    const projectEditing = (project) => (
        <div>
            <Button
                disabled={project.closed ? true : false}
                onClick={(e) => {
                    e.preventDefault();
                    if (!project.open) {
                        //start the project
                        const entry = { ...project, open: true }
                        editingEntry('project', project.id, entry)
                        setEffect(newEffect);
                        return
                    }
                    else if (project.open && !project.closed) {
                        //close the project
                        const entry = { ...project, open: false, closed: true }
                        editingEntry('project', project.id, entry);
                        setEffect(newEffect);
                        return
                    }
                    
                }} >{project.closed ? 'Closed' : project.open ? 'Close' : 'Start'}</Button>
            {project.open ? <Button onClick={() => setUpdate({ id: project.id, edit: true })}>Update Progress</Button> : <Button onClick={(e) => {
                e.preventDefault()
                deleteEntry('project', project.id);
                setEffect(newEffect);
            }}>{project.closed ? 'Delete' : 'Cancel'}</Button>}
            {!update.edit ? null :
                <MyDialog
                    title={'Record Project Progress'}
                    content={<TextField id='progress' variant='outlined' placeholder='Progress...' fullWidth multiline={true} />}
                    actions={progressActions(project)}
                    open={update.edit}
                />
            }
        </div>
    );

    const details = (project) => (
        <div>
            <p>{project.description}</p>
            <h5>Progress</h5>
            <p>{project.progress}</p>
            <div>Last Updated: {moment(project.updated).fromNow()}</div>
            <p>Deadline {moment(project.deadline).fromNow()}</p>
        </div>
    );

    return (
        <div>
            <ContentBox
                type='project'
                title='Projects'
                details={details}
                editForm={editForm}
                actions={actions}
                list={projects}
                editActions={editActions}
                editContent={editContent}
                progressActions={progressActions}
                update={update}
                setUpdate={setUpdate}
                projectEditing={projectEditing}
                setAdd={setAdd}
                add={add}
            />
        </div>
    )
};
