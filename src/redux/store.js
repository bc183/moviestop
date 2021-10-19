import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { moviesReducer } from './reducers/moviesReducer';


const reducer = combineReducers({
    moviesList: moviesReducer 
});

const likedMovies = localStorage.getItem("likedMovies") ? JSON.parse(localStorage.getItem("likedMovies")): [];

const initialState = {
    moviesList: {
        popularMovies: {},
        likedMovies: likedMovies,
        likedMoviesLoading: true
    }
}

const middlewares = [thunk]

const store = createStore(reducer, initialState, 
                            composeWithDevTools(applyMiddleware(...middlewares)));

export default store;