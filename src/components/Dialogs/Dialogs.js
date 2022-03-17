import React from 'react'

import { Dialog, DialogTitle, DialogActions, DialogContent} from '@material-ui/core';

// dialogs
export const MyDialog = ({title, content, actions, open }) => {
    return (
        <Dialog open={open} fullWidth >
                <DialogTitle>
                    {title}
                </DialogTitle>
                <DialogContent>
                    {content}
                </DialogContent>
            <DialogActions>
                {actions}
                </DialogActions>
            </Dialog>
    )
};