import DevConfig from '../../config/dev/api';

export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';

export const signup = (email, password) => {
    console.log(email + ' + ' + password)
    return async dispatch => {
        try {
            let resData;
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

        dispatch({ type: SIGNUP })
    };
};

export const login = (email, password) => {
    console.log(email + ' + ' + password)
    return async dispatch => {
        try {
            let resData;
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

        dispatch({ type: LOGIN })
    };
};