import React, { useEffect, useState } from 'react';
import { CircleMarker, LayerGroup, Popup } from 'react-leaflet';
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
            <h2>{item.properties.place}</h2>
            <h3>Magnitude: {item.properties.mag}</h3>
            <p>Time: {new Date(item.properties.time).toLocaleString()}</p>
          </Popup>
        </CircleMarker>
      ))}
    </LayerGroup>
  );

};

export default MarkerFactory;
