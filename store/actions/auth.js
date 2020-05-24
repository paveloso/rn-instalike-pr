import { AsyncStorage } from 'react-native';

import DevConfig from '../../config/dev/api';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

export const authenticate = (userId, token, expirationTime) => {
    return dispatch => {
        dispatch(setLogoutTimer(expirationTime));
        dispatch({ type: AUTHENTICATE, userId: userId, token: token });
    };
};

export const signup = (email, password) => {
    console.log(email + ' + ' + password)
    return async dispatch => {
        let resData;
        try {
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${DevConfig.apiKey}`, 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true
                    })
                });
            

            if (!response.ok) {
                resData = await response.json();
                throw new Error(resData.error.message);
            }

            resData = await response.json();
            console.log(resData);

        } catch (err) {
            console.log(err);
            throw new Error(err);
        }

        dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));
        const expidationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataToDevice(resData.idToken, resData.localId, expidationDate);
    };
};

export const login = (email, password) => {
    console.log(email + ' + ' + password)
    return async dispatch => {
        let resData;
        try {
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${DevConfig.apiKey}`, 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        returnSecureToken: true
                    })
                });
            

            if (!response.ok) {
                resData = await response.json();
                throw new Error(resData.error.message);
            }

            resData = await response.json();
            console.log(resData);

        } catch (err) {
            console.log(err);
            throw new Error(err);
        }

        dispatch(authenticate(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000));
        const expidationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
        saveDataToDevice(resData.idToken, resData.localId, expidationDate);
    };
};

export const logout = () => {
    AsyncStorage.removeItem('userData');
    clearLogoutTimer();
    return { type: LOGOUT };
};

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer);
    }
};

const setLogoutTimer = expirationTime => {
    return dispath => {
        timer = setTimeout(() => {
            dispath(logout());
        }, expirationTime);
    };
};

const saveDataToDevice = (token, userId, expirationDate) => {
    AsyncStorage.setItem('userData', JSON.stringify({
        token: token,
        userId: userId,
        expirationDate: expirationDate.toISOString()
    }))
};