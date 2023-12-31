import { FETCH_ALL, CREATE, UPDATE, DELETE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_BY_ID } from '../constants/actionTypes';

const posts = (state = { isLoading: true, posts: [] }, action) => {
    // console.log("Payload : ", action.payload);
    switch (action.type) {
        case START_LOADING:
            return { ...state, isLoading: true }
        case END_LOADING:
            return { ...state, isLoading: false }
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages
            };
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload };
        case FETCH_BY_ID:
            return { ...state, post: action.payload };
        case CREATE:
            return { ...state, posts: [action.payload, ...state.posts] };
        case UPDATE:
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };
        case DELETE:
            return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
        default:
            return state;
    }
};

export default posts;