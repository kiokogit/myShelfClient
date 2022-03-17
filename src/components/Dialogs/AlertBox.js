import { Alert } from "@mui/material"

export const AlertBox = ({ title, content}) => {
    return (
        <Alert severity={title} variant='outlined' >
            {content}
        </Alert>
    )
};