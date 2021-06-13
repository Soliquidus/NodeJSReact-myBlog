export const actions = {
  FETCH_POSTS: "FETCH_POSTS",
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
    payload: { error: err }
  };
};
export const fetchPostsSuccess = res => {
  return {
    type: actions.FETCH_POSTS,
    payload: { posts: res.data.response }
  };
};
export const fetchSinglePostSuccess = res => {
  return {
    type: actions.FETCH_SINGLE_POST,
    payload: { single: res.data.response }
  };
};
export const setFilter = category => {
  return {
    type: actions.SET_FILTER,
    payload: { category: category }
  };
};

//All HTTP requests here
export function fetchPosts() {}
export function fetchSinglePost(id) {}
export function addNewPost(item) {}
export function setFilterAction(category) {}
