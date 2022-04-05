import { Alert } from "@mui/material"

export const AlertBox = ({ severity, message}) => {
    return (
        <Alert severity={severity} variant='outlined' >
            {message}
        </Alert>
    )
};

export const errorAlert = ({
    severity: 'error',
    message: 'Operation Unsuccessful'
});
export const successAlert = ({
    severity: 'success',
    message: 'Operation successful'
});
export const infoAlert = ({
    severity: 'info',
    message:'Operation cancelled'
});
export const warningAlert = ({
    severity: 'warning',
    message:'Are you sure you want to proceed?'
})