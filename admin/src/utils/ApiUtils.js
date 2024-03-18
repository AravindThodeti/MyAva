import { API_VERSION_URL, LS_ACCESS_TOKEN } from '../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if (localStorage.getItem(LS_ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(LS_ACCESS_TOKEN))
    }

    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                if (!response.ok) {
                    return Promise.reject(json);
                }
                return json;
            })
        );
};

export function login(data) {
    return request({
        url: API_VERSION_URL + `/auth/admin/login`,
        method: 'POST',
        body: JSON.stringify(data)
    });
}

export function getCurrentUser() {
    if (!localStorage.getItem(LS_ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_VERSION_URL + "/user/me",
        method: 'GET'
    });
}

export function getServiceProviderProfile() {
    if (!localStorage.getItem(LS_ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_VERSION_URL + "/user/SERVICE_PROVIDER/profile",
        method: 'GET'
    });
}

export function getAdminProfile() {
    if (!localStorage.getItem(LS_ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_VERSION_URL + "/user/ADMIN/profile",
        method: 'GET'
    });
}

export function saveProfile(id, data) {

    return request({
        url: API_VERSION_URL + `/user/SERVICE_PROVIDER/${id}/profile`,
        method: 'POST',
        body: JSON.stringify(data)
    });
}