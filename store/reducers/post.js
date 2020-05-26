import { CREATE_POST, FETCH_POSTS } from '../actions/post';
import Post from '../../models/post';
import { ActionSheetIOS } from 'react-native';

const initialState = {
    posts: [],
    userPosts: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_POSTS:
            return {
                posts: action.posts,
                userPosts: action.userPosts
            };
        case CREATE_POST:
            const newPost = new Post(
                action.postData.id,
                action.postData.imageUrl,
                action.postData.description,
                action.postData.postTime,
                action.postData.authorId
            );

            return {
                ...state,
                posts: state.posts.concat(newPost),
                userPosts: state.userPosts.concat(newPost)
            };
        default:
            return state;
    }
}