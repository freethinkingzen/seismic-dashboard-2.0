import React from 'react';
import {
    AppBar,
    Box,
    IconButton,
    Toolbar,
    Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function NavHeader () {

    return (
        <Box sx={{ height: '4em', flexGrow: 1 }}>
            <AppBar color="primary">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h4" component="h1">Seismic Dashboard</Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}