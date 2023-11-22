import React from "react";
import { 
    Box, 
    Stack, 
} from "@mui/material";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import NavHeader from "./NavHeader";

export default function Layout() {

    return(
        <Box sx={{ height: '100vh', backgroundColor: "primary.dark" }}>
            <Stack>
                <NavHeader />
                <MapContainer center={[20,0]} zoom={2} >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            </Stack>
        </Box>
    )
}