import React from 'react';
import variables from "../styles/_variables.scss";
import { Grid, Typography } from "@mui/material";
import styled from '@emotion/styled';

const LegendGradient = styled(Grid)(() => ({
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    height: "2em",
    borderRadius: "4px",
    background: `linear-gradient(to right, ${variables.warningLight} 0%, ${variables.warningMedium} 25%, ${variables.warningDark} 50%, ${variables.errorMedium} 75%, ${variables.purple} 100%)`,

}));

export default function Legend() {
    return(
        <Grid container sx={{ marginTop: "8px" }}>
            <LegendGradient item xs={12}>
                <Typography variant='h6' sx={{ fontWeight: "bold" }}>Magnitude</Typography>
            </LegendGradient>
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