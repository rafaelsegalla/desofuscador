const TOKEN_KEY = "token";

export const getToken = () => window.localStorage.getItem(TOKEN_KEY);

export const login = (token) => {
    window.localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
    window.localStorage.removeItem(TOKEN_KEY);
    window.location = '/login';
};

export const isAuthenticated = () => {
    const token = getToken();
    return (token !== null) && (typeof token !== 'undefined');    
};

export const isAdmin = () => true;