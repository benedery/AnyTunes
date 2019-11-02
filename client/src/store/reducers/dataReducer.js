import { CHANGE_SEARCH_INPUT, FETCHING_STARTED, UPDATE_RESULTS_DATA, CLEAR_SEARCH_TERM, LOGOUT_SUCCESS, SET_USERS, SET_USER } from "../actions/types";

export const dataInitState = {
    isFetching: false,
    resultsData: [],
    usersData: [],
    searchTerm: null,
    uniqueUserData: []
};

export const dataReducer = (state = dataInitState, action) => {
    switch (action.type) {
        case FETCHING_STARTED:
            return {
                ...state,
                isFetching: true
            };
        case CHANGE_SEARCH_INPUT:
            return {
                ...state,
                searchTerm: action.payload
            }
        case UPDATE_RESULTS_DATA:
            return {
                ...state,
                resultsData: action.payload
            }
        case CLEAR_SEARCH_TERM:
            return {
                ...state,
                searchTerm: null
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                searchTerm: null,
                isFetching: false,
                resultsData: [],
                uniqueUserData: [],
                usersData: [],
            }
        case SET_USERS: {
            return {
                ...state,
                usersData: action.payload
            }
        }
        case SET_USER: {
            return {
                ...state,
                uniqueUserData: action.payload
            }
        }
        default:
            return state;
    }
};

export default dataReducer;
