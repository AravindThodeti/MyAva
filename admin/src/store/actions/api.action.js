import * as userAction from './user.action';
import * as loginAction from './login.action';
import * as ApiUtils from '../../utils/ApiUtils';
import {LS_CURRENT_USER, LS_ACCESS_TOKEN, LS_SP_PROFILE, LS_ADMIN_PROFILE} from '../../constants';

export function getCurrentUser() {
    const user = ApiUtils.getCurrentUser();
    return (dispatch) => {
        dispatch(userAction.fetchUserBegin());
        return user.then(res => {
            localStorage.setItem(LS_CURRENT_USER, JSON.stringify(res));
            dispatch(userAction.fetchUserSuccess(res));
            return res;
        }).catch((error) => {
            dispatch(userAction.fetchUserFailure(error));
        });
    }
}

export function login(data) {
    const login = ApiUtils.login(data);
    return (dispatch) => {
        dispatch(loginAction.loginBegin());
        return login.then(res => {
            localStorage.setItem(LS_ACCESS_TOKEN, res.token);
            dispatch(loginAction.loginSuccess(res));
            dispatch(getAdminProfile());
            return res;
        }).catch((error) => {
            dispatch(loginAction.loginFailure(error));
        });
    }
}

export function getServiceProviderProfile() {
    const profile = ApiUtils.getServiceProviderProfile();
    return (dispatch) => {
        dispatch(userAction.fetchSPProfileBegin());
        return profile.then(res => {
            localStorage.setItem(LS_CURRENT_USER, JSON.stringify(res.user));
            localStorage.setItem(LS_SP_PROFILE, JSON.stringify(res));
            dispatch(userAction.fetchSPProfileSuccess(res));
            dispatch(userAction.fetchUserSuccess(res.user));
            return res;
        }).catch((error) => {
            dispatch(userAction.fetchSPProfileFailure(error));
        });
    }
}

export function saveProfile(id, data) {
    const profile = ApiUtils.saveProfile(id, data);
    return (dispatch) => {
        dispatch(userAction.saveSPProfileBegin());
        return profile.then(res => {
            localStorage.setItem(LS_CURRENT_USER, JSON.stringify(res.user));
            localStorage.setItem(LS_SP_PROFILE, JSON.stringify(res));
            dispatch(userAction.saveSPProfileSuccess(res));
            dispatch(userAction.fetchUserSuccess(res.user));
            return res;
        }).catch((error) => {
            dispatch(userAction.saveSPProfileFailure(error));
        });
    }
}

export function getAdminProfile() {
    const profile = ApiUtils.getAdminProfile();
    return (dispatch) => {
        dispatch(userAction.fetchAdminProfileBegin());
        return profile.then(res => {
            localStorage.setItem(LS_CURRENT_USER, JSON.stringify(res.user));
            localStorage.setItem(LS_ADMIN_PROFILE, JSON.stringify(res));
            dispatch(userAction.fetchAdminProfileSuccess(res));
            dispatch(userAction.fetchUserSuccess(res.user));
            return res;
        }).catch((error) => {
            dispatch(userAction.fetchAdminProfileFailure(error));
        });
    }
}