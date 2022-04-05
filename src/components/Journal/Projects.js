import { Button, InputLabel,TextField } from '@material-ui/core'

import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getJournal } from '../../actions/journal';
import moment from 'moment';

import { ContentBox } from '../Dialogs/ContentBox';
import { MyDialog } from '../Dialogs/Dialogs';

// Projects
export const Projects = ({ submitEntry, editingEntry, cancelledDialog}) => {
	const [add, setAdd] = useState(false);
	const [edit, setEdit] = useState(null);
	const [update, setUpdate] = useState({
		id: '',
		edit: false
	});

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getJournal('project'))
	},[dispatch]);

	const projects = useSelector(state => state.journal.project)

	const editForm = (
		<div>
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
		</div>
	);

	const onsubmit = (e) => {
		e.preventDefault();
		const entry = {
			'title': document.getElementById('title').value,
			'description': document.getElementById('description').value,
			'deadline': document.getElementById('deadline').value,
			'start_date': document.getElementById('start_date').value
		}
		submitEntry('project', entry);
		setAdd(false);
	};

	const oncancel = (e) => {
		cancelledDialog()
		setAdd(false)
	};

	const editActions = (
		<div>
			<Button onClick={e => {
				e.preventDefault();
				editingEntry('project', edit.id, edit.entry);
				setEdit(null);
			}}>Save</Button>
			<Button onClick={e => {
				cancelledDialog()
				setEdit(null)
			}}>CANCEL</Button>
		</div>
	);

	const progressSubmit = (e, project) => {
		e.preventDefault();
		const updated = [project.progress, document.getElementById('progress').value].join('\n')
		const entry = { ...project, progress: updated }
		editingEntry('project', project.id, entry);
		setUpdate({});
		return
	};

	const editContent = (
		<div>
			Would You like to submit the Details?
		</div>
	);

	const expandedActions = (project) => (
		<div>
			<Button
				disabled={project.closed ? true : false}
				onClick={(e) => {
					e.preventDefault();
					if (!project.open) {
						//start the project
						const entry = { ...project, open: true }
						editingEntry('project', project.id, entry)
						return
					}
					else if (project.open && !project.closed) {
						//close the project
						const entry = { ...project, open: false, closed: true }
						editingEntry('project', project.id, entry);
						return
					}
					
				}} >{project.closed ? 'Closed' : project.open ? 'Close' : 'Start'}</Button>
			{project.open ? <Button onClick={() => setUpdate({ id: project.id, edit: true })}>Update Progress</Button>:null }
			{!update.edit ? null :
				<MyDialog
					title={'Record Project Progress'}
					content={<TextField id='progress' variant='outlined' placeholder='Progress...' fullWidth multiline={true} />}
					onsubmit={(e) => progressSubmit(e, project)}
					open={update.edit}
					oncancel={(e) => {
						e.preventDefault();
						setUpdate({})
					}}
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
				onsubmit={onsubmit}
				oncancel={oncancel}
				list={projects}
				editActions={editActions}
				editContent={editContent}
				update={update}
				setUpdate={setUpdate}
				expandedActions={expandedActions}
				setAdd={setAdd}
				add={add}
			/>
		</div>
	)
};
