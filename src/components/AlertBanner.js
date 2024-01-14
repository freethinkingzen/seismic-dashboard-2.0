import React, { useContext, useEffect, useState } from 'react';
import {
    Alert,
    AlertTitle,
    Button,
    Collapse,
    Divider,
    IconButton,
    Link,
    Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import styled from '@mui/material/styles/styled';
import { SeismicDataContext } from '../Context';
import getData from '../utils/USGSapi';
import { damageAlerts } from '../utils/DataParser';
import { GpsFixed } from '@mui/icons-material';


const CustomAlert = styled(Alert)(({theme}) => ({
    width: "100%",
    borderRadius: "0px",
    borderLeft: `solid ${theme.palette.warning.main} 2em`,
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.transparent.main,
    height: "max-content",
}));

const AlertBanner = () => {
    const context = useContext(SeismicDataContext);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(null);


    useEffect(() => {
        if(!context.seismicDataSeismicDataMonth) {
            getData("month").then((res) => {
                context.updateSeismicDataMonth(res.features);
                if(damageAlerts(res.features).length > 0) {
                    setData(damageAlerts(res.features));
                    setOpen(true);
                }
            });
        } else {
            if(damageAlerts(context.seismicDataMonth).length > 0) {
                setData(damageAlerts(context.seismicDataMonth));
                setOpen(true);
            }
        }
    }, [context]);
    
    return (
        <Collapse in={open}>
            <CustomAlert
                variant="outlined"
                severity="warning"
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setOpen(false);
                        }}
                    >
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                >
                    <AlertTitle>Damage Reported</AlertTitle>
                    <Divider fullwidth sx={{ backgroundColor: "warning.main" }} />
                    <Stack>
                        {data && data.length > 0 && data.map((item) => (
                            <Stack key={item.id}>
                                {new Date(item.properties.time).toLocaleDateString()} - {item.properties.title}
                                <br />
                                <span>
                                    <Button variant="text" color="warning" startIcon={<GpsFixed />}>Map</Button>
                                    <Link href="https://www.google.com" target="_blank" rel="noopener" underline="hover" sx={{marginLeft: "1em", color: "warning.main"}} >Google Results</Link>
                                    <Link href="" target="_blank" rel="noopener" underline="hover" sx={{marginLeft: "1em", color: "warning.main"}} >USGS Info</Link>
                                </span>
                                <Divider fullwidth sx={{ backgroundColor: "warning.main" }} />
                            </Stack>
                        ))}
                    </Stack>
            </CustomAlert>
        </Collapse>
    );
};

export default AlertBanner;
