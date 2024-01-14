import React from 'react';
import { useMap } from 'react-leaflet';
import { IconButton, Tooltip } from '@mui/material';
import { GpsFixed } from '@mui/icons-material';
import styled from '@emotion/styled';

const StyledButton = styled(IconButton)(() => ({
    padding: "5px",
    backgroundColor: "white",
    color: "black",
    '&:hover': {
        backgroundColor: "#D0D0D8",
        color: "black",
    },
}));


function PositionControl() {
    const map = useMap();

    const isCentered = () => {
        const defaultCenter = [20, 0];
        const center = map.getCenter();
        const centerCoordinates = [center.lat, center.lng];
        const zoom = map.getZoom();
        if(centerCoordinates === defaultCenter && zoom === 2) {
            return true;
        } else {
            return false;
        }
    }

    const handleClick = () => {
        if(!isCentered()) {
            map.flyTo([20, 0], 2);
        } else {
            console.log("Centered");
        }
    };

    return (
        <div className={"leaflet-top leaflet-right"}>
            <div className={"leaflet-control"}>
                <Tooltip title={isCentered() ? "Your Location" : "Reset" } placement="bottom">
                <StyledButton onClick={handleClick}>
                    <GpsFixed />
                </StyledButton>
                </Tooltip>  
            </div>
        </div>
    );
}

export default PositionControl;
