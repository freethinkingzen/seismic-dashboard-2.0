import React from "react";
import { 
    Box,
    Grid,
    Stack, 
} from "@mui/material";
import NavHeader from "./NavHeader";
import Map from "./Map";
import Legend from "./Legend";
import DataCards from "./DataCards";

export default function Layout() {

    return(
        <Box sx={{ flexGrow: 1, height: '100vh', backgroundColor: "primary.dark" }}>
            <Stack>
                <NavHeader />
                <Grid container gap={"8px"}>
                    <Grid item xs={0} md={2} sx={{ backgroundColor: "primary.dark" }}>
                        <DataCards />
                    </Grid>
                    <Grid item xs={12} md={8} sx={{ flexGrow: 1 }}>
                        <Legend />
                        <Map />
                    </Grid>
                    <Grid item xs={0} md={2} sx={{ backgroundColor: "primary.dark" }}>

                    </Grid>
                </Grid>
            </Stack>
        </Box>
    )
}