import React from 'react';
import { Button, Card, CardContent, Divider, Stack, Typography } from '@mui/material';

const DataCards = () => {
    return (
        <Stack direction={{ xs: "row", md: "column" }} sx={{ height: "100%", textAlign: "center" }}>

            <Typography variant="h5" color={"primary.contrastText"} sx={{ margin: "0.5em" }}>Today at a Glance</Typography>

            <Card sx={{ display: "flex", justifyContent: "center", margin: "4px", minHeight: "8em", height: "25%", backgroundColor: "primary.main" }}>
                <CardContent>
                    <Typography variant="button" color="primary.contrastText">Total Quakes Today</Typography>
                    <Divider sx={{ backgroundColor: "primary.contrastText" }}/>
                </CardContent>
            </Card>
            <Card sx={{ display: "flex", justifyContent: "center", margin: "4px", minHeight: "8em", height: "25%", backgroundColor: "primary.main" }}>
                <CardContent>
                    <Typography variant="button" color="primary.contrastText">Largest Magnitude</Typography>
                    <Divider sx={{ backgroundColor: "primary.contrastText" }}/>
                    <Button variant="outlined" size="small" color='warning'>See On Map</Button>
                </CardContent>
            </Card>
            <Card sx={{ display: "flex", justifyContent: "center", margin: "4px", minHeight: "8em", height: "25%", backgroundColor: "primary.main" }}>
                <CardContent>
                    <Typography variant="button" color="primary.contrastText">Potential Damage</Typography>
                    <Divider sx={{ backgroundColor: "primary.contrastText" }}/>
                    <Button variant="outlined" size="small" color="warning">See On Map </Button>
                </CardContent>
            </Card>
        </Stack>
    );
};

export default DataCards;
