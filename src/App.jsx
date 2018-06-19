import React from 'react';
import { Provider } from 'react-redux';
import FlightsWidget from 'containers/FlightsWidget/FlightsWidget';
import store from 'store/configureStore';
import 'styles/theme.scss';

const App = () => (
    <Provider store={store}>
        <FlightsWidget />
    </Provider>
);

export default App;
