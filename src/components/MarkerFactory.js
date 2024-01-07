import React, { useContext, useEffect, useState } from 'react';
import { CircleMarker, LayerGroup, Popup } from 'react-leaflet';
import { colorSelector } from '../utils/DataParser';
import { Backdrop, CircularProgress } from '@mui/material';
import { Typography } from '@mui/material';
import { SeismicDataContext } from '../Context';


const MarkerFactory = () => {
    const context = useContext(SeismicDataContext);
    const [features, setFeatures] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(context.seismicDataToday.length > 0) {
            setFeatures(context.seismicDataToday);
            setLoading(false);
        }
    }, [context.seismicDataToday]);

    return (
        <>
        {!loading && features.length > 0 ?
        <LayerGroup>
            {features.map((item) => (
                <CircleMarker key={item.id} radius={item.properties.mag * 1.25} pathOptions={{color: colorSelector(item.properties.mag)}} center={[item.geometry.coordinates[1], item.geometry.coordinates[0]]}>
                    <Popup>
                        <span><b>Magnitude {item.properties.mag}</b></span>
                        <br />
                        <span>{new Date(item.properties.time).toLocaleDateString()}</span>
                        <br />
                        <span>{new Date(item.properties.time).toLocaleTimeString()}</span>
                        <br />
                        <span>{item.properties.place}</span>
                    </Popup>
                </CircleMarker>
            ))}
        </LayerGroup>
        :
        <Backdrop open={!features || features.length === 0} sx={{ position: "absolute", zIndex: 1000}}>
            {loading
                ?
                <CircularProgress color="inherit" />
                :
                <Typography variant="h4" sx={{ color: "primary.contrastText" }}>
                    NO DATA
                </Typography>
            }
        </Backdrop>
        }
        </>
        
    );

};

export default MarkerFactory;
