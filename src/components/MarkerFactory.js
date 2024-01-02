import React, { useEffect, useState } from 'react';
import { CircleMarker, LayerGroup, Popup } from 'react-leaflet';
import { Box } from '@mui/material';
import { colorSelector } from '../utils/DataParser';


const MarkerFactory = (data) => {
    const [features, setFeatures] = useState([]);

    useEffect(() => {
        setFeatures(data.data);
    }, [data]);

    return (
        <LayerGroup>
            {features.map((item) => (
                <CircleMarker key={item.id} radius={item.properties.mag * 1.25} pathOptions={{color: colorSelector(item.properties.mag)}} center={[item.geometry.coordinates[1], item.geometry.coordinates[0]]}>
                    <Popup>
                        <Box sx={{ maxWidth: "10em", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                            <span><b>Magnitude {item.properties.mag}</b></span>
                            <span>{new Date(item.properties.time).toLocaleDateString()}</span>
                            <span>{new Date(item.properties.time).toLocaleTimeString()}</span>
                            <span>{item.properties.place}</span>
                        </Box>
                    </Popup>
                </CircleMarker>
            ))}
        </LayerGroup>
    );

};

export default MarkerFactory;
