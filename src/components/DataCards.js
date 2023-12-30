import React, { useContext, useEffect, useState } from 'react';
import {
    Card,
    CardActionArea,
    CardContent, 
    Grid, 
    Skeleton,
    styled,
    Typography } from '@mui/material';
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
    border: "1px solid",
    borderColor: theme.palette.primary.light,
    '&:hover': {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
        border: "1px solid",
        borderColor: theme.palette.secondary.light,
    },
}));

const DataCards = () => {
    const context = useContext(SeismicDataContext);
    const [loading, setLoading] = useState(true);
    const [totalQuakes, setTotalQuakes] = useState(0);
    const [largestMag, setLargestMag] = useState({});
    const [significant, setSignificant] = useState([]);
    const [tsunami, setTsunami] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogValues, setDialogValues] = useState(null);
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

    const handleDialogOpen = (id) => {
        switch (id) {
            case "significant":
                setDialogValues(significant);
                break;
            case "tsunami":
                setDialogValues(tsunami);
                break;
            default:
                setDialogValues(null);
                break;
        }
        setDialogOpen(true);
    };

    const handleDialogClose = (value) => {
        console.log(value);
        setDialogOpen(false);
        setSelectedLocation(value);
    };

    return (
        <Grid container spacing={1} sx={{ height: "100%", justifyContent: "center" }}>

            <Grid item xs={12} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography variant="h5" color={"primary.contrastText"} sx={{ textAlign: "center" }}>
                    Today at a Glance
                </Typography>
            </Grid>

            <Grid item xs={6} sm={3} lg={12} sx={{ pointerEvents: "none" }}>
                <DataCard>
                    <CardActionArea>
                    <CardContent>
                        <Typography variant="body2" color="primary.contrastText">
                            Total Events
                        </Typography>
                        <Typography variant="h5" color="primary.contrastText">
                        {loading
                            ? <Skeleton sx={{ backgroundColor: "primary.light" }}/>
                            : totalQuakes
                        }
                        </Typography>
                    </CardContent>
                    </CardActionArea>
                </DataCard>
            </Grid>

            <Grid item xs={6} sm={3} lg={12}>
                <DataCard>
                    <CardActionArea onClick={() => handleDialogOpen("largestMag")}>
                    <CardContent>
                        <Typography variant="body2" color="primary.contrastText">
                            Largest Magnitude
                        </Typography>
                        <Typography variant="h5" color="primary.contrastText">
                        {loading
                            ? <Skeleton sx={{ backgroundColor: "primary.light" }}/>
                            : largestMag.properties.mag
                        }
                        </Typography>
                    </CardContent>
                    </CardActionArea>
                </DataCard>
            </Grid>

            <Grid item xs={6} sm={3} lg={12}>
                <DataCard>
                    <CardActionArea onClick={() => handleDialogOpen("significant")}>
                    <CardContent>
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
                    </CardContent>
                    </CardActionArea>
                </DataCard>
            </Grid>

            <Grid item xs={6} sm={3} lg={12}>
                <DataCard>
                    <CardActionArea onClick={() => handleDialogOpen("tsunami")} values={tsunami}>
                    <CardContent>
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
                    </CardContent>
                    </CardActionArea>
                </DataCard>
            </Grid>
            {dialogValues && <LocationDialog values={dialogValues} selectedValue={selectedLocation} open={dialogOpen} onClose={handleDialogClose} />}
        </Grid>
    );
};

export default DataCards;
