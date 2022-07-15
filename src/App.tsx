import GlobalStyle from './styles/global';

import Plataform from './pages/Plataform';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ThemeProvider } from '@mui/material'
import { theme } from './styles/themes';
import { ptBR } from 'date-fns/locale'

if (process.env.NODE_ENV === "development") {
  require('./miragejs/server').makeServer();
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
        <Plataform />
        <GlobalStyle />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
