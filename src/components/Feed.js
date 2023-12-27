import React, { useContext, useEffect, useState } from 'react';
import { Card, CardContent, Grid, Paper, Skeleton, styled, Typography } from '@mui/material';
import { SeismicDataContext } from '../Context';
import getData from '../utils/USGSapi';
import { colorSelector } from '../utils/DataParser';

const CircleCard = styled(Paper)(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%'
}));

const FeedItem = ({ magnitude }) => {

  return (
    <Grid container sx={{ justifyContent: "center", borderRadius: "8px", border: `1px solid black`, backgroundColor: "black" }} my="1px">
        <Grid item m="0.5em" >
            <CircleCard elevation={24} sx={{ height: magnitude * 10, width: magnitude * 10, backgroundColor: magnitude > 4 ? colorSelector(magnitude) : "black" }}>
                <CardContent>
                    <Typography variant="h5" color="primary.contrastText">{magnitude}</Typography>
                </CardContent>
            </CircleCard>
        </Grid>
        <Grid item m="0.5em">
        <Typography variant="body2" color={"primary.contrastText"} sx={{ textAlign: "center" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
        </Grid>
    </Grid>
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
      <Grid container>
        <Grid item xs={12} my="0.5em">
            <Typography variant="h6" sx={{ color: "primary.contrastText", textAlign: "center", fontWeight: "bold" }}>Live Feed</Typography>
        </Grid>
        {data.map((item) => {
            return (
                <Grid item xs={12} key={item.id}>
                    <FeedItem magnitude={item.properties.mag} />
                </Grid>
            );
        })}
        </Grid>
    );
};

export default Feed;
