import React, { useContext, useEffect, useState } from 'react';
import {
    Button,
    Card,
    CardContent, 
    Divider, 
    Grid, 
    Skeleton, 
    Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { SeismicDataContext } from '../Context';
import { largestMagnitude, significantQuakes, tsunamiPotential } from '../utils/DataParser';

const DataCard = styled(Card)(({ theme }) => ({
    display: "flex",
    textAlign: 'center',
    justifyContent: "center",
    height: "100%",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
}));

const DataCards = () => {
    const context = useContext(SeismicDataContext);
    const [loading, setLoading] = useState(true);
    const [totalQuakes, setTotalQuakes] = useState(0);
    const [largestMag, setLargestMag] = useState({});
    const [significant, setSignificant] = useState([]);
    const [tsunami, setTsunami] = useState([]);
    const [selected, setSelected] = useState('');

    useEffect(() => {
        if (context.seismicDataToday.length > 0) {
            setTotalQuakes(context.seismicDataToday.length);
            setLargestMag(largestMagnitude(context.seismicDataToday));
            setSignificant(significantQuakes(context.seismicDataToday));
            setTsunami(tsunamiPotential(context.seismicDataToday));
            setLoading(false);
        }
    }, [context.seismicDataToday]);

    return (
        <Grid container spacing={1} sx={{ flexGrow: 1, padding: "8px" }}>

            <Grid item xs={12}>
                <Typography variant="h5" color={"primary.contrastText"} sx={{ textAlign: "center" }}>
                    Today at a Glance
                </Typography>
            </Grid>

            <Grid item xs={6} sm={3} md={12}>
                <DataCard>
                    <CardContent>
                        <Typography variant="body1" color="primary.contrastText">
                            Total Events
                        </Typography>
                        <Divider sx={{ backgroundColor: "primary.contrastText" }}/>
                        <Typography variant="h5" color="primary.contrastText" my={{ xs: "1.5em", sm: 0 }}>
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
                        <Typography variant="body1" component="h3" color="primary.contrastText">
                            Largest Magnitude
                        </Typography>
                        <Divider sx={{ backgroundColor: "primary.contrastText" }}/>
                        {loading 
                            ? <Skeleton sx={{ height: "8em", backgroundColor: "primary.light" }}/>
                            : <>
                            <Typography variant="h5" color="primary.contrastText">
                                { largestMag.properties.mag }
                            </Typography>
                            <Typography variant="caption" color="primary.contrastText" display={"flex"}>
                                { largestMag.properties.place }
                            </Typography>
                            <Button variant="outlined" size="small" color='warning' startIcon={ <GpsFixedIcon /> } sx={{ margin: "0.5em" }} >
                                Map
                            </Button>
                            </>
                        }
                    </CardContent>
                </DataCard>
            </Grid>

            <Grid item xs={6} sm={3} md={12}>
                <DataCard>
                    <CardContent>
                        <Typography variant="body1" color="primary.contrastText">
                            Potential Damage
                        </Typography>
                        <Divider sx={{ backgroundColor: "primary.contrastText" }}/>
                        {loading 
                            ? <Skeleton sx={{ height: "5em", backgroundColor: "primary.light" }}/>
                            : <>
                            <Typography variant="h5" color="primary.contrastText">
                                { significant.length }
                            </Typography>
                            {tsunami < 1 && 
                                <Button variant="outlined" size="small" color='warning' startIcon={ <GpsFixedIcon /> } sx={{ margin: "0.5em" }} >
                                    Map
                                </Button>
                            }
                        </>
                        }
                    </CardContent>
                </DataCard>
            </Grid>

            <Grid item xs={6} sm={3} md={12}>
                <DataCard>
                    <CardContent>
                        <Typography variant="body1" color="primary.contrastText">
                            Tsunami Potential
                        </Typography>
                        <Divider sx={{ backgroundColor: "primary.contrastText" }}/>
                        {loading 
                            ? <Skeleton sx={{ height: "5em", backgroundColor: "primary.light" }}/>
                            : <>
                            <Typography variant="h5" color="primary.contrastText">
                                { tsunami.length }
                            </Typography>
                            {tsunami.length < 1 && 
                                <Button variant="outlined" size="small" color='warning' startIcon={ <GpsFixedIcon /> } sx={{ margin: "0.5em" }}>
                                    Map
                                </Button>
                            }
                        </>
                        }
                    </CardContent>
                </DataCard>
            </Grid>

        </Grid>
    );
};

export default DataCards;
