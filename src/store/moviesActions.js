import { DISLIKE_MOVIE_ACTION, LIKE_MOVIE_ACTION, DELETE_MOVIE_ACTION } from "./moviesReducer"

export const likeMovieAction = (movie) => ({
    type: LIKE_MOVIE_ACTION,
    payload: {...movie, vote: movie.vote ? null : true, likes: movie.vote ? movie.likes -1 : movie.likes +1}
})

export const dislikeMovieAction = (movie) => ({
    type: DISLIKE_MOVIE_ACTION,
    payload: {...movie, vote: movie.vote === false ? null : false, dislikes: movie.vote === false ? movie.dislikes -1 : movie.dislikes +1 }
})

export const deleteMovieAction = (movie) => ({
    type: DELETE_MOVIE_ACTION,
    payload: movie.id
})

