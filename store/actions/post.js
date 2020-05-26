import Post from '../../models/post';
import ApiConfig from '../../config/dev/api';

export const CREATE_POST = 'CREATE_POST';
export const FETCH_POSTS = 'FETCH_POSTS';

export const createPost = (imageUrl, description) => {
    console.log(description);
    return async (dispatch, getState) => {

        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const datePosted = new Date();

        const response = await fetch(ApiConfig.firebaseDbUrl + `posts.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                imageUrl,
                description,
                postTime: datePosted.toISOString(),
                authorId: userId
            })
        });

        const resData = await response.json();

        console.log(resData);

        dispatch({ type: CREATE_POST, 
            postData: {
                id: resData.name,
                imageUrl,
                description,
                postTime: datePosted.toISOString(),
                authorId: userId
            }
        })
    }
}

export const fetchPosts = () => {

    return async (dispatch, getState) => {
        const userId = getState().auth.userId;

        try {
            const response = await fetch(ApiConfig.firebaseDbUrl + 'posts.json');

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const resData = await response.json();

            const loadedPosts = [];
            for (const key in resData) {
                loadedPosts.push(new Post(key, resData[key].imageUrl, resData[key].description, resData[key].postTime, resData[key].authorId));
            }

            dispatch({ type: FETCH_POSTS, posts: loadedPosts, userPosts: loadedPosts.filter(post => post.authorId === userId) });
        } catch (err) {
            console.log('Error: ' + err);
            throw err;
        }
    }
}