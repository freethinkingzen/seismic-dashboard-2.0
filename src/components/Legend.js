import React from 'react';
import variables from "../styles/_variables.scss";
import { Grid, Typography } from "@mui/material";

export default function Legend() {
  
    return(
        <Grid container sx={{ marginTop: "8px" }}>
            <Grid container item justifyContent="center" alignContent="center" xs={12} className="legend">
                <Typography variant='h6' sx={{ fontWeight: "bold" }}>Magnitude</Typography>
            </Grid>
            <Grid container item xs={12} justifyContent="space-between">
                <Grid item sx={{ paddingLeft: "1em" }}>
                    <Typography color={variables.warningLight} variant="button">0</Typography>
                </Grid>
                <Grid item>
                    <Typography color={variables.warningMedium} variant="button">2</Typography>
                </Grid>
                <Grid item>
                    <Typography color={variables.warningDark} variant="button">4</Typography>
                </Grid>
                <Grid item>
                    <Typography color={variables.errorMedium} variant="button">6</Typography>
                </Grid>
                <Grid item sx={{ paddingRight: "1em" }}>
                    <Typography color={variables.purple} variant="button">8+</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}