import React, { useContext, useEffect } from "react";
import { 
    Box,
    Grid,
    Stack, 
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
        <Box sx={{ flexGrow: 1, height: '100vh', backgroundColor: "primary.dark" }}>
            <Stack>
                <NavHeader />
                <Grid container p="8px">
                    <Grid item xs={12} sx={{ backgroundColor: "primary.dark" }}>
                        <DataCards />
                    </Grid>
                    <Grid item xs={0} md={2} sx={{ backgroundColor: "primary.dark" }}>
                        <Feed />
                    </Grid>
                    <Grid item xs={12} md={10} lg={8} sx={{ padding: "8px" }}>
                        <Legend />
                        <Map />
                    </Grid>
                </Grid>
            </Stack>
        </Box>
    )
}