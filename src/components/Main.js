import React, { useContext, useEffect } from "react";
import { 
    Box,
    Grid,
    Link,
    Stack,
    Tooltip,
    Typography
} from "@mui/material";
import NavHeader from "./NavHeader";
import Map from "./Map";
import Legend from "./Legend";
import DataCards from "./DataCards";
import { SeismicDataContext } from "../Context";
import getData from "../utils/USGSapi";
import Feed from "./Feed";
import AlertBanner from "./AlertBanner";
import { AccountCircle, GitHub, LinkedIn } from "@mui/icons-material";

export default function Main() {
    const context = useContext(SeismicDataContext);

    const updateData = () => {
        getData("day").then((res) => {
            context.updateSeismicDataToday(res.features);
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

    return(
        <Box sx={{ height: '100vh', backgroundColor: "primary.dark" }}>
            <Stack>
                <NavHeader />
                <AlertBanner  />
                <Grid container p="8px">
                    <Grid item xs={12} lg={2} order={{ xs: 0}} sx={{ backgroundColor: "primary.dark" }}>
                        <DataCards />
                    </Grid>
                    <Grid item xs={12} md={2} order={{ xs: 2, md: 1, lg: 3 }} sx={{ backgroundColor: "primary.dark" }}>
                        <Feed />
                    </Grid>
                    <Grid item xs={12} md={10} lg={8} order={{ xs: 1, md: 2, lg: 2 }} sx={{ padding: "8px" }}>
                        <Legend />
                        <Map />
                    </Grid>
                </Grid>
                <Box gap="1em" sx={{ height: "3em", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor: "primary.main" }}>
                    <Tooltip title="LinkedIn" placement="top">
                        <Link href="https://www.linkedin.com/in/john-lewis-3b1b0b1b/" target="_blank" rel="noreferrer"><LinkedIn fontSize="large" sx={{ color: "primary.contrastText" }}/></Link>
                    </Tooltip>
                    <Tooltip title="GitHub" placement="top">
                        <Link href="https://github.com/freethinkingzen" target="_blank" rel="noreferrer"><GitHub fontSize="large" sx={{ color: "primary.contrastText" }}/></Link>
                    </Tooltip>
                    <Tooltip title="Personal Site" placement="top">
                        <Link href="https://www.johnlewiswebdev.com" target="_blank" rel="noreferrer"><AccountCircle fontSize="large" sx={{ color: "primary.contrastText" }}/></Link>
                    </Tooltip>

                </Box>
                <Typography variant="caption" sx={{ color: "primary.contrastText", textAlign: "center" }}>John Lewis &copy; 2023</Typography>
            </Stack>
        </Box>
    )
}