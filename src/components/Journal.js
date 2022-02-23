import { Button, ButtonGroup, Card, InputLabel, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel, TextField } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getJournal, addEntry, delEntry, editEntry } from '../actions/journal';
import moment from 'moment';

export const Journal = () => {
    const dispatch = useDispatch();
    const [win, setWin] = useState('home');

    useEffect(() => {
        dispatch(getJournal())
    }, [dispatch]);

    const journalEntries = useSelector(state => state.journal);
    
    const todos = journalEntries.todos;
    const meetings = journalEntries.meetings;
    const diary = journalEntries.diary;
    const events = journalEntries.events;
    const plans = journalEntries.plans;
    const projects = journalEntries.projects;
    const quotes = journalEntries.quotes;
    const budget = journalEntries.budget;

    // send a journal entry
    const submitEntry = (type, entry) => {
        dispatch(addEntry(type, entry));
        dispatch(getJournal());
    }

    // delete a journal entry
    const deleteEntry = (type, id) => {
        dispatch(delEntry(type, id))
        dispatch(getJournal());
    }

    // edit entries
    const editingEntry = (type, id, entry) => {
        dispatch(editEntry(type, id, entry));
        dispatch(getJournal());
    }

    return (
        <div>
            <Button component={Link} to='/' >HOME</Button>
            Journal
            <Button onClick={() => setWin('home')}>Dashboard</Button>
            <hr />
            <ButtonGroup>
                <Button onClick={() => setWin('diary')} >Diary</Button>
                <Button onClick={() => setWin('meetings')} >Meetings</Button>
                <Button onClick={() => setWin('todo')} >Tasks/Todos</Button>
                <Button onClick={() => setWin('events')} >Events</Button>
                <Button onClick={() => setWin('plans')} >Plans</Button>
                <Button onClick={() => setWin('projects')} >Projects</Button>
                <Button onClick={() => setWin('quotes')} >Quotes</Button>
                <Button onClick={() => setWin('budget')} >Budget</Button>
            </ButtonGroup>
            <div>
                {win === 'home' && <Home />}
                {win === 'todo' && <Todo editingEntry={editingEntry} deleteEntry={deleteEntry} submitEntry={submitEntry} todos={todos} />}
                {win === 'diary' && <Diary deleteEntry={deleteEntry} submitEntry={submitEntry} diary={diary} />}
                {win === 'plans' && <Plans editingEntry={editingEntry} deleteEntry={deleteEntry} submitEntry={submitEntry} plans={plans} />}
                {win === 'meetings' && <Meetings editingEntry={editingEntry} deleteEntry={deleteEntry} submitEntry={submitEntry} meetings={meetings} />}
                {win === 'events' && <Events editingEntry={editingEntry} deleteEntry={deleteEntry} submitEntry={submitEntry} events={events} />}
                {win === 'projects' && <Projects editingEntry={editingEntry} deleteEntry={deleteEntry} submitEntry={submitEntry} projects={projects} />}
                {win === 'quotes' && <Quotes deleteEntry={deleteEntry} submitEntry={submitEntry} quotes={quotes} />}
                {win === 'budget' && <Budget deleteEntry={deleteEntry} submitEntry={submitEntry} budget={budget}/>}
            </div>
        </div>
    )
};

// HOME APP
const Home = () => {
    
    return (
        <div>
            <h4>Welcome Home</h4>
            <p>Late Projects</p>
            <p>Upcoming Meetings</p>
            <p>Upcoming Events</p>
        </div>
    )
}

// TODO APP
const Todo = ({ submitEntry, todos, deleteEntry }) => {
    const [add, setAdd] = useState(false);

    return (
        <div>
            <h2>To Do's
                <Button onClick={() => setAdd(!add)}>{add ? 'CANCEL' : 'ADD'}</Button>
            </h2>
            {add === true &&
                <Card>
                    <TextField id='title' required label='Task...' />
                    <TextField id='description' label='Description...' fullWidth multiline={true} />
                    <Button onClick={e => {
                        e.preventDefault();
                        const entry = { 'title': document.getElementById('title').value, 'description': document.getElementById('description').value }
                        submitEntry('todo', entry);
                        setAdd(false)
                    }}>Save</Button>
                </Card>}
            <div>
                {todos?.length < 1 ? 'No Tasks to Show' : todos?.map((todo, i = 0) =>
                    <div key={todo.id}>
                        <h3>{i + 1}. {todo.title}
                            <Button onClick={(e) => {
                                e.preventDefault();
                                deleteEntry('todo', todo.id)
                            }}>x</Button>
                        </h3>
                        <p>{todo.description}</p>
                    </div>
                )}
            </div>
        </div>
    )
};

// Diary App
const Diary = ({ submitEntry, diary, deleteEntry }) => {
    const [add, setAdd] = useState(false);

    return (
        <div>
            <h2>My Diary
                <Button onClick={() => setAdd(!add)}>{add ? 'CANCEL' : 'ADD'}</Button>
            </h2>
            {add === true &&
                <Card>
                    <TextField id='title' required label='Title' />
                    <TextField id='description' label='Description...' fullWidth multiline={true} />
                    <Button onClick={e => {
                        e.preventDefault();
                        const entry = { 'title': document.getElementById('title').value, 'description': document.getElementById('description').value }
                        submitEntry('diary', entry);
                        setAdd(false);
                    }}>Save</Button>
                </Card>}
            <div>
                {diary?.length < 1 ? 'No Diary Entries to Show' : diary?.map((diary) =>
                    <div key={diary.id}>
                        <hr/>
                        <hr/>
                        <h3>{new Date(diary.date).toDateString()}</h3>
                        <hr/>
                        <h3>{diary.title}
                            <Button onClick={(e) => {
                                e.preventDefault();
                                deleteEntry('diary', diary.id)
                            }}>x</Button>
                        </h3>
                        <p>{diary.description}</p>
                    </div>
                )}
            </div>
        </div>
    )
};

// Meetings Plans
const Meetings = ({ submitEntry, meetings, deleteEntry }) => {
    const [add, setAdd] = useState(false);

    return (
        <div>
            <h2>Meetings
                <Button onClick={() => setAdd(!add)}>{add ? 'CANCEL' : 'ADD'}</Button>
            </h2>
            {add === true &&
                <Card>
                    <div>
                        <TextField id='title' required label='Meet With...' />
                    </div>
                    <div>
                        <TextField id='venue' required label='Venue/Link' />
                    </div>
                    <InputLabel htmlFor='start_time'>Starting Time</InputLabel>
                    <div>
                        <TextField id='start_time' type='datetime-local' />
                    </div>
                    <InputLabel htmlFor='end_time'>Ending Time</InputLabel>
                    <div>
                        <TextField id='end_time' type='datetime-local' />
                    </div>
                    <div>
                        <TextField id='description' label='Description...' fullWidth multiline={true} />
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
                    <Button onClick={e => {
                        e.preventDefault();
                        const entry = {
                            'title': document.getElementById('title').value,
                            'description': document.getElementById('description').value,
                            'venue': document.getElementById('venue').value,
                            'start_time': document.getElementById('start_time').value,
                            'end_time': document.getElementById('end_time').value,
                            'agenda': document.getElementById('agenda').value,
                            'called_by': document.getElementById('called_by').value,
                            'requirements': document.getElementById('requirements').value,
                            'my_contribution': document.getElementById('my_contribution').value,
                        }
                        submitEntry('meeting', entry);
                        setAdd(false)
                    }}>Save</Button>
                </Card>}
            <div>
                {meetings?.length < 1 ? 'No Meetings to Show' : meetings?.map((meeting, i = 0) =>
                    <div key={meeting.id}>
                        <h6>Meet with</h6>
                        <h3>{i + 1}. {meeting.title}
                            <Button onClick={(e) => {
                                e.preventDefault();
                                deleteEntry('meeting', meeting.id)
                            }}>x</Button>
                        </h3>
                        <p>{meeting.description}</p>
                        <p>Starting {moment(meeting.start_time).fromNow()}</p>
                        <p>Ending at: {meeting.end_time}</p>
                        <hr/>
                    </div>
                )}
            </div>
        </div>
    )
};

// Plans
const Plans = ({ submitEntry, plans, deleteEntry }) => {
    const [add, setAdd] = useState(false);

    return (
        <div>
            <h2>Plans
                <Button onClick={() => setAdd(!add)}>{add ? 'CANCEL' : 'ADD'}</Button>
            </h2>
            {add === true &&
                <Card>
                    <TextField id='title' required label='Goal' />
                    <TextField id='description' label='Description...' fullWidth multiline={true} />
                    <InputLabel>Deadline</InputLabel>
                    <TextField id='deadline' type='date' />
                    <Button onClick={e => {
                        e.preventDefault();
                        const entry = {
                            'title': document.getElementById('title').value,
                            'description': document.getElementById('description').value,
                            'deadline': document.getElementById('deadline').value,
                        }
                        submitEntry('plan', entry);
                        setAdd(false);
                    }}>Save</Button>
                </Card>}
            <div>
                {plans?.length < 1 ? 'No Plans to Show' : plans?.map((plan, i = 0) =>
                    <div key={plan.id}>
                        <h3>{i + 1}. {plan.title}
                            <Button onClick={(e) => {
                                e.preventDefault();
                                deleteEntry('plan', plan.id)
                            }}>x</Button>
                        </h3>
                        <p>{plan.description}</p>
                        <p>Deadline {moment(plan.deadline).fromNow()}</p>
                    </div>
                )}
            </div>
        </div>
    )
};

// Events
const Events = ({ submitEntry, events, deleteEntry }) => {
    const [add, setAdd] = useState(false);

    return (
        <div>
            <h2>Events
                <Button onClick={() => setAdd(!add)}>{add ? 'CANCEL' : 'ADD'}</Button>
            </h2>
            {add === true &&
                <Card>
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
                    <Button onClick={e => {
                        e.preventDefault();
                        const entry = {
                            'title': document.getElementById('title').value,
                            'description': document.getElementById('description').value,
                            'venue': document.getElementById('venue').value,
                            'date': document.getElementById('date').value
                        }
                        submitEntry('event', entry);
                        setAdd(false)
                    }}>Save</Button>
                </Card>}
            <div>
                {events?.length < 1 ? 'No Events to Show' : events?.map((event, i = 0) =>
                    <div key={event.id}>
                        <h3>{i + 1}. {event.title}
                            <Button onClick={(e) => {
                                e.preventDefault();
                                deleteEntry('event', event.id)
                            }}>x</Button>
                        </h3>
                        <p>{event.description}</p>
                        <p>Date: {event.date}</p>
                    </div>
                )}
            </div>
        </div>
    )
};

// Projects
const Projects = ({ submitEntry, projects, deleteEntry, editingEntry }) => {
    const [add, setAdd] = useState(false);
    const [update, setUpdate] = useState({
        'id': '',
        'edit': false
    });

    return (
        <div>
            <h2>Projects
                <Button onClick={() => setAdd(!add)}>{add ? 'CANCEL' : 'ADD'}</Button>
            </h2>
            {add === true &&
                <Card>
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
                    <Button onClick={e => {
                        e.preventDefault();
                        const entry = {
                            'title': document.getElementById('title').value,
                            'description': document.getElementById('description').value,
                            'deadline': document.getElementById('deadline').value,
                            'start_date': document.getElementById('start_date').value
                        }
                        submitEntry('project', entry);
                        setAdd(false)
                    }}>Save</Button>
                </Card>}
            <div>
                {projects?.length < 1 ? 'No Projects to Show' : projects?.map((project, i = 0) =>
                    <div key={project.id}>
                        <h3>{i + 1}. {project.title}
                            <Button onClick={(e) => {
                                e.preventDefault();
                                deleteEntry('project', project.id)
                            }}>x</Button>
                        </h3>
                        <div>Created {moment(project.created).fromNow()}</div>
                        <p>{project.description}</p>
                        <h5>Progress</h5>
                        <p>{project.progress}</p>
                        <div>Last Updated: {moment(project.updated).fromNow()}</div>
                        <p>Deadline {moment(project.deadline).fromNow()}</p>
                        {project.start_date !== null ? <div>
                            <p>Started {moment(project.start_date).fromNow()}</p>
                            {!project.closed ?
                                <Button onClick={e => {
                                    e.preventDefault();
                                    const entry = { ...project, closed: true };
                                    if (window.confirm('Are you sure you want to Close Down This Project?')) editingEntry('project', project.id, entry);
                                }}>Close</Button> : <Button>Closed</Button>}
                            {project.closed ? null : <Button onClick={() => setUpdate({ id: i + 1, edit: true })} >Update Progress</Button>}
                        </div>
                            : <div>
                                <Button onClick={e => {
                                    e.preventDefault();
                                    const entry = { ...project, start_date: new Date() }
                                    editingEntry('project', project.id, entry);
                                }} >Start</Button>
                                <Button onClick={(e) => {
                                e.preventDefault();
                                deleteEntry('project', project.id)
                            }} >Cancel</Button>
                            </div>}
                        {update.id !== i + 1 ? null : <div>
                            <TextField id='progress' label='Progress' multiline={true} fullWidth variant='outlined'/>
                            <Button onClick={e => {
                                e.preventDefault();
                                const updated = (project.progress + '\n' + document.getElementById('progress').value)
                                const entry = { ...project, progress: updated }
                                editingEntry('project', project.id, entry);
                                setUpdate({})
                            }} >Save</Button>
                        </div>
                        }
                    </div>
                )}
            </div>
        </div>
    )
};

// Quotes
const Quotes = ({ submitEntry, quotes, deleteEntry }) => {
    const [add, setAdd] = useState(false);

    return (
        <div>
            <h2>Quotes
                <Button onClick={() => setAdd(!add)}>{add ? 'CANCEL' : 'ADD'}</Button>
            </h2>
            <hr />
            <hr/>
            {add === true &&
                <Card>
                    <TextField id='quote' label='Quote...' required fullWidth multiline={true} />
                    <TextField id='source' label='Source...' />
                    <Button onClick={e => {
                        e.preventDefault();
                        const entry = { 'source': document.getElementById('source').value, 'quote': document.getElementById('quote').value }
                        submitEntry('quote', entry);
                        setAdd(false)
                    }}>Save</Button>
                </Card>}
            <div>
                {quotes?.length < 1 ? 'No Quotes to Show' : quotes?.map((quote, i = 0) =>
                    <div key={quote.id}>
                        <p>{i + 1}. {quote.quote}
                            <Button onClick={(e) => {
                                e.preventDefault();
                                deleteEntry('quote', quote.id)
                            }}>x</Button>
                        </p>
                        <p> ~ {quote.source}</p>
                        <hr/>
                    </div>
                )}
            </div>
        </div>
    )
};

// BUDGET
const Budget = ({ budget, submitEntry }) => {
    const [add, setAdd] = useState(false)
    return (
        <div>
            <h3>
                Budget
                <Button onClick={() => setAdd(!add)}>{add ? 'Cancel' : 'Add'}</Button>
            </h3>
            <hr/>
            <hr />
            {!add ? null :
                <div>
                    <TextField id='category' variant='outlined' label='Category' type='text' />
                    <TextField id='item' variant='outlined' label='Item/Descr' type='text' />
                    <TextField id='amount' variant='outlined' type='number' label='Amount' />
                    <Button onClick={e => {
                        e.preventDefault();
                        const entry = {
                            'category': document.getElementById('category').value,
                            'item': document.getElementById('item').value,
                            'amount': document.getElementById('amount').value,
                        }
                        submitEntry('budget', entry);
                        setAdd(false);
                    }} >Save</Button>
                    </div>}
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableCell>
                            Category
                            <TableSortLabel />
                        </TableCell>
                        <TableCell>
                            Item
                            <TableSortLabel />
                        </TableCell>
                        <TableCell>
                            Amount
                            <TableSortLabel />
                        </TableCell>
                    </TableHead>
                    <TableBody>
                        {budget?.map(budget =>
                            <TableRow>
                                <TableCell>
                                    {budget.category}
                                </TableCell>
                                <TableCell>
                                    {budget.item}
                                </TableCell>
                                <TableCell>
                                    {budget.amount}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TablePagination />
                    </TableFooter>
                </Table>
            </TableContainer>
        </div>
    )
};