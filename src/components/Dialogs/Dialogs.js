import React from 'react'

import { Dialog, DialogTitle, DialogActions, DialogContent, Button} from '@material-ui/core';
import { Form } from '../ReusableElements/Form';

// dialogs
export const MyDialog = ({ title, content, open, onsubmit, oncancel }) => {

    const formfields = (
        <div>
            <DialogTitle>
                {title}
            </DialogTitle>
            <hr/>
            <DialogContent>
                {content}
            </DialogContent>
            <hr/>
            <DialogActions>
                <Button type="submit">Submit</Button>
                <Button onClick={oncancel} >Cancel</Button>
            </DialogActions>
        </div>
    );

    return (
        <Dialog open={open} fullWidth >
            <Form formfields={formfields} onsubmit={onsubmit} oncancel={oncancel} />
        </Dialog>
    )
};