import { CssBaseline, ThemeProvider } from '@mui/material';
import Main from './components/Main';
import theme from './components/theme';
import 'leaflet/dist/leaflet.css';
import { SeismicDataProvider } from './Context';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SeismicDataProvider>
      <CssBaseline />
      <Main />
      </SeismicDataProvider>
    </ThemeProvider>
  );
}

export default App;
