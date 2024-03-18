import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Header from '../components/Header';

export const PublicRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => (
        <Route {...rest} component={(props) => (
            <React.Fragment>
                <Header />
                <Component {...props} />
            </React.Fragment>
        )} />
    );

const mapStateToProps = state => ({
    isAuthenticated: !!state.profileReducer.profile
});

export default connect(mapStateToProps)(PublicRoute);