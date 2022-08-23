import React from "react";
import { 
    AppBar, 
    Box, 
    IconButton, 
    Stack, 
    Toolbar 
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

export default function Layout() {
    return(
        <Box container sx={{ height: '100vh', backgroundColor: 'green' }}>
            <Stack>
                <Box sx={{ height: '4em', flexGrow: 1 }}>
                    <AppBar sx={{ backgroundColor: 'black' }}>
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

                        </Toolbar>
                    </AppBar>
                </Box>
            </Stack>
        </Box>

    )
}