import { Badge, Button, Card, CardActions, CardContent, CardHeader, Container, Grid, Popover, Typography } from '@material-ui/core'
import React, { useState } from 'react'

import { MyDialog } from './Dialogs';

export const ContentBox = ({ list, editForm, actions, type, title, details, add, setAdd, editActions, projectEditing, editContent, edit }) => {
    const [slice, setSlice] = useState({
        id: '',
        check: false
    });

    const expanded = list?.filter((item) => item.id === slice.id)[0]

    return (
        <div>
            <h2>
                <Badge badgeContent={list?.length} color='primary'>
                    {title}
                </Badge>
                {!add && <Button color='secondary' onClick={() => setAdd(!add)}>ADD</Button>}
            </h2>
            {add && <MyDialog open={add} title={`Enter a new ${type}`} content={editForm} actions={actions} />}
            {edit && <MyDialog open={edit} title='Submit' content={editContent} actions={editActions} />}
            <div>
                <Container >
                    <Grid container justifyContent='flex-start' alignItems='flex-start' spacing={3}>
                        {list?.length < 1 ? `No ${type} Entries to Show` : list?.map((item) =>
                            <Grid key={item.id} item sm={6} xs={12} lg={3} md={4} onClick={() => setSlice({ id: item.id, check: true })} >
                                <Card style={{ padding: '10px'}, item.id !== expanded?.id ? null : { backgroundColor: 'grey' }} >
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
                            <CardContent>
                                <Typography variant='body1' >
                                    {details(expanded)}
                                    </Typography>
                            </CardContent>
                            <CardActions>
                                {type === 'project' && projectEditing(expanded)}
                            </CardActions>
                        </Card>
                    </Popover>
                }
            </div>
        </div>
    );
};
