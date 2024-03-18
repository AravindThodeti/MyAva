import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import PublicRoute  from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import LoginPage from '../components/LoginPage';
import OAuthRedirectHandler from '../components/OAuthRedirectHandler';
import Dashboard from '../components/Dashboard';
import { URL_SETTINGS, URL_LOGIN, URL_OAUTH_REDIRECT, URL_DASHBOARD } from '../constants';


const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <PublicRoute path={URL_LOGIN} component={LoginPage} exact={true} />
                <PrivateRoute path={URL_DASHBOARD} component={Dashboard} />
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;
