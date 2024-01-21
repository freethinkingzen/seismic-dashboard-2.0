import React from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
} from '@mui/material';


export default function NavHeader () {


    return (
        <Box sx={{ height: '4em', flexGrow: 1 }}>
            <AppBar color="primary" position='sticky'>
                <Toolbar>
                    <Typography variant="h6" component="h1">Seismic Dashboard</Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
