import {getPostBy, getPosts, addPost, getPostsBy} from "../service";
import {useDispatch} from "react-redux";

export const actions = {
    FETCH_POSTS: "FETCH_POSTS",
    FETCH_POSTS_BY_CATEGORY: "FETCH_POSTS_BY_CATEGORY",
    FETCH_SINGLE_POST: "FETCH_SINGLE_POST",
    FETCH_PENDING: "FETCH_POSTS_PENDING",
    FETCH_ERROR: "FETCH_POSTS_ERROR",
    ADD_POST: "ADD_POST",
    SET_FILTER: "SET_FILTER"
};

export const fetchPending = () => {
    return {
        type: actions.FETCH_PENDING
    };
};
export const fetchError = err => {
    return {
        type: actions.FETCH_ERROR,
        payload: {error: err}
    };
};
export const fetchPostsSuccess = res => {
    return {
        type: actions.FETCH_POSTS,
        payload: {posts: res.data.response}
    };
};
export const fetchSinglePostSuccess = res => {
    return {
        type: actions.FETCH_SINGLE_POST,
        payload: {single: res.data.response}
    };
};
export const setFilter = category => {
    return {
        type: actions.SET_FILTER,
        payload: {category: category}
    };
};

//All HTTP requests here
export function fetchPosts() {
    return async function (dispatch) {
        dispatch(fetchPending());
        try {
            const response = await getPosts();
            return dispatch(fetchPostsSuccess(response));
        } catch (error) {
            return dispatch(fetchError(error));
        }
    }
}

export function fetchPostsBy(category) {
    return async function (dispatch) {
        dispatch(fetchPending());
        try {
            const response = await getPostsBy(category);
            console.log({response})
            return dispatch(fetchPostsSuccess(response));
        } catch (error) {
            return dispatch(fetchError(error));
        }
    }
}

export function fetchSinglePost(id) {
    return async function (dispatch) {
        dispatch(fetchPending());
        try {
            const response = await getPostBy(id);
            return dispatch(fetchSinglePostSuccess(response));
        } catch (error) {
            return dispatch(fetchError(error));
        }
    }
}

export function addNewPost(item) {
    return async function (dispatch) {
        addPost(item).then(() => {
            dispatch(fetchPosts());
        })
    }
}

export function setFilterAction(category) {
    return async function (dispatch) {
        dispatch(setFilter(category));
    }
}
