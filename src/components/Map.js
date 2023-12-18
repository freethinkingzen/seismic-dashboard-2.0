import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerFactory from "./MarkerFactory";
import getData from "../utils/USGSapi";


export default function Map() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getData("day").then((res) => {
            setData(res.features);
        });
    }, []);

    return (
        <MapContainer center={[20,0]} zoom={2} minZoom={2}>
            <TileLayer
                attribution= '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
            />
            <MarkerFactory data={data} />
            
        </MapContainer>
    )
}