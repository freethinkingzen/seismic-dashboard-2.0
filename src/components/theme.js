import { createTheme } from "@mui/material/styles";
import variables from "../styles/_variables.scss";

export const surfaces = {
    light: '#A5C9CA',
    medium: '#395B64',
    dark: '#2C3333',
    black: '#000000'
}
const theme = createTheme({
    palette: {
        primary: {
            light: variables.primaryMedium,
            main: variables.primaryDark,
            dark: variables.black,
            contrastText: variables.white
        },
        secondary: {
            main: '#EAC333',
            dark: '#E6B609',
        }
    },
});

export default theme;