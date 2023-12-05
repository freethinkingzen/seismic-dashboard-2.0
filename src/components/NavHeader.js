import React, { useState } from 'react';
import {
    AppBar,
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Toolbar,
    Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const title = "Seismic Dashboard";
const navItems = ["Home", "Maps", "Charts", "Resources", "About"];

export default function NavHeader () {

    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerToggle = () => {
        setDrawerOpen((prevState) => !prevState);
    };

    const handleListItemClick = (event, index) => {
        console.log(`You clicked on ${navItems[index]}`);
    }

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ py: 2 }}>
            MENU
          </Typography>
          <Divider />
          <List>
            {navItems.map((item) => (
              <ListItem key={item} disablePadding>
                <ListItemButton onClick={handleListItemClick} sx={{ textAlign: 'center' }}>
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
    );

    return (
        <Box sx={{ height: '4em', flexGrow: 1 }}>
            <AppBar color="primary" position='sticky'>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ display: { md: 'none' }, mr: 2 }}
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="h1">{title}</Typography>
                    <Box sx={{ display: { xs: 'none', md: 'block' }, ml: 3 }}>
                        {navItems.map((item) => (
                            <Button key={item} sx={{ color: '#fff' }}>
                                {item}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    variant="temporary"
                    open={drawerOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { 
                            boxSizing: 'border-box', 
                            width: 240, 
                            backgroundColor: "primary.main", 
                            color: "primary.contrastText"
                        },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    );
}