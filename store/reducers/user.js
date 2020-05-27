import { CREATE_USER, GET_USER } from '../actions/user';
import User from '../../models/user';

const initialState = {
    currentUser: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CREATE_USER: 
            const newUser = new User(action.userData.userId, action.userData.nickname);
            return {
                currentUser: newUser
            }
        case GET_USER:
            const existentUser = new User(action.userData.userId, action.userData.nickname);
            return {
                currentUser: existentUser
            }
        default:
            return state;
    }
};