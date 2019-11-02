import history from '../../history/history'
import Axios from 'axios'
import { START_LOADING, REGISTER_SUCCESS, REGISTER_FAIL, LOGIN_SUCCESS, SET_QUERIES, GET_ERROR, LOGOUT_SUCCESS } from './types'

export const registerUser = (newUser) => {
    return dispatch => {
        dispatch({ type: START_LOADING })
        fetch('http://localhost:4005/users/register', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        }).then(res => res.json())
            .then(res => {
                if (res.status === "success") {
                    dispatch({
                        type: REGISTER_SUCCESS, payload: {
                            token: res.token,
                            user: res.data
                        }
                    })
                    history.push('/index')
                }
                else {
                    dispatch({ type: REGISTER_FAIL, payload: res.msg })
                }
            })
            .catch(err => console.log(err))
    }
}

export const authUser = (userDetails) => {
    return dispatch => {
        dispatch({ type: START_LOADING })
        fetch('http://localhost:4005/users/login', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
        }).then(res => res.json())
            .then(res => {
                if (res.status === 'success') {
                    dispatch({
                        type: LOGIN_SUCCESS, payload: {
                            token: res.token,
                            user: res.data
                        }
                    })
                    history.push('/index')
                }
                else {
                    dispatch({ type: REGISTER_FAIL, payload: res.msg })
                }
            })
            .catch(err => console.log(err))
    }
}

export const fetchQueries = () => {
    return (dispatch, getState) => {
        const token = getState().auth.token
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        if (token) { config.headers['x-auth-token'] = token; }

        Axios.get('http://localhost:4005/query', config)
            .then(res => {
                if (res.status === 200) {
                    const queries = res.data.queries;
                    const newQueries = queries.sort((a, b) => parseInt(b.timeSearched) - parseInt(a.timeSearched))
                    if (queries.length > 10) { queries.length = 10 };
                    dispatch({ type: SET_QUERIES, payload: newQueries })
                }
            })
            .catch(err => dispatch({ type: GET_ERROR, payload: err }))
    }
}

export const logout = () => {
    return dispatch => {
        dispatch({ type: LOGOUT_SUCCESS });
    }
}
