import React, { useState } from 'react';
import { Alert, Collapse, Grid, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styled from '@mui/material/styles/styled';
import Ticker from 'react-ticker';

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
            <Grid container>
                <Grid item xs={1}>
                <Typography variant="body2" sx={{ textAlign: "center", color: "primary.contrastText" }}>Details: </Typography>
                </Grid>
                <Grid item xs={11}>
                <Ticker mode='await'>
                    {() => (
                        <>
                            <Typography variant="body2" sx={{ color: "primary.contrastText" }}>This is a demo site. It is not intended for use in any real world application.</Typography>
                        </>
                    )}
                </Ticker>
                </Grid>
            </Grid>
        
        </Collapse>
    );
};

export default AlertBanner;
