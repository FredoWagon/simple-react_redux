import {SELECT_PAGE_NUMBER} from '../store/paginationReducer'

export const selectPaginationNumber = (number) => ({
    type: SELECT_PAGE_NUMBER,
    payload: number
})

