import React from "react";
import { 
    Box, 
    Stack, 
} from "@mui/material";
import NavHeader from "./NavHeader";

export default function Layout() {

    return(
        <Box sx={{ height: '100vh', backgroundColor: "black" }}>
            <Stack>
                <NavHeader />
            </Stack>
        </Box>
    )
}