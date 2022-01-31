import { movies$ } from '../api/movies'


export const ADD_MOVIE_ACTION = "ADD_MOVIE_ACTION";
export const LIKE_MOVIE_ACTION = "LIKE_MOVIE_ACTION";
export const DISLIKE_MOVIE_ACTION = "DISLIKE_MOVIE_ACTION";
export const DELETE_MOVIE_ACTION = "DELETE_MOVIE_ACTION";
export const LOAD_INITIAL_MOVIE_ACTION = "LOAD_INITIAL_MOVIE_ACTION"


// Fetch data from api
export async function fetchMovies(dispatch, getState) {
    const response = await movies$
    const newResponse = response.sort((a, b) => a.title.localeCompare(b.title)).map((movie) => {
        return { ...movie, vote: null }

    })
    dispatch({ type: LOAD_INITIAL_MOVIE_ACTION, payload: newResponse })
}



export function moviesReducer(state = [], action) {
    switch (action.type) {
        case LOAD_INITIAL_MOVIE_ACTION:
            return action.payload
        case LIKE_MOVIE_ACTION:
            return state.map((movie) => {
                if (movie.id === action.payload.id) {
                    return { ...movie, ...action.payload }
                } else {
                    return movie
                }
            })
        case DISLIKE_MOVIE_ACTION:
            return state.map((movie) => {
                if (movie.id === action.payload.id) {
                    return { ...movie, ...action.payload }
                } else {
                    return movie
                }
            })
        case DELETE_MOVIE_ACTION:
            return state.filter(movie => movie.id !== action.payload);

        default:
            return state
    }
}