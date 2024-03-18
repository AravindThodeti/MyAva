import React from 'react';
import { LS_ACCESS_TOKEN, URL_SETTINGS, URL_LOGIN } from '../constants';
import { Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getServiceProviderProfile } from '../store/actions/api.action';
import { fetchSPProfileFailure } from '../store/actions/user.action';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function OAuthRedirectHandler() {
    const authResult = new URLSearchParams(window.location.search);
    const token = authResult.get('token');
    const error = authResult.get('error');
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profileReducer.profile);
    if (token) {
        localStorage.setItem(LS_ACCESS_TOKEN, token);
        if (!profile) {
            dispatch(getServiceProviderProfile());
        }
        else if (profile && profile.activatedOn !== null) {
            return <Redirect to={{
                pathname: URL_SETTINGS,
            }} />;
        }
    }

    if (error) {
        dispatch(fetchSPProfileFailure(error));
        return <Redirect to={{
            pathname: URL_LOGIN
        }} />;
    }
    return <CircularProgress />
}