import React, { useContext, useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import MarkerFactory from "./MarkerFactory";
import { SeismicDataContext } from "../Context";


const Listener = () => {
    const context = useContext(SeismicDataContext);
    const map = useMap();

    useEffect(() => {
        context.setMap(map);
    }, [context, map]);

    return null;
}

export default function Map() {
    const context = useContext(SeismicDataContext);
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(context.seismicDataToday);
    }, [context]);

    return (
        <MapContainer center={[20,0]} zoom={2} minZoom={2}>
            <TileLayer
                attribution= '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            />
            <MarkerFactory data={data} />
            <Listener />
        </MapContainer>
    )
}