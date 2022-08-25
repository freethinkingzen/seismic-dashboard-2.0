import { createTheme } from "@mui/material/styles";

export const surfaces = {
    light: '#A5C9CA',
    medium: '#395B64',
    dark: '#2C3333',
    black: '#000000'
}
const theme = createTheme({
    palette: {
        primary: {
            light: surfaces['medium'],
            main: surfaces['dark'],
            dark: surfaces['black'],
        },
        secondary: {
            main: '#EAC333',
            dark: '#E6B609',
        }
    },
});

export default theme;