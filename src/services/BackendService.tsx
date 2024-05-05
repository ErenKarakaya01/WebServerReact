export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
};

export const setAuthHeader = (token: string | null) => {
    if (token !== null) {
      window.localStorage.setItem("auth_token", token);
    } else {
      window.localStorage.removeItem("auth_token");
    }
};

export const getId = () => {
    return window.localStorage.getItem('id');
};

export const setId = (id: string | null) => {
    if (id !== null) {
      window.localStorage.setItem("id", id);
    } else {
      window.localStorage.removeItem("id");
    }
}
