import { applyMiddleware, combineReducers, createStore } from "redux";
import { filtersReducer } from "./filtersReducer";
import {moviesReducer} from "./moviesReducer";
import { paginationReducer } from "./paginationReducer";
import ThunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const composedEnhancer = composeWithDevTools(applyMiddleware(ThunkMiddleware))

  export default createStore(combineReducers({
    movies: moviesReducer,
    filter: filtersReducer,
    pagination: paginationReducer
}), 
composedEnhancer
)



