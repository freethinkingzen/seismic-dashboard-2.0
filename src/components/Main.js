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

export default function Main() {
    const context = useContext(SeismicDataContext);
    useEffect(() => {
        getData("day").then((res) => {
            context.updateSeismicDataToday(res.features);
        });
    }, []);

    return(
        <Box sx={{ flexGrow: 1, height: '100vh', backgroundColor: "primary.dark" }}>
            <Stack>
                <NavHeader />
                <Grid container>
                    <Grid item xs={0} md={2} sx={{ backgroundColor: "primary.dark" }}>
                        <DataCards />
                    </Grid>
                    <Grid item xs={12} md={10} lg={8} sx={{ padding: "8px" }}>
                        <Legend />
                        <Map />
                    </Grid>
                    <Grid item xs={0} lg={2} sx={{ backgroundColor: "primary.dark" }}>

                    </Grid>
                </Grid>
            </Stack>
        </Box>
    )
}