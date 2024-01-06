import React, { useContext, useEffect, useState } from 'react';
import {
    CardActionArea,
    CardContent, 
    Divider,
    Grid,
    Paper,
    Skeleton,
    styled,
    Typography,
    useTheme } from '@mui/material';
import { SeismicDataContext } from '../Context';
import getData from '../utils/USGSapi';
import { colorSelector } from '../utils/DataParser';
import { popupHTML } from '../utils/DataParser';


const CircleCard = styled(Paper)(({theme}) => ({
    display: 'flex',
    backgroundColor: theme.palette.primary.dark,
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
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
        border: "1px solid",
        borderColor: theme.palette.secondary.light,
    },
}));


const FeedItem = ({item}) => {
    const context = useContext(SeismicDataContext);
    const theme = useTheme();
    const magnitude = item.properties.mag.toFixed(1);
    const time = new Date(item.properties.time).toLocaleTimeString();
    const color = colorSelector(magnitude);

    const handleClick = (value) => {
        if (context.map) {
          context.map.flyTo([value.geometry.coordinates[1], value.geometry.coordinates[0]], 10);
          context.map.openPopup(popupHTML(value), [value.geometry.coordinates[1], value.geometry.coordinates[0]]);
        }
      };

    return (
        <CardActionArea onClick={() => handleClick(item)} >
        <FeedItemContainer item container justifyContent={{xs: "space-between", sm: "center"}}>
            <Grid item xs={2} md={12} m="0.5em" order={{ xs: 1, sm: 0 }} sx={{ display: "flex", justifyContent: "center" }}>
                <CircleCard elevation={24} sx={{border: `${magnitude}px solid`, borderColor: color}}>
                    <CardContent sx={{ margin: "4px", border: `${magnitude}px solid`, borderRadius: "50%", borderColor: color }}>
                        <Typography variant="h5" color={color}>{magnitude}</Typography>
                    </CardContent>
                </CircleCard>
            </Grid>
            <Grid item xs={8} md={12} m="0.5em" order={{ xs: 0, sm: 1 }}>
                <Typography variant="body2" color={"primary.contrastText"} >
                    {time}
                </Typography>
                <Divider sx={{ maxWidth: "10em", backgroundColor: "primary.contrastText" }} />
                <Typography variant="caption" color={"primary.contrastText"} sx={{ display: "flex" }}>
                    {item.properties.place}
                </Typography>
            </Grid>
        </FeedItemContainer>
        </CardActionArea>
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
                <Typography variant="body1" sx={{ color: "primary.contrastText", textAlign: "center", fontWeight: "bold" }}>Live Feed</Typography>
                <Divider sx={{ backgroundColor: "primary.light" }} />
            </Grid>
            <Grid container gap={"2px"} sx={{ maxHeight: "85vh", overflow:"scroll" }}>
                {loading
                ? <Skeleton sx={{ height: "85vh", width: "100%", backgroundColor: "primary.light" }} />
                : <>
                    {data.map((item) => {
                        return <FeedItem key={item.id} item={item} />
                    })}
                </>
                }
            </Grid>
        </>
    );
};

export default Feed;
