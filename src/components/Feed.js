import React, { useContext, useEffect, useState } from 'react';
import { CardContent, Divider, Grid, Paper, Skeleton, styled, Typography, useTheme } from '@mui/material';
import { SeismicDataContext } from '../Context';
import getData from '../utils/USGSapi';
import { colorSelector } from '../utils/DataParser';


const CircleCard = styled(Paper)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    minHeight: "3.5em",
    minWidth: "3.5em",
}));

const FeedItemContainer = styled(Grid)(({theme}) => ({
    borderRadius: "8px",
    border: "1px solid",
    borderColor: theme.palette.primary.light,
    backgroundColor: theme.palette.primary.main
}));


const FeedItem = ({ properties }) => {
    const theme = useTheme();
    const magnitude = properties.mag.toFixed(1);
    const time = new Date(properties.time).toLocaleTimeString();
    const color = colorSelector(magnitude);

  return (
    <FeedItemContainer container justifyContent={{xs: "space-between", sm: "center"}} my="1px" theme={theme}>
        <Grid item m="0.5em" order={{ xs: 1, sm: 0 }}>
            <CircleCard elevation={24} sx={{ height: magnitude * 12, width: magnitude * 12, backgroundColor: color }}>
                <CardContent>
                    <Typography variant="h5" color="black">{magnitude}</Typography>
                </CardContent>
            </CircleCard>
        </Grid>
        <Grid item m="0.5em" order={{ xs: 0, sm: 1 }}>
            <Typography variant="body2" color={"primary.contrastText"} >
                {time}
            </Typography>
            <Divider sx={{ width: "10em", backgroundColor: "primary.contrastText" }} />
            <Typography variant="caption" color={"primary.contrastText"} sx={{ display: "flex" }}>
                {properties.place}
            </Typography>
        </Grid>
    </FeedItemContainer>
  );
};


const Feed = () => {
    const context = useContext(SeismicDataContext);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const updateData = () => {
        getData("hour").then((res) => {
            context.updateSeismicDataHour(res.features);
            setData(res.features);
            setLoading(false);
            console.log(res.features);
        });
    }

    useEffect(() => {
        updateData();
        const interval = setInterval(() => {
            updateData();
        },60000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Grid item mt="1em" sx={{ border: "1px solid", borderRadius: "4px", borderColor: "primary.light" }}>
                <Typography variant="h6" sx={{ color: "primary.contrastText", textAlign: "center", fontWeight: "bold" }}>Live Feed</Typography>
                <Divider sx={{ backgroundColor: "primary.light" }} />
            </Grid>
            <Grid container sx={{ maxHeight: "85vh", overflow:"scroll" }}>
                {loading
                ? <Skeleton sx={{ height: "85vh", width: "100%", backgroundColor: "primary.light" }} />
                : <>
                    {data.map((item) => {
                        return <FeedItem key={item.id} properties={item.properties} />
                    })}
                </>
                }
            </Grid>
        </>
    );
};

export default Feed;
