import React, { useState } from 'react';
import { Alert, Collapse, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styled from '@mui/material/styles/styled';


const CustomAlert = styled(Alert)(({theme}) => ({
    width: "100%",
    borderRadius: "0px",
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.transparent.main,
    height: "max-content",
}));

const AlertBanner = () => {
    const [open, setOpen] = useState(true);
    return (
        <Collapse in={open}>
            <CustomAlert 
                variant="outlined"
                severity="warning"
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                >
            </CustomAlert>
        </Collapse>
    );
};

export default AlertBanner;
