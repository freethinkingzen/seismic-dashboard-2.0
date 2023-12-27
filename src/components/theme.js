import { createTheme } from "@mui/material/styles";
import variables from "../styles/_variables.scss";

const theme = createTheme({
    palette: {
        primary: {
            light: variables.primaryMedium,
            main: variables.primaryDark,
            dark: variables.black,
            contrastText: variables.white
        },
        secondary: {
            main: variables.secondaryMedium,
            dark: variables.secondaryDark
        },
        warning: {
            light: variables.warningLight,
            main: variables.warningMedium,
            dark: variables.warningDark
        },
        info: {
            light: variables.infoLight,
            main: variables.infoMedium,
            dark: variables.infoDark
        },
        error: {
            main: variables.errorMedium
        }
    },
    typography: {
        fontFamily: [
            "Arial Black",
        ].join(','),
    }
});

export default theme;