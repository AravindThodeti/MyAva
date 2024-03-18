import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension'
import {LS_ADMIN_PROFILE} from '../constants';

function loadAuthenticationFromLocalStorage() {
    const profile = localStorage.getItem(LS_ADMIN_PROFILE);
    if (profile === null ) {
        return undefined;
    }
    return JSON.parse(profile);
}

function getInitialState() {
    const currentProfile = loadAuthenticationFromLocalStorage();
    if (currentProfile) {
        return {profileReducer: {
            profile: currentProfile,
            loading: false,
            error: null
        }}
    }
    return undefined;
}

const persistedState = getInitialState();

export default () => {
    const store = createStore(
        reducers,
        persistedState,
        composeWithDevTools(applyMiddleware(thunk))
    );
    return store;
};
