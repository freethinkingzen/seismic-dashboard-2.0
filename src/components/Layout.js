import React from "react";
import { 
    Box, 
    Stack, 
} from "@mui/material";
import { surfaces } from "./theme";
import NavHeader from "./NavHeader";

export default function Layout() {

    return(
        <Box container sx={{ height: '100vh', backgroundColor: surfaces['black']}}>
            <Stack>
                <NavHeader />
            </Stack>
        </Box>
    )
}