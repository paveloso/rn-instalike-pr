import ApiConfig from '../../config/dev/api';
import { CREATE_POST } from './post';
import { AsyncStorage } from 'react-native';

import * as firebase from 'firebase';

export const GET_USER = 'GET_USER';
export const CREATE_USER = 'CREATE_USER';

export const getUser = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const token = getState().auth.token;

        try {
            firebase.database().ref('/users/').orderByChild('userId').equalTo(userId).on('value', function (snapshot) {
                console.log(snapshot);
                snapshot.forEach(function(childSnapshot) {
                    const childData = childSnapshot.val();
                    console.log('nn: ' + childData.nickname);

                    dispatch({ type: GET_USER, userData: { userId: userId, nickname: childData.nickname }});
                    AsyncStorage.setItem('userNickname', JSON.stringify({
                        nickname: childData.nickname
                    }));
                })
            })
            
        } catch (err) {
            console.log('oh');
        }
    }
}

export const createUser = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const token = getState().auth.token;

        const response = await fetch(ApiConfig.firebaseDbUrl + `users.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                nickname: ''
            })
        });

        const resData = await response.json();

        console.log(resData);

        dispatch({
            type: CREATE_USER,
            userData: {
                userId: userId,
                nickname: ''
            }
        });
        AsyncStorage.setItem('userNickname', JSON.stringify({
            nickname: ''
        }));

    };
};