import { Message } from "js/utils";
import { JSON_WEB_TOKEN_HEADER_KEY } from "config";
import { REFRESH_TOKEN_HEADER_KEY } from "config";
import { REFRESH_TOKEN_KEY } from "config";
import { JSON_WEB_TOKEN_KEY } from "config";
import { LOGIN_USER_KEY } from "config";
const MESSAGE_KEY = "msg";
const MENU_KEY = "menu";
const VIEW_KEY = "view";

// User
export const getUserInfo = (key) => {
    if (JSON.parse(sessionStorage.getItem(LOGIN_USER_KEY)) == null) {
        return -1;
    } else {
        return JSON.parse(sessionStorage.getItem(LOGIN_USER_KEY))[key];
    }
}

export const hasUserAuth = (...auths) => {
    // 초기관리자는 모든권한
    if (getUserInfo("usrId") === "admin") return true;

    for (var auth of auths) {
        if (getUserInfo("roles").indexOf("ROLE_" + auth) > -1) return true;
    }
    return false;
}

export const setUserInfo = (obj) => {
    let loginUser = JSON.parse(sessionStorage.getItem(LOGIN_USER_KEY));
    sessionStorage.setItem(LOGIN_USER_KEY, JSON.stringify({ ...loginUser, ...obj }));
}

export const setTokenRequest = (reqOption) => {
    var token = sessionStorage.getItem(JSON_WEB_TOKEN_KEY);
    if (token != null) reqOption.headers[JSON_WEB_TOKEN_HEADER_KEY] = token;
}

export const setRefreshTokenRequest = (reqOption) => {
    var refreshToken = sessionStorage.getItem(REFRESH_TOKEN_KEY);
    if (refreshToken != null) reqOption.headers[REFRESH_TOKEN_HEADER_KEY] = refreshToken;
}

export const setToken = (token) => {
    if (token != null) {
        sessionStorage.setItem(JSON_WEB_TOKEN_KEY, token);
    }
}

export const setRefreshToken = (refreshToken) => {
    if (refreshToken != null) {
        sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }
}

export const logout = () => {
    sessionStorage.removeItem(JSON_WEB_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(LOGIN_USER_KEY);
    removeMessage();
    removeMenu();
    removeView();
}

export const setNewToken = (response) => {
    var newToken = response.headers.get('x-auth-token');
    setToken(newToken);
}

// Message
export const getMessage = () => {
    return JSON.parse(sessionStorage.getItem(MESSAGE_KEY));
}

export const getMessageInfo = (key) => {
    return JSON.parse(sessionStorage.getItem(MESSAGE_KEY))[key];
}

export const setMessage = (obj) => {
    sessionStorage.setItem(MESSAGE_KEY, JSON.stringify(obj));
}

export const removeMessage = () => {
    sessionStorage.removeItem(MESSAGE_KEY);
}

// Menu
export const getMenu = () => {
    return JSON.parse(sessionStorage.getItem(MENU_KEY));
}

export const setMenu = (obj) => {
    sessionStorage.setItem(MENU_KEY, JSON.stringify(obj));
}

export const removeMenu = () => {
    sessionStorage.removeItem(MENU_KEY);
}

// View
export const getView = () => {
    return JSON.parse(sessionStorage.getItem(VIEW_KEY));
}

export const setView = (obj) => {
    sessionStorage.setItem(VIEW_KEY, JSON.stringify(obj));
}

export const removeView = () => {
    sessionStorage.removeItem(VIEW_KEY);
}