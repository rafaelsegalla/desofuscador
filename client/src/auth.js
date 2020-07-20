const TOKEN_KEY = "token";

export const getToken = () => localStorage.getItem[TOKEN_KEY];

export const login = (token) => {
    localStorage.setItem(TOKEN_KEY, token);
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
};

export const isAuthenticated = () => {
    const token = getToken();
    return (token !== null) && (typeof token !== 'undefined');    
};

export const isAdmin = () => true;