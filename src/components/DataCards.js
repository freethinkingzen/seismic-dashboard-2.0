import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, CardContent, Divider, Grid, Skeleton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SeismicDataContext } from '../Context';
import { largestMagnitude } from '../utils/DataParser';

const DataCard = styled(Card)(({ theme }) => ({
    display: "flex",
    textAlign: 'center',
    justifyContent: "center",
    minHeight: "8em",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
}));

const DataCards = () => {
    const context = useContext(SeismicDataContext);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [totalQuakes, setTotalQuakes] = useState(0);
    const [largestMag, setLargestMag] = useState({});

    useEffect(() => {
        if (context.seismicDataToday.length > 0) {
            setData(context.seismicDataToday);
            setTotalQuakes(context.seismicDataToday.length - 1);
            setLargestMag(largestMagnitude(context.seismicDataToday));
            setLoading(false);
        }
    }, [context.seismicDataToday]);

    return (
        <Grid container spacing={1} sx={{ flexGrow: 1, padding: "8px" }}>
            <Grid item xs={12}>
                <Typography variant="h5" color={"primary.contrastText"} sx={{ margin: "1px", textAlign: "center" }}>
                    Today at a Glance
                </Typography>
            </Grid>
            <Grid item xs={6} sm={3} md={12}>
                <DataCard>
                    <CardContent>
                        <Typography variant="button" color="primary.contrastText">
                            Total Quakes Today
                        </Typography>
                        <Divider sx={{ backgroundColor: "primary.contrastText" }}/>
                        <Typography variant="h4" color="primary.contrastText" mt={"0.5em"}>
                            {loading 
                                ? <Skeleton sx={{ backgroundColor: "primary.light" }}/> 
                                : totalQuakes}
                        </Typography>
                    </CardContent>
                </DataCard>
            </Grid>
            <Grid item xs={6} sm={3} md={12}>
                <DataCard>
                    <CardContent>
                        <Typography variant="button" color="primary.contrastText">
                            Largest Magnitude
                        </Typography>
                        <Divider sx={{ backgroundColor: "primary.contrastText" }}/>
                        <Typography variant="h4" color="primary.contrastText" mt={"0.5em"}>
                            {loading
                                ? <Skeleton sx={{ backgroundColor: "primary.light" }}/> 
                                : largestMag.properties.mag}
                        </Typography>
                        <Typography variant="button" color="primary.contrastText" mt={"0.5em"}>
                            {loading
                                ? <Skeleton sx={{ backgroundColor: "primary.light" }}/> 
                                : largestMag.properties.place}
                        </Typography>
                        <Button variant="outlined" size="small" color='warning'>See On Map</Button>
                    </CardContent>
                </DataCard>
            </Grid>
            <Grid item xs={6} sm={3} md={12}>
                <DataCard>
                    <CardContent>
                        <Typography variant="button" color="primary.contrastText">
                            Potential Damage
                        </Typography>
                        <Divider sx={{ backgroundColor: "primary.contrastText" }}/>
                    </CardContent>
                </DataCard>
            </Grid>
        </Grid>
    );
};

export default DataCards;
