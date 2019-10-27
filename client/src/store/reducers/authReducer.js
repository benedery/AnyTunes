import { FINISH_LOADING, START_LOADING, USER_LOGGED_IN, LOGIN_SUCCESS, REGISTER_SUCCESS, GET_ERROR, CLEAR_ERROR, LOGIN_FAIL, LOGOUT_SUCCESS, REGISTER_FAIL, SET_QUERIES } from "../actions/types";

const authInitState = {
    isLoggedIn: false,
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isAdmin: false,
    user: { isAdmin: false },
    queries: [],
    error: null,
    isLoading: false,
};

const authReducer = (state = authInitState, action) => {
    switch (action.type) {
        case START_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case FINISH_LOADING:
            return {
                ...state,
                isLoading: false
            };
        case USER_LOGGED_IN:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            }

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                isLoggedIn: true,
                isLoading: false
            };
        case GET_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            };
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            localStorage.removeItem('state');
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                user: { isAdmin: false },
                isAuthenticated: false,
                isLoading: false,
                error: action.payload
            };
        case SET_QUERIES:
            return {
                ...state,
                queries: action.payload
            };

        default:
            return state;
    }
};

export default authReducer;
