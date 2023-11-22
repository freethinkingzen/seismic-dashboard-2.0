import { CssBaseline, ThemeProvider } from '@mui/material';
import Layout from './components/Layout';
import theme from './components/theme';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout />
    </ThemeProvider>
  );
}

export default App;
