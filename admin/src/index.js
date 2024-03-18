import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import {theme} from './theme/theme';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import * as serviceWorker from './serviceWorker';


const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <AppRouter />
      </MuiThemeProvider>
    </Provider>
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

render(<App />, document.getElementById('root'));