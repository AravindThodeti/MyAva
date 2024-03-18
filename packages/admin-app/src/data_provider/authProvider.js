import { API_VERSION_URL, LS_ACCESS_TOKEN } from "@ava/common";

export default {
  login: ({ username, password }) => {
    const request = new Request(`${API_VERSION_URL}/auth/admin/login`, {
      method: "POST",
      body: JSON.stringify({ email:username, password }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(({ token }) => {
        localStorage.setItem(LS_ACCESS_TOKEN, token);
      });
  },
  logout: () => {
    localStorage.clear();
    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: () =>
    localStorage.getItem(LS_ACCESS_TOKEN) ? Promise.resolve() : Promise.reject(),
  getPermissions: () => Promise.reject("Unknown method"),
};
