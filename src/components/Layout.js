import React from "react";
import { 
    Box,
    Grid,
    Stack, 
} from "@mui/material";
import NavHeader from "./NavHeader";
import Map from "./Map";
import Legend from "./Legend";

export default function Layout() {

    return(
        <Box sx={{ flexGrow: 1, height: '100vh', backgroundColor: "primary.dark" }}>
            <Stack>
                <NavHeader />
                <Grid container>
                    <Grid item xs={0} sm={1} sx={{ backgroundColor: "primary.dark" }}></Grid>
                    <Grid item xs={12} sm={10} sx={{ flexGrow: 1 }}>
                        <Legend />
                        <Map />
                    </Grid>
                    <Grid item xs={0} sm={1} sx={{ backgroundColor: "primary.dark" }}></Grid>
                </Grid>
            </Stack>
        </Box>
    )
}