export const SELECT_PAGE_NUMBER = "SELECT_PAGE_NUMBER";

// Initial movies displayed
const initialState = 4;

export function paginationReducer (state = initialState, action) {
    switch (action.type) {
        case SELECT_PAGE_NUMBER:
            return action.payload
        default:
            return state
    }
}