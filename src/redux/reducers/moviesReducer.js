import { MOVIES_LIKE_SUCCESS, MOVIES_LIKE_FAIL, MOVIES_LIKE_REQUEST, MOVIES_LIST_FAIL, MOVIES_LIST_REQUEST, MOVIES_LIST_SUCCESS } from "../constants/moviesConstants";

export const moviesReducer = (state = { popularMovies: {}, likedMovies: [] }, action) => {
    switch (action.type) {
        case MOVIES_LIST_REQUEST: 
            return {
                ...state,
                moviesLoading: true,
                popularMovies: {},
            }
        case MOVIES_LIST_SUCCESS: 
            return {
                ...state,
                moviesLoading: false,
                popularMovies: action.payload,
            }
        case MOVIES_LIST_FAIL:
            return {
                ...state,
                moviesLoading: false,
                error: action.payload
            }
        case MOVIES_LIKE_REQUEST: 
            return {
                ...state,
                likedMoviesLoading: true,
            }
        case MOVIES_LIKE_SUCCESS: 
            return {
                ...state,
                likedMoviesLoading: false,
                likedMovies: action.payload,
            }
        case MOVIES_LIKE_FAIL:
            return {
                ...state,
                likedMoviesLoading: false,
                likedMoviesError: action.payload
            }
        default:
            return state
    }
}