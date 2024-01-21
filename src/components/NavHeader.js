import React, { useState } from 'react';
import {
    AppBar,
    Box,
    Link,
    Toolbar,
    Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const title = "Seismic Dashboard";

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
