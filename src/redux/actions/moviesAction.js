import axios from 'axios';
import { API_KEY } from '../../constants';
import { MOVIES_LIST_FAIL, MOVIES_LIST_REQUEST, MOVIES_LIST_SUCCESS, MOVIES_LIKE_SUCCESS, MOVIES_LIKE_REQUEST, MOVIES_LIKE_FAIL } from '../constants/moviesConstants';


const isPresent = (array, id) => {
    for(let i = 0; i < array.length; i++) {
        console.log("hi");
        if (String(array[i].id) === String(id)) {
            return true;
        }
    }
    return false;
}

export const getPopularMoviesList = (page = 1) => async (dispatch, getState) => {
    try {
        dispatch({ type:  MOVIES_LIST_REQUEST});
        const { likedMovies } = getState().moviesList;
        const { data } = await axios.get(`/movie/popular?api_key=${API_KEY}&page=${page}`);
        data.results.forEach(movie => {
            const present = isPresent(likedMovies, movie.id);
            if (present) {
                movie.isLiked = true;
            } else {
                movie.isLiked = false;
            }
        })
        dispatch({ type:  MOVIES_LIST_SUCCESS, payload: data});
    } catch (error) {
        dispatch({ type: MOVIES_LIST_FAIL, payload: error.response?.data?.status_message });
    }
}

export const toggleLikeForMovies = (movieObj) => (dispatch, getState) => {
    try {
        dispatch({ type: MOVIES_LIKE_REQUEST });

        const { popularMovies, likedMovies } = getState().moviesList;

        popularMovies?.results?.forEach(movie => {
            if (movie.id === movieObj.id) {
                movie.isLiked = !movie.isLiked;
            }
        });

        const present = isPresent(likedMovies, movieObj.id);
        if (present) {
            movieObj.isLiked = false;
            const found = likedMovies.find(item => item.id === movieObj.id);
            likedMovies.splice(likedMovies.indexOf(found), 1);
        } else {
            movieObj.isLiked = true;
            likedMovies.unshift(movieObj);
        }

        dispatch({ type: MOVIES_LIKE_SUCCESS, payload: likedMovies });
        localStorage.setItem("likedMovies", JSON.stringify(getState().moviesList.likedMovies));
    } catch (error) {
        dispatch({ type: MOVIES_LIKE_FAIL, payload: "Oops! something is wrong. Please, check again later." });
    }
    
}
