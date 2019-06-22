import { ADD_ENTRY, RECIEVE_ENTRIES } from '../actions/index';


export default entriesReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_ENTRY:
            return {
                ...state,
                ...action.entry
            }
        case RECIEVE_ENTRIES:
            return {
                ...state,
                ...action.entries
            }
        default:
            return state;
    }
}


