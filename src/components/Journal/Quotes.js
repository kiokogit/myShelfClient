import { Button, TextField } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getJournal } from '../../actions/journal';

import { MyDialog } from '../Dialogs/Dialogs';

// Quotes
export const Quotes = ({ submitEntry, deleteEntry, cancelledDialog }) => {
    const [add, setAdd] = useState(false);

    // to effect the state by listening to clicks and submissions
    const [effect, setEffect] = useState(0);
    const newEffect = effect + 1
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getJournal('quote'))
    }, [dispatch, effect]);

    const quotes = useSelector(state => state.journal.quote)

    const editForm = (
        <div>
            <TextField id='quote' label='Quote...' required fullWidth multiline={true} />
            <TextField id='source' label='Source...' />
        </div>
    );

    const actions = (
        <div>
            <Button onClick={e => {
                e.preventDefault();
                const entry = { 'source': document.getElementById('source').value, 'quote': document.getElementById('quote').value }
                submitEntry('quote', entry)
                setAdd(false)
                setEffect(newEffect);
            }}>Save</Button>
            <Button onClick={e => {
                cancelledDialog()
                setAdd(false)
            }}>CANCEL</Button>
        </div>
    );

    return (
        <div>
            <h2>Quotes
                <Button color='secondary' onClick={() => setAdd(!add)}>{add ? 'CANCEL' : 'ADD'}</Button>
            </h2>
            <hr />
            <hr />
            {add && <MyDialog open={add} title='Type or Paste the Quote' content={editForm} actions={actions} />}
            <div>
                {quotes?.length < 1 ? 'No Quotes to Show' : quotes?.map((quote, i = 0) =>
                    <div key={quote.id}>
                        <p>{i + 1}. {quote.quote}
                            <Button onClick={(e) => {
                                e.preventDefault();
                                deleteEntry('quote', quote.id);
                                setEffect(newEffect);
                            }}>x</Button>
                        </p>
                        <p> ~ {quote.source}</p>
                        <hr />
                    </div>
                )}
            </div>
        </div>
    )
};
