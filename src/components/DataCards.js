import React, { useContext, useEffect, useState } from 'react';
import {
    Button,
    Card,
    CardContent, 
    Grid, 
    Skeleton,
    styled, 
    Tooltip, 
    Typography } from '@mui/material';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import { SeismicDataContext } from '../Context';
import { largestMagnitude, significantQuakes, tsunamiPotential } from '../utils/DataParser';
import LocationDialog from './LocationDialog';

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
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);

    useEffect(() => {
        if (context.seismicDataToday.length > 0) {
            setTotalQuakes(context.seismicDataToday.length);
            setLargestMag(largestMagnitude(context.seismicDataToday));
            setSignificant(significantQuakes(context.seismicDataToday));
            setTsunami(tsunamiPotential(context.seismicDataToday));
            setLoading(false);
        }
    }, [context.seismicDataToday]);

    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const handleDialogClose = (value) => {
        setDialogOpen(false);
        setSelectedLocation(value);
    };

    return (
        <Grid container spacing={1} sx={{ flexGrow: 1, justifyContent: "center" }}>

            <Grid item xs={12} lg={2}>
                <Typography variant="h5" color={"primary.contrastText"} sx={{ textAlign: "center" }}>
                    Today at a Glance
                </Typography>
            </Grid>

            <Grid item xs={6} sm={3} lg={2}>
                <DataCard>
                    <CardContent>
                            <Typography variant="body2" color="primary.contrastText">
                                Total Events
                            </Typography>

                            <Typography variant="h5" color="primary.contrastText">
                                {loading 
                                    ? <Skeleton sx={{ backgroundColor: "primary.light" }}/> 
                                    : totalQuakes}
                            </Typography>
                    </CardContent>
                </DataCard>
            </Grid>

            <Grid item xs={6} sm={3} lg={2}>
                <DataCard>
                    <Grid container padding={1}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body2" component="h3" color="primary.contrastText">
                                Largest Magnitude
                            </Typography>
                            <Tooltip title={ largestMag?.properties?.place } placement="bottom">
                                    <Typography variant="h5" color="primary.contrastText">
                                    {loading
                                        ? <Skeleton sx={{ backgroundColor: "primary.light" }}/>
                                        : largestMag.properties.mag
                                    }
                                    </Typography>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Button disabled={loading} variant="outlined" size="small" color='warning' startIcon={ <GpsFixedIcon /> } sx={{ margin: "0.5em" }} >
                                    Map
                            </Button>
                        </Grid>
                    </Grid>
                </DataCard>
            </Grid>

            <Grid item xs={6} sm={3} lg={2}>
                <DataCard>
                    <Grid container p={1}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body2" color="primary.contrastText">
                                Potential Damage
                            </Typography>
                            {loading 
                            ? <Skeleton sx={{ backgroundColor: "primary.light" }}/>
                            : <>
                            <Typography variant="h5" color="primary.contrastText">
                                { significant.length }
                            </Typography>
                        </>
                        }
                        </Grid>
                        <Grid item xs={12} md={6}>
                        {significant.length < 1 && 
                            <Button variant="outlined" size="small" color='warning' startIcon={ <GpsFixedIcon /> } sx={{ margin: "0.5em" }} >
                                Map
                            </Button>
                        }
                        </Grid>

                    </Grid>
                </DataCard>
            </Grid>

            <Grid item xs={6} sm={3} lg={2}>
                <DataCard>
                    <Grid container p={1}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="body2" color="primary.contrastText">
                                Tsunami Potential
                            </Typography>
                            {loading 
                            ? <Skeleton sx={{ backgroundColor: "primary.light" }}/>
                            : <>
                                <Typography variant="h5" color="primary.contrastText">
                                    { tsunami.length }
                                </Typography>
                            </>
                        }
                        </Grid>
                        <Grid item xs={12} md={2}>
                        {tsunami.length < 1 && 
                            <Button onClick={handleDialogOpen} variant="outlined" size="small" color='warning' startIcon={ <GpsFixedIcon /> } sx={{ margin: "0.5em" }}>
                                Map
                            </Button>
                        }
                        </Grid>
                    </Grid>
                </DataCard>
            </Grid>
            <LocationDialog values={[]} selectedValue={selectedLocation} open={dialogOpen} onClose={handleDialogClose} />
        </Grid>
    );
};

export default DataCards;
