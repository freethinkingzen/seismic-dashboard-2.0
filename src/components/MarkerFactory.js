import React, { useEffect, useState } from 'react';
import { CircleMarker, LayerGroup, Popup } from 'react-leaflet';
import { Divider, Grid, Typography } from '@mui/material';
import variables from '../styles/_variables.scss';


const colorSelector = (mag) => {
  if (mag < 2) {
    return variables.warningLight;
  } else if (mag < 4) {
    return variables.warningMedium;
  } else if (mag < 6) {
    return variables.warningDark;
  } else if (mag < 8) {
    return variables.errorMedium;
  } else {
    return variables.purple;
  }
}

const MarkerFactory = (data) => {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    setFeatures(data.data);
  }, [data]);

  return (
    <LayerGroup>
      {features.map((item) => (
        <CircleMarker key={item.id} radius={item.properties.mag} pathOptions={{color: colorSelector(item.properties.mag)}} center={[item.geometry.coordinates[1], item.geometry.coordinates[0]]}>
          <Popup>
            <Typography variant="h6">{item.properties.place}</Typography>
            <Divider />
            <Grid container alignItems={"center"}>
              <Grid item xs={6}>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold"}}>Mag:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="button">{item.properties.mag}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold"}}>Date:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="button">{new Date(item.properties.time).toLocaleDateString()}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle2" sx={{ fontWeight: "bold"}}>Time:</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="button">{new Date(item.properties.time).toLocaleTimeString()}</Typography>
              </Grid>
            </Grid>
          </Popup>
        </CircleMarker>
      ))}
    </LayerGroup>
  );

};

export default MarkerFactory;
