import { Input, Badge, Button, Card, CardActions, CardContent, CardHeader, Container, Grid, Popover, Typography } from '@material-ui/core'
import React, { useState } from 'react';

import { MyDialog } from './Dialogs';
import { AlertBox } from './AlertBox';

// Import delete method
import { delEntry } from '../../actions/journal';
import { useDispatch } from 'react-redux';

export const ContentBox = ({list, onsubmit,oncancel, editForm, type, title, details, add, setAdd, editActions,expandedActions, editContent, edit }) => {
    const [slice, setSlice] = useState({
        id: '',
        check: false
    });
    const [alert, setAlert] = useState(null);

    // create a dispatch call for delete entry func to update state after delete
    const dispatch = useDispatch();

    const deleteEntry = (type, id) => {
        dispatch(delEntry(type, id, setAlert))
    };

    // Pop up to approve archiving of Diary Entry. Cannot Delete
    const [pop, setPop] = useState(false)

    const expanded = list?.filter((item) => item.id === slice.id)[0]

    return (
        <div>
            {alert !==null && <AlertBox severity={alert.severity} message={alert.message} />}
            <h2>
                <Badge badgeContent={list?.length} color='primary'>
                    {title}
                </Badge>
                {!add && <Button color='secondary' onClick={() => setAdd(!add)}>ADD</Button>}
            </h2>
            {add && <MyDialog open={add} title={`Enter a new ${type}`} content={editForm} onsubmit={onsubmit} oncancel={oncancel} />}
            {edit && <MyDialog open={edit} title='Submit' content={editContent} actions={editActions} />}
            <div>
                <Container >
                    <Grid container justifyContent='flex-start' alignItems='flex-start' spacing={3}>
                        {list?.length < 1 ? `No ${type} Entries to Show` : list?.map((item) =>
                            <Grid key={item.id} item sm={6} xs={12} lg={3} md={4} onClick={() => setSlice({ id: item.id, check: true })} >
                                <Card style={item.id !== expanded?.id ? null : { backgroundColor: 'grey' }} >
                                    <CardHeader title={item.title} subheader={item.date ? new Date(item.date).toDateString() : null} />
                                    <hr />

                                    <CardContent>
                                        {item.description.slice(0, 150)}{item.description.length > 150 ? '...' : null}
                                    </CardContent>
                                </Card>
                            </Grid>
                        )}
                    </Grid>
                </Container>
                {list?.length < 1 || !slice.check ? null :
                    <Popover open={true} anchorOrigin={{vertical:100, horizontal:200}} >
                        <Card style={{ height: 'fit-content', width:600 }}>
                            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <CardHeader title={expanded.title} subheader={expanded.date ? new Date(expanded.date).toDateString() : null} />
                                <Button onClick={() => setSlice({ id: '', check: false })}>x</Button>
                            </div>
                            <hr/>
                            <CardContent>
                                <Typography variant='body1' >
                                    {details(expanded)}
                                    </Typography>
                            </CardContent>
                            <hr/>
                            <CardActions>
                                {expandedActions(expanded)}
                                <Button onClick={e => {
                                    if (type !== 'diary') {
                                        setSlice({ id: '', check: false });
                                        deleteEntry(type, expanded.id);
                                    }
                                    else {
                                        setPop(true)
                                    }
                                    }}>DELETE</Button>
                                {pop.open && 
                                    <MyDialog title='Oh No!' open={pop} onsubmit={() => {
                                    setPop(false);
                                    setSlice({ id: '', check: false });
                                    // Something about archiving
                                    
                                }} content={
                                    <div>
                                        Well, Sorry! You cannot delete this Diary Entry.
                                        You May Archive it. It will not be deleted.
                                        <p>Would you like to archive this Diary Entry?</p>
                                        <p>Prove It is you...</p>
                                        <Input id='idNo' variant='outlined' required placeholder='Enter Your ID'/>
                                    </div>
                                } oncancel={()=>setPop(false)} />
                                }
                            </CardActions>
                        </Card>
                    </Popover>
                }
            </div>
        </div>
    );
};
