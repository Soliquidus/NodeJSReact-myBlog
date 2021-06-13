import { actions } from "./actions";
const {
  FETCH_PENDING,
  FETCH_ERROR,
  FETCH_POSTS,
  FETCH_SINGLE_POST,
  SET_FILTER
} = actions;

const getVisiblePosts = (posts, category) => {
  if (category === "All") {
    return posts;
  }
  return posts.filter(p => p.category === category);
};
const categories = ["All", "music", "technology", "gaming"];
const initialState = {
  isFetching: false,
  error: null,
  posts: [],
  postsHolder: [],
  single: null,
  categories: categories,
  category: categories[0]
};
export default function blogApp(state = initialState, action) {
  switch (action.type) {
    case FETCH_PENDING:
      return { ...state, isFetching: true };
    case FETCH_ERROR:
      return { ...state, error: action.payload.error, isFetching: false };
    case FETCH_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        postsHolder: action.payload.posts,
        error: null,
        isFetching: false
      };
    case FETCH_SINGLE_POST:
      return {
        ...state,
        single: action.payload.single,
        error: null,
        isFetching: false
      };
    case SET_FILTER:
      const { postsHolder } = state;
      return {
        ...state,
        category: action.payload.category,
        posts: getVisiblePosts(postsHolder, action.payload.category)
      };
    default:
      return state;
  }
}
