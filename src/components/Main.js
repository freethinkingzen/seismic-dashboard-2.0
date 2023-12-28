import React, { useContext, useEffect } from "react";
import { 
    Box,
    Grid,
    Stack,
    Typography
} from "@mui/material";
import NavHeader from "./NavHeader";
import Map from "./Map";
import Legend from "./Legend";
import DataCards from "./DataCards";
import { SeismicDataContext } from "../Context";
import getData from "../utils/USGSapi";
import Feed from "./Feed";

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
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", backgroundColor: "primary.main" }}>
                    <Typography variant="caption" sx={{ color: "primary.contrastText" }}>Created by <a href="https://github.com/freethinkingzen" target="_blank" rel="noreferrer">John Lewis </a></Typography>
                    <Typography variant="caption" sx={{ color: "primary.contrastText" }}>&copy; 2023</Typography>
                </Box>
            </Stack>
        </Box>
    )
}