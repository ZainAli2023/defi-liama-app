import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { AppBar, Toolbar, Typography } from '@mui/material';
import '../styles/General.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h4" component="div">
            {'DL NEWS'}
          </Typography>
        </Toolbar>
      </AppBar>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;